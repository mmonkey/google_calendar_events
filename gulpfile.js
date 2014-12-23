var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	util = require('gulp-util'),
	browserSync = require('browser-sync');

gulp.task('sass', function() {
	return gulp.src(['scss/*.scss', '!scss/_*.scss'])
		.pipe(sass({
			style: 'compressed'
		}))
		.on('error', function (err) { console.log(err.message); })
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('lint', function() {
	return gulp.src(['s/*.js', '!js/**/*.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('beautify', function() {
	gulp.src(['js/*.js', '!js/**/*.min.js'])
		.pipe(uglify({
			output: {
				beautify: true,
				comments: true
			}
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
	gulp.src(['js/*.js', '!js/**/*.min.js'])
		.pipe(uglify().on('error', util.log))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: {
			baseDir: "./",
			directory: true
		}
	});
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('js/*.js', ['lint', 'beautify', 'compress', browserSync.reload]);
});