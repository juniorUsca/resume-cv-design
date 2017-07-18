var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed'),
    imagemin    = require('gulp-imagemin'),
    stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
    minifyHTML  = require('gulp-minify-html'),
    browserify  = require('gulp-browserify'),
    exec        = require('child_process').exec;

gulp.task('watch-src', function () {
  gulp.watch(['./src/**/*',
    './_posts/**/*',
    './_images/**/*',
    './_pages/**/*',
    './_config.json'
  ], ['build'])
  
});

gulp.task('watch-build', function () {
  gulp.watch(['./build/**/*'], ['html','css','images','fonts'])
});

gulp.task('build', function () {
  exec(`node -e "var app = require('./src/main'); app();"`, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
  })
});

/*gulp.task('js', function () {
  gulp.src('./src/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    //.pipe(stripDebug())
    .pipe(gulp.dest('./public/js'));
});*/

gulp.task('css', function () {
  gulp.src('./build/assets/css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('images', function () {
  var imgSrc = './build/img/**/*',
      imgDst = './public/img';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('html', function () {
  var htmlSrc = './build/**/*.html',
      htmlDst = './public';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('fonts', function () {
  gulp.src('./build/assets/fonts/**/*.{eot,ttf,svg,woff}')
    .pipe(gulp.dest('./public/assets/fonts'));
});

/*gulp.task('data', function () {
   gulp.src('./src/data.json')
    .pipe(gulp.dest('./public'));
});*/
gulp.task('watch', [ 'watch-src', 'watch-build' ]);
gulp.task('default', [ 'css', 'images', 'html', 'fonts' ]);
//gulp.task('default', [ 'js', 'css', 'images', 'html', 'fonts', 'data' ]);