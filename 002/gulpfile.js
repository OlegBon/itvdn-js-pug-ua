import gulp from "gulp";
import pug from "gulp-pug";

// Шляхи
const paths = {
  pug: {
    src: ["app/pug/**/*.pug", "!app/pug/includes/**/*.pug"],
    dest: "app/html",
  },
};

// Завдання для компіляції Pug
export const compilePug = () => {
  return gulp
    .src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.pug.dest));
};

// Завдання для спостереження
export const watch = () => {
  gulp.watch(paths.pug.src, compilePug);
};

// Реєстрація завдань
gulp.task("watch", watch);
gulp.task("pug-compile", compilePug);
