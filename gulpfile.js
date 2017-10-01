'use strict'

const gulp = require('gulp'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		 clean = require('gulp-clean'),
		  sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
 webserver = require('gulp-webserver');

gulp.task('clean', () => {
	return gulp.src('dist', {read: false})
		.pipe(clean())
});
gulp.task('scripts', ['clean'], () => {
	return gulp.src('./js/**/*.js')
		.pipe(sourcemaps.init())
	  .pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename('all.min.js'))
		.pipe(sourcemaps.write('.'))
	  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', ['clean'], () => {
	return gulp.src('sass/global.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename('all.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
	gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('images', ['clean'], () => {
	return gulp.src('./images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/content'))
});

gulp.task('build', ['scripts', 'styles', 'images', 'watch']);

gulp.task('startServer', ['build'], () => {
	return gulp.src('./')
		.pipe(webserver({
			livereload: true,
      fallback: 'index.html',
      open: true,
			port: 3000
    }))
});

gulp.task('default', ['startServer']);
