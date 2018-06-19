var gulp = require('gulp');

var concat = require('gulp-concat');

gulp.task('smush', function() {
	return gulp.src('functionality_1.js')
		.pipe(concat('combined_file.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['smush']);