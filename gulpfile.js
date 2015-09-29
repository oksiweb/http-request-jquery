var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  spritesmith = require('gulp.spritesmith'),
  rename = require("gulp-rename");
 


gulp.task('default', function () {
     gulp.src('assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCss(''))
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('assets/img/icons/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                imgPath: '../img/sprite.png'
            }));

    spriteData.img.pipe(gulp.dest('assets/img')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('assets/css')); // путь, куда сохраняем стили
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('assets/img/icons/*.png',['sprite']);
    gulp.watch('assets/sass/*/*.scss',['default']);
});