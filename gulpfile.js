const {dest, src, watch, parallel} = require('gulp')
const scss = require('gulp-sass')(require('sass'))
const gulpConcat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const gulpUglify = require('gulp-uglify-es').default

function scripts() {
	return src('./src/**/*.js')
		.pipe(gulpConcat('main.min.js'))
		.pipe(gulpUglify())
		.pipe(dest('./src/scripts'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('./src/**/*.scss')
		.pipe(gulpConcat('style.min.css'))
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(dest('./src/styles'))
		.pipe(browserSync.stream())
}

function liveServer() {
	browserSync.init({
		server: {
			baseDir: 'src',
		},
	})
}

function run() {
	watch(['./src/styles/*.scss'], styles)
	watch(['./src/scripts/*.js'], scripts)
	watch(['./src/**/*.html']).on('change', browserSync.reload)
}

exports.styles = styles
exports.scripts = scripts
exports.run = run
exports.liveServer = liveServer

exports.default = parallel(styles, scripts, run, liveServer)