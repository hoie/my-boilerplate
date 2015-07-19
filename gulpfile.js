var gulp = require('gulp')
var bower = require('gulp-bower')
var flatten = require('gulp-flatten')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('bower', function(){
	return bower()
	.pipe(gulp.dest('./bower_components'))
});

gulp.task('html', function(){
	return gulp
	.src('*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('fonts', function(){
	return gulp
	.src('bower_components/**/*.{eof,svg,ttf,woff,woff2,otf}')
	.pipe(flatten())
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('assets', function(){
	return gulp
	.src('assets/**/*')
	.pipe(gulp.dest('dist/assets'));
});

gulp.task('images', function(){
	return gulp
	.src('img/**/*.{jpg,png}')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function(){
	return gulp
	.src('scss/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		errLogToConsole: true
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function(){
	gulp.watch('*.html', ['html']);
	gulp.watch('assets/**/*', ['assets']);
	gulp.watch('img/**/*[jpg,png]', ['images']);
	gulp.watch('scss/styles.scss', ['sass']);
});

gulp.task('default', ['bower', 'html', 'assets', 'images', 'sass', 'fonts']);