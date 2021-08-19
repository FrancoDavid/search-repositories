// File: Gulpfile.js
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

var stylus = require('gulp-stylus');
var nib = require('nib');

var jshint = require('gulp-jshint');

var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
    
var uncss = require('gulp-uncss');

gulp.task('uncss', function() {
    gulp.src('./dist/css/style.min.css')
        .pipe(uncss({html: ['./app/index.html','./app/js/templates/*.html']}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('compress', function () {
    gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify({
            mangle: false
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function() {
    gulp.src('./app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
    gulp.src('./app/lib/fontawesome/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-images', function(){
    gulp.src('./app/images/*.png')
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('copy-template', function(){
    gulp.src('./app/js/templates/*.html')
        .pipe(gulp.dest('./dist/js/templates/'));
});

gulp.task('copy-web-fonts', function(){
    gulp.src('./app/webfonts/*.*')
        .pipe(gulp.dest('./dist/webfonts/'));
});
// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function () {
    gulp.src('./app/style/main.styl')
        .pipe(stylus({
            use: nib()
        }))
        .pipe(gulp.dest('./app/style'))
        .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function () {
    gulp.src('./app/**/*.html')
        .pipe(connect.reload());
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function () {
    return gulp.src('./app/scripts/*/.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});


// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function () {
    var sources = gulp.src(['./app/scripts/**/*.js', './app/style/**/*.css']);
    return gulp.src('index.html', {
            cwd: './app'
        })
        .pipe(
            inject(sources, {
                read: false,
                ignorePath: '/app'
            })
        )
        .pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
    gulp.src('./app/index.html')
        .pipe(
            wiredep({
                directory: './app/lib'
            })
        )
        .pipe(gulp.dest('./app'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function () {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/style/**/*.styl'], ['css']);
    gulp.watch(['./app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['./bower.json'], ['wiredep']);
});


// Servidor web de desarrollo
gulp.task('server', function () {
    connect.server({
        root: './app',
        port: 8000,
        livereload: true
    });
});

// Servidor test de producción
gulp.task('server-dist', function() {
    connect.server({
            root: './dist',
            hostname: '0.0.0.0',
            port: 8080,
            livereload: true
        });
    });


gulp.task('default', ['server', 'watch']);
gulp.task('build', ['compress', 'copy', 'copy-template', 'copy-images', 'copy-web-fonts', 'uncss']);