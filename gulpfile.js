let gulp = require('gulp'),
    browserSync = require('browser-sync'); 

const config = {
    server: { // Определяем параметры сервера
        baseDir: 'src' // Директория для сервера
    },
    notify: false // Отключаем уведомления
};

gulp.task('css', function() {
	return gulp.src('src/**/*.css')
	    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
    console.log("шо");
    return gulp.src('src/*.html')
	    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync(config);
});

gulp.task('watch', function() {
    gulp.watch('src/*.html', gulp.parallel('html')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/**/*.css', gulp.parallel('css')); // Наблюдение за css файлами
});
gulp.task('default', gulp.parallel('browser-sync', 'watch'));
