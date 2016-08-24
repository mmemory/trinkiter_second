var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var plumber = require('gulp-plumber');

var path = {
    sassSrc: 'public/src/sass',
    cssDest: 'public/build/css',
    jsSrc: 'public/src/js',
    jsDest: 'public/build/js',
    tmplSrc: 'public/src/templates',
    tmplDest: 'public/build/templates',
    indexPath: 'public/index.html'
};

gulp.task('sync',['sass'], function() {
    browserSync.init({
        // server: {
        //     baseDir: "./public"
        //
        // },
        middleware: [ historyApiFallback() ],
        proxy: "http://localhost:3000",
        files: './public',
        open: false,
        notify: false
    });

    gulp.watch(path.sassSrc+'/style.scss',['sass']);
    gulp.watch(path.indexPath).on('change', browserSync.reload);
    gulp.watch(path.tmplSrc+'/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src(path.sassSrc+'/style.scss')
        .pipe(plumber({
            errorHandler: true
        }))
        .pipe(sourcemaps.init({
            loadMaps: true,
            debug: true
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.cssDest))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([path.jsSrc + '/app.js',path.jsSrc + '/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.jsDest));
});

//gulp.task('server', )

gulp.task('templates', function() {
    return gulp.src(path.tmplSrc + '/*.html')
        .pipe(gulp.dest(path.tmplDest));
});

gulp.task('watch', function() {
    gulp.watch(path.jsSrc + '/**/*.js', ['js']);
    gulp.watch(path.sassSrc + '/**/*.scss',['sass']);
    gulp.watch(path.tmplSrc + '/*.html', ['templates']);

});

gulp.task('default', ['sass','templates','js','watch','sync']);

