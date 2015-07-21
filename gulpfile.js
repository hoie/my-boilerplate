var gulp = require('gulp');
var flatten = require('gulp-flatten');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var express = require('express');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var server;



gulp.task('html', function(){
	return gulp
	.src('*.html')
	.pipe(gulp.dest('dist'))
	.pipe(reload());
});

// gulp.task('fonts', function(){
// 	return gulp
// 	.src('bower_components/**/*.{eof,svg,ttf,woff,woff2,otf}')
// 	.pipe(flatten())
// 	.pipe(gulp.dest('dist/fonts'));
// });

gulp.task('assets', function(){
	return gulp
	.src('assets/**/*')
	.pipe(gulp.dest('dist/assets'));
});

gulp.task('images', function(){
	return gulp
	.src('img/**/*.{jpg,png}')
	.pipe(gulp.dest('dist/img'))
	.pipe(reload());
});

gulp.task('sass', function(){
	return gulp
	.src('scss/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass()).on('error', handleError)
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'))
	.pipe(reload());
});


gulp.task('browserify', function(){
	return browserify('./scripts/main.js')
	.bundle().on('error', handleError)
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('dist/scripts'))
	.pipe(reload());
});

gulp.task('server', function(){
	server = express();
	server.use(express.static('dist'));
	server.listen(8000);
	browserSync({ proxy: 'localhost:8000', browser: "google chrome" });
});

gulp.task('watch', function(){
	gulp.watch('*.html', ['html']);
	gulp.watch('assets/**/*', ['assets']);
	gulp.watch('img/**/*[jpg,png]', ['images']);
	gulp.watch('scss/styles.scss', ['sass']);
	gulp.watch('scripts/main.js', ['browserify']);
});

gulp.task('build', ['html', 'assets', 'images', 'sass', 'browserify']);

gulp.task('default', ['build', 'watch', 'server']);

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
};

function reload() {
	if (server) {
		return browserSync.reload({ stream: true});
	}
	return gutil.noop();
}