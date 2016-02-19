module.exports = function () {

    var paths = {
        dev: './App',
        build: './Assets',
        temp: './temp'
    },

    config = {
        debug: false,

        paths: {
            dev: paths.dev,
            build: paths.build,
            temp: paths.temp,
            scripts: {
                dev: paths.dev + "/Components",
                pub: paths.build + "/js"
            },
            styles: {
                dev: paths.dev + "/styles",
                pub: paths.build + "/css"
            }
        },
        
        templateCache: {
            source: [
                paths.dev + "/Components/**/*.htm",
                paths.dev + "/Shared/Views/*.htm"
            ],
            compiled: paths.temp,
            file: 'templates.js',
            options: {
                module: 'app.templates',
                standAlone: false,
                root: ''
            }
        }
        
    };

    return config;
};
