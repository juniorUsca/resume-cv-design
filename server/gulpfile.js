var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed'),
    imagemin    = require('gulp-imagemin'),
    stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
    minifyHTML  = require('gulp-minify-html'),
    browserify  = require('gulp-browserify'),
    stylus      = require('gulp-stylus'),
    nib         = require('nib'),
    exec        = require('child_process').exec;

gulp.task('watch-src', function () {
  gulp.watch(['./src/**/*',
    './_posts/**/*',
    './_images/**/*',
    './_pages/**/*',
    './_config.json',
    './theme/**/*',
  ], ['_build'])
  
});

gulp.task('watch-build', function () {
  gulp.watch(['./build/**/*.html'], ['html'])
  gulp.watch(['./build/**/*.css'], ['css'])
  gulp.watch(['./build/**/*.styl'], ['stylus'])
  gulp.watch(['./build/**/*.{jpg,png,jpeg,svg}'], ['images'])
  gulp.watch(['./build/**/*.{eot,ttf,svg,woff}'], ['fonts'])
});

gulp.task('_build', function () {
  exec(`node -e "var app = require('./src/main'); app();"`, function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(error);
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

gulp.task('stylus', function () {
  gulp.src('./build/assets/stylus/main.styl')
    .pipe(stylus({ use: nib(), compress: true }))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/assets/css'))
});

gulp.task('css', function () {
  gulp.src('./build/assets/css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('images', function () {
  var imgSrc = './build/**/*.{jpg,png,jpeg,svg}',
      imgDst = './public';
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
    .pipe(gulp.dest('./public/assets/fonts'))
});

/*gulp.task('data', function () {
   gulp.src('./src/data.json')
    .pipe(gulp.dest('./public'));
});*/

gulp.task('_compress', [ 'stylus', 'css', 'images', 'html', 'fonts' ]);

gulp.task('watch', function(){
  console.log("Start watching!")
  gulp.start('watch-src')
  gulp.start('watch-build')
});
gulp.task('default', [ 'stylus', 'css', 'images', 'html', 'fonts' ]);
//gulp.task('default', [ 'js', 'css', 'images', 'html', 'fonts', 'data' ]);