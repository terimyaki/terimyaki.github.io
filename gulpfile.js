var gulp = require('gulp');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var babelify = require('babelify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
	js : 'main.js',
	sass : 'main.scss',
	html : 'index.html'
};

gulp.task('reload', function(){
	livereload.reload();
});

gulp.task('reloadCss', function(){
	gulp.src('./build/style.css')
		.pipe(livereload());
});

gulp.task('lintJs', function(){
	return gulp.src([paths.js])
				.pipe(eslint())
				.pipe(eslint.format())
				.pipe(eslint.failOnError());
});

gulp.task('buildJs', function(){
	var bundler = browserify();

	bundler.add('main.js');

	bundler.transform(babelify);

	bundler.bundle()
		.pipe(source('app.js'))
		.pipe(plumber())
		.pipe(gulp.dest('build'));
});

gulp.task('buildCss', function(){
	gulp.src(paths.sass)
		.pipe(plumber())
		.pipe(sass())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['buildJs', 'buildCss']);

gulp.task('default', function(){
	livereload.listen();
	gulp.start('build');
	gulp.watch(paths.html, ['reload']);
	gulp.watch(paths.sass, ['buildCss', 'reloadCss']);
	gulp.watch(paths.js, ['buildJs', 'reload']);
});