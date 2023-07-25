var gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
var replace = require("gulp-replace");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");

gulp.task("sass", function () {
  //root scss file (import all your partials into here)
  return (
    gulp
      .src("./sass/app.scss")
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      // add vendor prefixes
      .pipe(autoprefixer())
      // change the file name to be styles.scss.liquid file
      .pipe(rename("app.css"))
      // remove the extra set of quotations used for escaping the liquid string (we'll explain this in a sec)
      .pipe(replace('"{{', "{{"))
      .pipe(replace('}}"', "}}"))
      // save the file to the theme assets directory
      .pipe(gulp.dest("./assets/"))
  );
});
gulp.task("scss", function () {
  //root scss file (import all your partials into here)
  return (
    gulp
      .src("./sass/*.scss")
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      // add vendor prefixes
      .pipe(autoprefixer())
      // change the file name to be styles.scss.liquid file
      .pipe(sass())
      // remove the extra set of quotations used for escaping the liquid string (we'll explain this in a sec)
      .pipe(replace('"{{', "{{"))
      .pipe(replace('}}"', "}}"))
      // save the file to the theme assets directory
      .pipe(gulp.dest("./assets/"))
  );
});
gulp.task("default", function () {
  // this assumes your sass is in a directory named sass
  // gulp.watch(['./sass/**/*.scss'], ['sass']);
  gulp.watch("./sass/**/*.scss", gulp.series("scss"));
});
