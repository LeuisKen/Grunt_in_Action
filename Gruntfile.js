module.exports = function(grunt) {

  // 配置任务
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'dev' ,  //源文件夹
        src: [ '**', '!**/*.scss', '!**/*.coffee', '!**/*.jade' ],
        dest: 'build',  //目标文件夹
        expand: true
      },
    },

    clean: {
      build: {
        src: [ 'build', '.sass-cache' ]
      },
      stylesheets: {
        src: [ 'build/**/*.css', '!build/application.css' ]
      },
      scripts: {
        src: [ 'build/**/*.js', '!build/application.js' ]
      },
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev',
          src: ['**/*.scss'],
          dest: 'build',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },

    cssmin: {
      build: {
        files: {
          'build/sass/application.css': [ 'build/**/*.css' ]
        }
      }
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'dev',
        src: [ '**/*.coffee' ],
        dest: 'build',
        ext: '.js'
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'build/coffee/application.js': [ 'build/**/*.js' ]
        }
      }
    },

    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'dev',
          src: [ '*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },

  });

  // 加载任务
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // 定义任务

  grunt.registerTask(
    'stylesheets', 
    'Compiles the stylesheets.', 
    [ 'sass', 'autoprefixer', 'cssmin' ]
  );

  grunt.registerTask(
    'scripts', 
    'Compiles the JavaScript files.', 
    [ 'coffee', 'uglify' ]
  );

  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the build directory.', 
    [ 'clean:build', 'copy', 'stylesheets', 'scripts', 'jade' ]
  );
};