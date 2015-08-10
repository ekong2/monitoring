module.exports = function(grunt){

    pkg: grunt.file.readJSON('package.json'),

    grunt.initConfig({
        nodewebkit: {
             win: {
                options: {
                    name: 'Monitor Me',
                    platforms: ['win'],
                    buildDir: './builds',
                    winIco: './views/img/monitor.png'
                },            
                src: ['node_modules/**/*', '!node_modules/grunt**/**', 'views/**/*', '*.js', '*.html', '*.json']
            }
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('buildwin', ['nodewebkit:win']);
}