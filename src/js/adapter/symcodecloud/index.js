module.exports = {
    translations: {
        description: {
            en: 'Symcode cloud adapter',
            de: 'Symcode Cloud Adapter'
        }
    },
    template: require('./template.html'),
    apikey: '',
    http: function() {
        var that = this;
        var options = {
            base: this.config.url.replace(/\/+$/, '') + '/api'
        };
        return options;
    },
    data: function () {
        return {
            category: null,
            search: null,
            items: null,
            results: {},
            extensions: null
        }
    },
    watch: {
        'appConfig.pick': {
            handler: function (config) {
                // Reload latest items when extensions have changed
                var oldTerms = this.assembleTerms();
                this.extensions = config.extensions;
                var newTerms = this.assembleTerms();
                if (oldTerms.hash !== newTerms.hash && this.results[oldTerms.hash]) {
                    var items = this.results[oldTerms.hash].items;
                    while (items.length > 0) {
                        items.pop();
                    }
                    this.loadAssets(items);
                }
            },
            immediate: true
        }
    },
    dateFormat: 'YYYY-MM-DDTHH:mm:ss',
    methods: {
        assembleTerms: function () {
            var terms = [],
                pushTerm = function (field, operator, value) {
                    terms.push({field: field, operator: operator, value: value});
                };
            if (this.category) {
                pushTerm('category', 'exact', this.category.id);
            }
            if (this.search) {
                pushTerm('description', 'freeform', this.search);
            }
            if (this.extensions && this.extensions.length) {
                pushTerm('fileformat', 'matches', this.extensions.join('|'))
            }
            if (!terms.length) {
                pushTerm('id', 'matches', '*');
            }
            return terms;
        },
        loadAssets: function (items) {
            var terms = this.assembleTerms();
            var query = JSON.stringify(terms);
            var result = this.results[query];
            if (!result) {
                result = {page: 0, pages: 0, items: items || []};
                result.items.total = result.items.total || result.items.length;
                this.results[query] = result;
            } else {
                if (items && result.items !== items) {
                    Array.prototype.push.apply(items, result.items);
                    items.total = result.items.total;
                    items.loading = result.items.loading;
                    items.query = query;
                    result.items = items;
                }
                if (result.page === result.pages) {
                    return this.$promise(function (resolve) {
                        resolve(result);
                    });
                }
            }

            result.items.loading = true;
            result.items.query = query;

            var categories = '';
            var fulltext = '';

            terms.forEach(function (term) {
                if(term.field == 'category'){
                    categories = term.value;
                }
                if(term.field == 'description'){
                    fulltext = term.value;
                }
            });


            this.http.get(
                '/entries?page='+ (result.page + 1)+'&limit=20&filter[categories]='+categories+'&filter[fulltext]='+fulltext,
                {'headers': {'apikey': this.apikey}}
            ).then((function(response) {
                console.debug(response);
                if (result.items.query === query) {
                    result.page = parseInt(response.data.current_page);
                    result.pages = parseInt(response.data.page_count);
                    result.items.total = parseInt(response.data.total);
                    result.items.loading = false;
                    response.data.data.forEach((function (asset) {
                        var ext = asset.type.match('image/') ? (asset.hasOwnProperty('extension') ? asset.extension : (asset.original_name.match(/\.([0-9a-z]+)$/i) || []).pop()) : undefined;
                        var item = this.createItem({
                            id: asset.hash,
                            query: query,
                            type: 'file',
                            name: asset.name,
                            title: asset.name,
                            extension: ext,
                            created: this.parseDate(asset.created_at),
                            modified: this.parseDate(asset.changed_at),
                            thumbnail: asset.media_thumb_url,
                            links: {
                                open: asset.media_thumb_url+'?width=800px',
                                download: asset.media_file_url
                            },
                            data: asset
                        });
                        result.items.push(item);
                    }).bind(this));
                }
                return result;
            }).bind(this));
        },
        setupLogin: function(loginCallback) {
            var that = this;
            this.login(function(username, password, callback) {
                this.http.get('/login?username='+username+'&password='+password).then(
                    function (response) {
                        if(response.status === 200){
                            response.data = response.json();
                            if(response.data.apikey){
                                that.apikey = response.data.apikey;
                                callback(true);
                                loginCallback(response.data.apikey);
                            } else {
                                callback(false);
                            }
                        } else {
                            callback(false);
                        }
                    }
                );
            }).bind(this);
        },
        loadCategories: function(tree) {
            var catId = 0;
            if(tree.item && tree.item.id){
                catId = tree.item.id;
            }

            this.http.get(
                '/categories?limit=100&parent_id='+catId,
                {'headers': {'apikey': this.apikey}}
            ).then(function (response) {
                tree.items = response.data.data.map((function(category) {
                    return this.createItem({
                        id: category.id,
                        name: category.name,
                        type: 'category',
                        data: category
                    });
                }).bind(this));
            });
        }
    },
    events: {
        'select-item': function (item) {
            if (item === 'entrypoint') {
                this.category = null;
                this.search = null;
                var that = this;
                if(!that.apikey){
                    that.setupLogin(function(){
                        that.loadAssets().then(function(response) {
                            that.items = response.items;
                            that.$parent.$dispatch('select-item', this);
                        });
                    });
                } else {
                    that.loadAssets().then(function(response) {
                        that.items = response.items;
                        that.$parent.$dispatch('select-item', this);
                    });
                }
            } else {
                return true;
            }
        },
        'load-more-items': function (results) {
            var that = this;
            if(!that.apikey){
                that.setupLogin(function(){
                    that.loadAssets(results);
                });
            } else {
                that.loadAssets(results);
            }
        },
        'search': function (sword, results) {
            var that = this;
            if(!that.apikey){
                that.setupLogin(function(){
                    that.search = sword;
                    that.loadAssets(results);
                });
            } else {
                that.search = sword;
                that.loadAssets(results);
            }
            return true;
        },
        'category-load-items': function (tree) {
            var that = this;
            if(!that.apikey){
                that.setupLogin(function(){
                    that.loadCategories(tree);
                });
            } else {
                that.loadCategories(tree);
            }
        },
        'category-select-item': function (tree) {
            this.category = tree.item;
            this.search = null;
            var that = this;
            if(!that.apikey){
                that.setupLogin(function(){
                    that.loadAssets(tree.items);
                    that.$dispatch('select-item', tree);
                });
            } else {
                that.loadAssets(tree.items);
                that.$dispatch('select-item', tree);
            }

        }
    }
};
