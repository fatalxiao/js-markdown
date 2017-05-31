process.env.NODE_ENV = '"release"';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');

/**
 * es compile
 */
gulp.task('build', function () {
    return gulp.src('./src/*.js')
        .pipe(babel({
            plugins: ['transform-runtime']
        }))
        .pipe(concat('index.js'))
        .on('error', function () {
            console.error(e.toString());
        })
        .pipe(gulp.dest('./dist'));
});

/**
 * watch components src files
 */
gulp.task('watch', function () {
    gulp.watch('./src/*.js', ['build']);
});