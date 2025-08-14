import gulp from "gulp";
import pug from "gulp-pug";
import through2 from "through2";

// Шляхи
const paths = {
  pug: {
    src: ["app/pug/**/*.pug", "!app/pug/includes/**/*.pug"],
    dest: "app/html",
  },
};

// Завдання для компіляції Pug з обробкою першого порожнього рядка
export const compilePug = () => {
  return gulp
    .src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          let content = file.contents.toString("utf8");
          content = content.replace(/^\s*\n/, ""); // Видалити перший порожній рядок
          file.contents = Buffer.from(content);
        }
        this.push(file);
        cb();
      })
    )
    .pipe(gulp.dest(paths.pug.dest));
};

// Завдання для спостереження
export const watch = () => {
  gulp.watch(paths.pug.src, compilePug);
};

// Реєстрація завдань
export default gulp.series(compilePug, watch);
