var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    named = require('vinyl-named'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    rename = require("gulp-rename");

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var processors = [
    autoprefixer({browsers: ['last 3 versions', 'last 4 iOS versions']})
];

/*---------------------------------------
 Command: gulp css:dist
 Description: Compiles sass which will create app.css in tmp then copy from temp to dist
 ---------------------------------------- */

var dist = 'dist/';
var src = 'src/';

gulp.task('styles', function () {
    return gulp.src([src + 'exoskeleton.scss'])
        .pipe(named())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist));
});

gulp.task('build:dev', gulp.series('styles', function () {
    return gulp.src([src + 'exoskeleton.scss'])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(dist));
}));

gulp.task('build:prod', gulp.series('styles', function () {
    return gulp.src([src + 'exoskeleton.scss'])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist));
}));
