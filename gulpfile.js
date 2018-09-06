const gulp = require('gulp'),
    babel = require('gulp-babel'),
    miniPackageJson = require('./scripts/gulp-mini-package-json');

gulp.task('copyES', () =>
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [['@babel/env', {modules: 'commonjs'}]],
            plugins: ['@babel/plugin-transform-runtime']
        })).pipe(gulp.dest('./dist'))
);

/**
 * copy extra files to dist
 */
gulp.task('copyNpmFiles', () =>
    gulp.src(['README.md', './LICENSE'])
        .pipe(gulp.dest('./dist'))
);
gulp.task('copyPackageJson', () =>
    gulp.src('./package.json')
        .pipe(miniPackageJson())
        .pipe(gulp.dest('./dist'))
);
gulp.task('copyFiles', gulp.series('copyNpmFiles', 'copyPackageJson'));

/**
 * build components for npm publish
 */
gulp.task('copy', gulp.series('copyES', 'copyFiles'));