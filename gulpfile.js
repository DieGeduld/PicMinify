var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpPngquant = require('gulp-pngquant'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip');



gulp.task('zip', function () {

    var Tag;
    if (typeof argv.d == "undefined") {
        console.log ("No Day definded!");
        return;
        Tag = "Tag_01/";
    } else {
        Tag = argv.d.replace(/^\/|\/$/g, '') + "/";
    }

    gulp.src(Tag + '_160x600_dc/**/*')
        .pipe(zip('160x600_dc.zip'))
        .pipe(gulp.dest(Tag + '__out'));

    gulp.src(Tag + '_300x50_dc/**/*')
        .pipe(zip('300x50_dc.zip'))
        .pipe(gulp.dest(Tag + '__out'));

    gulp.src(Tag + '_300x150_dc/**/*')
        .pipe(zip('300x150_dc.zip'))
        .pipe(gulp.dest(Tag + '__out'));

    gulp.src(Tag + '_300x250_dc/**/*')
        .pipe(zip('300x250_dc.zip'))
        .pipe(gulp.dest(Tag + '__out'));

    gulp.src(Tag + '_300x600_dc/**/*')
        .pipe(zip('300x600_dc.zip'))
        .pipe(gulp.dest(Tag + '__out'));

    gulp.src(Tag + '_728x90_dc/**/*')
        .pipe(zip('728x90_dc.zip'))
        .pipe(gulp.dest(Tag + '__out'));

});

gulp.task('min', function () {

    var path;
    if (typeof argv.d == "undefined") {
        path = "";
    } else {
        path = argv.d.replace(/^\/|\/$/g, '') + "/";
    }

    var perc;
    if (typeof argv.p == "undefined") {
        perc = "90-95";
    } else {
        perc = argv.p;
    }

    console.log("###############################");
    console.log("# Starting Img Quant:");
    console.log("# ");
    console.log("# Quailty: " + perc);
    console.log("# Path: " + path);
    console.log("###############################");


    gulp.src(path + '**/*.png')
            .pipe(gulpPngquant({
                quality: perc
            }))    
            .pipe(gulp.dest(function(file) {
                return file.base;
            }))
            

    // gulp.start('imgminJPG');
    

});


gulp.task('imgminJPG', function () {

    var path;
    if (typeof argv.p == "undefined") {
        path = "/";
    } else {
        path = argv.p;
    }

    console.log("###############################");
    console.log("# Starting JPG Compression:");
    console.log("###############################");

    return gulp.src(path + '/**/*.{jpg,jpeg}', {base: "./"})

        .pipe(imagemin({optimizationLevel:7,progressive:!0,interlaced:!0}))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));

});        


gulp.task('default', ['imgminPNG', 'zip']);

