var gulp = require("gulp");
var ghPages = require("gulp-gh-pages");
var gitbook = require("gitbook");
gulp.task("build", function(cb){
    var book = new gitbook.Book('.',{
        // config: {output: "./_book/"}
    });
    book.parse().then(function(){
        return book.generate("website");
    }).then(function(){
        cb();
    });
})

gulp.task("publish", function(){
    return gulp.src("./_book/**/*").pipe(ghPages());
});
gulp.task("default", ["build"])
