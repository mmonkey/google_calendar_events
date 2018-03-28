var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

gulp.task('lint', function () {
	return gulp.src('./src/index.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
	gulp.src('./src/index.js')
		.pipe(uglify({
			output: {
				beautify: true,
				comments: false,
			},
			compress: false,
		}))
		.pipe(rename('jquery-google-calendar-events.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('minify', function () {
	gulp.src('./src/index.js')
		.pipe(uglify().on('error', util.log))
		.pipe(rename({
			basename: 'jquery-google-calendar-events',
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
	return gulp.src('./scss/style.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('default', ['lint', 'uglify', 'minify', 'sass'], function () {
	gulp.watch('src/index.js', ['lint', 'uglify', 'minify']);
	gulp.watch('scss/style.scss', ['sass']);
});