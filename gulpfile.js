/**
 * Created by user on 3/31/2017.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var del = require('del');
var serve = require('gulp-serve');

gulp.task('clean', function(cb){
  del(['dist'], cb);
});

gulp.task('styles', function(){
  var injectAppFiles = gulp.src('src/scss/*.scss', {read: false});
  var injectGlobalFiles = gulp.src('src/global/*.scss', {read: false});

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };
  return gulp.src('src/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(gulp.dest('css'))
});

gulp.task('inject-js',function(){
  var target = gulp.src('./index.html');
  var injectJsFiles = gulp.src('js/**/*.js', {read: false});

  return target
    .pipe(wiredep({
      dependencies: true
    }))
    .pipe(inject(injectJsFiles))
    .pipe(gulp.dest('./'))
});

/*gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build','clean', 'styles', 'inject-js']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));*/

gulp.task('default', ['clean', 'styles'], function(){
  var injectFiles = gulp.src(['css/main.css']);

  return gulp.src('src/index.html')
    .pipe(inject(injectFiles))
    .pipe(gulp.dest('./'));

});