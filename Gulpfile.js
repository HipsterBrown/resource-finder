var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

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
