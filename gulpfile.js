var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var picshrink = require('gulp-imagemin');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var pixrem = require('gulp-pixrem');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
  cascade: false
};

// object containing file paths
var paths = {
  css:['src/css/normalize.css',
        'src/css/skeleton.css',
        'src/css/main.css'],
  sass:['./src/sass/main.scss'],
  js:['bower_components/jquery/dist/jquery.min.js',
        'bower_components/scrollreveal/dist/scrollreveal.min.js',
        'bower_components/jquery.scrollTo/jquery.scrollTo.min.js',
        'scripts/main.js']
};

// default task
gulp.task('default', ['watchtower', 'doSass', 'allcss', 'mincss']);

// Static Server + watching scss/html files
gulp.task('serve', ['doSass', 'allcss', 'mincss'], function() {

    browserSync.init({
        server: "./"
    });
    // compile sass
    gulp.watch('src/sass/main.scss', ['doSass']);
    gulp.watch('src/sass/partials/*.scss', ['doSass']);
    // concatenate css
    gulp.watch('src/css/main.css', ['allcss']);
    // concatenate and minify css
    gulp.watch('dist/allcss.css', ['mincss']);

    // reload browser
    gulp.watch("./*.html").on('change', browserSync.reload);
});


// concatinate css to dist folder
// this version not minified
gulp.task('allcss', function() {
  console.log('Gulp is running allcss task...');
  return gulp.src(paths.css)
  .pipe(concat('allcss.css'))
  .pipe(pixrem())
  .pipe(gulp.dest('./dist/'));
});

//optimise images
gulp.task('image-opt', function() {
  return gulp.src('./src/css/images/**/*')
    .pipe(picshrink())
    .pipe(gulp.dest('./dist/images/'));
});

// concatinate css and minify to dist folder
gulp.task('mincss', function() {
  console.log('Gulp is running mincss task...');
  return gulp.src(paths.css)
      .pipe(concat('allcss.min.css'))
      .pipe(pixrem())
      .pipe(cssnano())
      .pipe(gulp.dest('./dist/'))
      .pipe(notify('Gulp: CSS tasks completed!'));
});

gulp.task('doSass', function() {
  console.log('Gulp is running doSass task...');
  return gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', notify.onError(function (error) {
return "Problem file : " + error.message;
})))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('./src/css'));
});

// concatinate js and minify to dist folder
gulp.task('minjs', function() {
  console.log('Gulp is running minjs task...');
  return gulp.src(paths.js)
    .pipe(concat('alljs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

// watch task - watch css file and run concat/min task
// gulp.task('watchtower', function(){
//   // compile sass
//   gulp.watch('src/sass/main.scss', ['doSass']);
//   gulp.watch('src/sass/partials/*.scss', ['doSass']);
//   // concatenate css
//   gulp.watch('src/css/main.css', ['allcss']);
//   // concatenate and minify css
//   gulp.watch('dist/allcss.css', ['mincss']);
// });
