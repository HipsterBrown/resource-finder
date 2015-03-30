var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');

gulp.task('preprocess:js', function(){
  return browserify({
    entries: './js/index.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./app/src/browser_action'));
});

gulp.task('preprocess:css', function(){
  return gulp.src('./scss/app.scss')
	.pipe(sass())
	.pipe(gulp.dest('./app/src/browser_action'));
});

gulp.task('watch', function(){
  gulp.watch('./js/*.js', ['preprocess:js']);
  gulp.watch('./scss/*.scss', ['preprocess:css']);
});

gulp.task('default', ['watch']);
