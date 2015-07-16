var gulp = require('gulp')

gulp.task('html', function(){
	return gulp
	.src('*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('assets', function(){
	return gulp
	.src('assets/**/*')
	.pipe(gulp.dest('dist/assets'));
});

gulp.task('images', function(){
	return gulp
	.src('img/**/*.{jpg, png}')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){
	gulp.watch('*.html', ['html']);
	gulp.watch('assets/**/*', ['assets']);
	gulp.watch('img/**/*[jpg, png]', ['images']);
});

gulp.task('default', ['html', 'assets', 'images']);