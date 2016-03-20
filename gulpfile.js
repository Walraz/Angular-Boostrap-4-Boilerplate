var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var history     = require('connect-history-api-fallback');
var del         = require('del');
var sequence    = require('run-sequence');
var load        = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var production = false;

gulp.task('js', function(){
  browserify({
    entries: ['app/js/main.js'],
    paths: ['node_modules'],
    debug: !production
    })
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('main.js'))
    .pipe(load.streamify(load.ngAnnotate({add: true})))
    .on('error', function(e){
      load.util.log(e);
      })
    .pipe(load.if(production, load.streamify(load.uglify())))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('templates', function () {
  return gulp.src('app/views/**/*.jade')
    .pipe(load.plumber())
    .pipe(load.jade())
    .pipe(load.angularTemplatecache({
      standalone: true
    }))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return gulp
    .src('app/styles/*.scss')
    .pipe(load.if(!production, load.sourcemaps.init()))
    .pipe(load.plumber())
    .pipe(load.sass().on('error', load.sass.logError))
    .pipe(load.autoprefixer())
    .pipe(load.if(production, load.cleanCss({keepSpecialComments: 0})))
    .pipe(load.if(!production, load.sourcemaps.write()))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function(){
  return gulp
    .src('app/index.jade')
    .pipe(load.plumber())
    .pipe(load.jade())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function(){
  console.log('Browser Sync will start in 5s')
  setTimeout(function(){
    browserSync.init({
        server: './build',
        middleware: [ history() ]
    });
    }, 5000);
});

gulp.task('serve', ['jade', 'templates', 'styles', 'js', 'browserSync'], function() {
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/views/**/*.jade', ['templates']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/*.jade', ['jade']);
});

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('deploy', ['clean'], function() {
  production = true;
  sequence(['jade', 'templates', 'styles', 'js']);
});

gulp.task('default', ['serve']);