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
        src: [ 'build/css/*.css']
      },
      scripts: {
        src: [ 'build/js/*.js']
      },
      end: {
        src: [ '.sass-cache', 'build/sass', 'build/coffee' ]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/sass',
          src: ['*.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build/css',
        src: [ '*.css' ],
        dest: 'build/css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'dev/coffee',
        src: [ '*.coffee' ],
        dest: 'build/js',
        ext: '.js'
      }
    },

    uglify: {
      build: {
        files: [{
            expand: true,
            cwd: 'build/js',
            src: '**/*.js',
            dest: 'build/js',
            ext: '.min.js'
        }]
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
    [ 'clean:build', 'copy', 'stylesheets', 'scripts', 'jade', 'clean:end' ]
  );
};