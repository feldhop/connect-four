module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			css: {
				src: 'docs/global/css/connectfour.css',
				dest: 'docs/global/build/css/min/connectfour.min.css'
			}
		},
		uglify: {
			js: {
				src: 'docs/global/js/goforit.js',
				dest: 'docs/global/build/js/min/goforit.min.js'
			}
		},
		watch: {
			css: {
				files: ['docs/global/css/*.css'],
				tasks: ['cssmin:css']
			},
			js: {
				files: ['docs/global/js/*.js'],
				tasks: ['uglify:js']
			},
		}

	});

	// 2. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['cssmin', 'uglify', 'watch']);

};
