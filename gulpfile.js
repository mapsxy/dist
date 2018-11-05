/*
 * @Author: xuying 
 * @Date: 2018-11-05 08:55:44 
 * @Last Modified by: xuying
 * @Last Modified time: 2018-11-05 09:56:49
 */

//引入
var gulp = require('gulp');

var sass = require('gulp-sass'); //编译sass

var auto = require('gulp-autoprefixer'); //添加前缀

var clean = require('gulp-clean-css'); //压缩css

var uglify = require('gulp-uglify'); //压缩js

var url = require('url');

var fs = require('fs');

var path = require('path');

var server = require('gulp-webserver'); //起服务

//编译sass
gulp.task('devSass', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(auto({
            browers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./src/css'))
})

//监听sass变化
gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('devSass'));
})


gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                //判断路径
                if (pathname === '/api/ipt') {
                    var zhi = url.parse(req.url, true).query.ipt;
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

gulp.task('dev', gulp.series('devSass', 'devServer', 'watch'));

//压缩js
gulp.task('buildJs', function() {
    return gulp.src('./src/js/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
})