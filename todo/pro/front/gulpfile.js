var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('watch-folder', ['copy-folder'], function() {
    gulp.watch(['./templates/**/*', './user/**/*', './index.html'], ['copy-folder']);
});

gulp.task('copy-folder', function() {
    gulp.src(['./templates/**/*', './user/**/*', './index.html'], {
        base: './'
    }).pipe(gulp.dest('c:/dest')).pipe(gulp.dest('c:/dest2'));
});
