process.env.NODE_ENV = '"release"';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    gulpSequence = require('gulp-sequence'),
    miniPackageJson = require('./scripts/gulp-mini-package-json');

/**
 * es compile
 */
gulp.task('es', function () {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            plugins: ['transform-runtime']
        }))
        .on('error', function () {
            console.error(e.toString());
        })
        .pipe(gulp.dest('./dist'));
});

/**
 * copy extra files to dist
 */
gulp.task('copyNpmFiles', function () {
    return gulp.src(['README.md', './LICENSE'])
        .pipe(gulp.dest('./dist'));
});
gulp.task('copyPackageJson', function () {
    return gulp.src('./package.json')
        .pipe(miniPackageJson())
        .pipe(gulp.dest('./dist'));
});
gulp.task('copyFiles', gulpSequence('copyNpmFiles', 'copyPackageJson'));

/**
 * build components for npm publish
 */
gulp.task('build', gulpSequence('es', 'copyFiles'));

/**
 * watch components src files
 */
gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['build']);
});