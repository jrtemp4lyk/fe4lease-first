var gulp = require('gulp');
var config = require('./config/config');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');


gulp.task('node', function() {
  nodemon({
    script: 'app.js',
    watch: [
      'src/**/*.*'
    ]
  });
})

gulp.task('server', ['node'], function() {
  var files = [
    //  'src/**/*.*' // 由于build过程比较慢，浏览器刷新时还未完成导致显示存在问题，因此需要手动刷新
  ];

  browserSync.init(files, {
    proxy: 'http://localhost:'+config.port+'/wbalone/index.html#/index',
    browser: 'chrome',
    notify: false,
    port: config.browserPort
  });

  gulp.watch(files).on("change", reload);
})

gulp.task('default', ['server'], function() {});
