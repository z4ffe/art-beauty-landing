const {dest, src, watch, parallel} = require('gulp')
const scss = require('gulp-sass')(require('sass'))
const gulpConcat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const fileInclude = require('gulp-file-include')
const terser = require('gulp-terser')

function scripts() {
	return src('./src/**/*.js')
		.pipe(gulpConcat('main.min.js'))
		.pipe(terser())
		.pipe(dest('./src/scripts'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('./src/**/*.scss')
		.pipe(gulpConcat('style.min.css'))
		.pipe(scss({
			outputStyle:
				'compressed',
		}))
		.pipe(dest('./src/styles'))
		.pipe(browserSync.stream())
}

function fileIncludeTask() {
	return src(['./src/pages/index.html'])
		.pipe(fileInclude({
			prefix: '@@',
			basepath: './src/components',
		}))
		.pipe(dest('./src'))
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
	watch(['./src/styles/*.scss', './src/components/**/*.scss'], styles)
	watch(['./src/scripts/*.js'], scripts)
	watch(['./src/components/**/*.html', './src/pages/*.html'], fileIncludeTask).on('change', browserSync.reload)
	watch(['./src/**/*.html']).on('change', browserSync.reload)
}

exports.styles = styles
exports.scripts = scripts
exports.run = run
exports.liveServer = liveServer
exports.fileIncludeTask = fileIncludeTask

exports.default = parallel(styles, scripts, fileIncludeTask, run, liveServer)