module.exports = function () {

    var paths = {
        dev: './App',
        build: './Assets'
    },

    config = {
        debug: false,

        paths: {
            dev: paths.dev,
            build: paths.build,
            scripts: {
                dev: paths.dev + "/Components",
                pub: paths.build + "/js"
            },
            styles: {
                dev: paths.dev + "/styles",
                pub: paths.build + "/css"
            }
        }
    };

    return config;
};
