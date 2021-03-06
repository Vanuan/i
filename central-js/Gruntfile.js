// wrapper
module.exports = function(grunt) {

	var localConfig;
	try {
		localConfig = require('./server/local_config.js');
	} catch (e) {
		localConfig = require('./server/config.js');
	}

	// Load grunt tasks automatically, when needed
	require('jit-grunt')(grunt, {
		express: 'grunt-express-server'
	});

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.initConfig({
		express: {
			build: {
				options: {
					script: './server/app.js'
				}
			},
			dev: {
				options: {
					script: 'server/app.js',
					debug: true
				}
			},
			open: {
				server: {
					url: 'http://localhost:' + localConfig.server.port
				}
			},
		},

		watch: {
			express: {
				files: ['server/**/*.js'],
				tasks: []
			}
		},
		// Debugging with node inspector
		'node-inspector': {
			custom: {
				options: {
					'web-host': 'localhost'
				}
			}
		},

		// Use nodemon to run server in debug mode with an initial breakpoint
		nodemon: {
			debug: {
				script: 'server/app.js',
				options: {
					nodeArgs: ['--debug-brk'],
					env: {
						'DEBUG': 'false',
						'NODE_DEBUG' : 'false'
					},
					callback: function(nodemon) {
						nodemon.on('log', function(event) {
							console.log(event.colour);
						});

						// opens browser on initial server start
						nodemon.on('config:update', function() {
							setTimeout(function() {
								require('open')('http://localhost:8080/debug?port=5858');
							}, 500);
						});
					}
				}
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [],
			debug: {
				tasks: [
					'nodemon',
					'node-inspector'
				],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.registerTask('debug', [
		'concurrent:server',
		'concurrent:debug'
	]);

	// default task
	grunt.registerTask('default', [
		'express:dev', 
		'watch', 
		'open']);
};