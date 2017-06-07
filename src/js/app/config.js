module.exports = {
    title: 'AssetPicker',
    storages: {
        /* entermediaDB: {
            adapter: 'entermediadb',
            url: 'http://em9.entermediadb.org/openinstitute',
            proxy: true
        },
        github: {
            adapter: 'github',
            username: 'netresearch',
            repository: 'assetpicker'
        } */
    },
    proxy: {
        url: 'proxy.php?to={{url}}',
        all: false
    },
    github: {
        //tokenBla: 'j2332dwedcdj33dx3jm8389xdq'
    },
    pick: {
        limit: 1,
        types: ['file'],
        extensions: []
    },
    language: 'auto',
    debug: true,
    adapters: {
        github: 'adapter/github.js',
        entermediadb: 'adapter/entermediadb.js',
        googledrive: 'adapter/googledrive.js',
        dummy: 'adapter/dummy.js',
        symcodecloud: 'adapter/symcodecloud.js'
    },
    // Way to deliver thumbnails in picked assets:
    // 'url' for the url to the thumbnail
    // 'data' for the image data uri
    thumbnails: 'url'
};
