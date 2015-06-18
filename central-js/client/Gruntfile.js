var Q = require('q');

// wrapper
module.exports = function(grunt) {
  grunt.initConfig({
    html2js: {
      main: {
        src: [
          './src/html/bootstrap/**/*.html',
          './src/html/about/*.html',
          './src/html/catalog/*.html',
          './src/html/service/**/*.html',
          './src/html/documents/**/*.html',
          './src/html/journal/**/*.html',
          './src/html/404/*.html'
        ],
        dest: './build/js/templates.js'
      }
    },
    git_deploy: {
      your_target: {
        options: {
          url: 'git@github.com:e-government-ua/i.git'
        },
        src: './build'
      },
    },
    copy: {
      jspm_deps: {
        files: [{
          expand: true,
          src: ['./jspm_packages/system.js', './jspm_packages/es6-module-loader.js', './config.js', './jspm_packages/github/systemjs/plugin-css@0.1.13.js', 'jspm_packages/github/systemjs/plugin-css@0.1.13/css.js'],
          dest: './build/',
          filter: 'isFile'
        }]
      },
      resources: {
        files: [{
          expand: false,
          src: ['./src/data.json'],
          dest: './build/data.json',
          filter: 'isFile'
        }, {
          expand: false,
          src: ['./src/index.html'],
          dest: './build/index.html',
          filter: 'isFile'
        }, {
          expand: true,
          cwd: './src/img',
          src: ['**'],
          dest: './build/img/'
        }, {
          expand: true,
          cwd: './src/styles',
          src: ['**'],
          dest: './build/styles/'
        }]
      }
    },
    // watch for dev files to change and re-build the script files
    // NOTE: check if all tasks are really required
    // TODO: add css watcher if necessary
    watch: {
      scripts: {
        files: './src/js/**/*.js',
        tasks: ['copy:resources', 'htmlbuild', 'html2js']
      },
      templates: {
        files: './src/html/**/*.html',
        tasks: ['htmlbuild', 'html2js']
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git-deploy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('jspm', 'jspm build', function() {
    var done = this.async();
    function jspm(args, doneCb) {
      var deferred = Q.defer();
      grunt.util.spawn({
        cmd: 'jspm',
        args: args,
        opts: {stdio: 'inherit'}
      }, function (error) {
        if (error) {
          grunt.log.error(error);
        } else {
          grunt.log.ok('jspm package completed');
        }
        deferred.resolve();
      });
      return deferred.promise;
    }
    jspm(['bundle', 'js/app', 'build/src/js/app.js'])
      .then(function(){ return jspm(['bundle', 'js/index/script', '-','angularAMD', 'build/src/js/index/script.js'])})
      .then(function(){ return jspm(['bundle', 'js/404/script', '-', 'angularAMD', 'build/src/js/404/script.js'])})
      .then(function(){ return jspm(['bundle', 'js/documents/script', '-', 'angularAMD', 'build/src/js/documents/script.js'])})
      .then(function(){ return jspm(['bundle', 'js/journal/script', '-', 'angularAMD', 'build/src/js/journal/script.js'])})
      .then(function(){ return jspm(['bundle', 'js/service/script', '-', 'angularAMD', 'build/src/js/service/script.js'])})
      .then(function(){ return jspm(['bundle', 'js/about/script', '-', 'angularAMD', 'build/src/js/about/script.js'])})
      .then(function() {done();});
  });

  // default task
  grunt.registerTask('default', ['html2js', 'jspm', 'copy:jspm_deps', 'copy:resources']);
  // debug task: ommit compressing
  // TODO: ensure that omit compressing does not affect correctness of build
  grunt.registerTask('debug', ['concat:debug', 'copy:resources', 'htmlbuild', 'html2js']);
  // dev task: debug + watch for js files change to automatically rebuild project
  grunt.registerTask('dev', ['concat:debug', 'copy:concat', 'htmlbuild', 'html2js', 'watch']);
};
