var gulp 		= require('gulp'),
	babel 		= require('gulp-babel'),
	watch 		= require('gulp-watch'),
	browserify 	= require('browserify'),
	babelify 	= require('babelify'),
	source 		= require('vinyl-source-stream'),
	buffer 		= require('vinyl-buffer'),
	// reactify 	= require('reactify'),
	watchify 	= require('watchify');
	uglify 		= require('gulp-uglify'),
	notify 		= require('gulp-notify');

gulp.task('babel-react', function(){
	var b = browserify({
		entries: ['script.js'],
		extensions: ['.js', '.jsx'],
		debug: false
	});
	b.transform(babelify);
	return b.bundle()
	.pipe(source('script.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});


gulp.task('watchify', function(){
  var bundler = watchify(browserify('script.js', watchify.args));

  function rebundle() {
	return bundler
		.bundle()
		.on('error', notify.onError())
		.pipe(source('script.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
     
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});




gulp.task('default', ['babel-react']);

gulp.task('watch', ['watchify']);

// gulp.task('babel-react', function(){
// 	return gulp.src('script.js')
// 	.pipe(babel({presets: ['react', 'es2015']}))
// 	.pipe(gulp.dest('dist'));
// });

// gulp.task('watch', function(){
// 	return gulp.src('script.js')
// 	.pipe(watch('script.js'), ['babel-react']);
// });

// gulp.task('babel-react', function(){
// 	browserify({
// 		entries: 'script.js',
// 		extensions: ['.js'],
// 		//transform: [reactify],
// 		debug: true
// 	})
// 	.transform("babelify", {presets: ['react', 'es2015']})
// 	.bundle()
// 	.pipe(source('script.js'))
// 	.pipe(gulp.dest('dist'));
// // 	return gulp.src('script.js')
// // 	.pipe(babel({presets: ['react', 'es2015']}))
// // 	.pipe(gulp.dest('dist'));
// });
