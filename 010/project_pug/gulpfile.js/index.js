import { src, dest, watch, series } from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
// import sourcemaps from "gulp-sourcemaps";
// import htmlmin from "gulp-htmlmin";
// import htmlValidator from "gulp-html";
// import del from "del";
import browserSyncLib from "browser-sync";
import through2 from "through2";

const browserSync = browserSyncLib.create();

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js

// Завдання для компіляції Pug з обробкою першого порожнього рядка
const compilePug = () => {
  return (
    src(paths.src.pug)
      .pipe(plumber())
      // .pipe(sourcemaps.init())
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
      // .pipe(sourcemaps.write())
      // .pipe(htmlValidator({ verbose: true }))
      // .pipe(
      //   htmlmin({
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   })
      // )
      .pipe(dest(paths.dev.html))
      .pipe(browserSync.stream())
  );
};

// Завдання для очищення HTML папки
// const cleanHtml = () => del([paths.pug.destHtml]);

// Завдання для спостереження
const watcher = () => {
  browserSync.init({
    server: {
      baseDir: paths.dev.root,
    },
  });
  watch(paths.src.pug, compilePug);
  watch(paths.dev.html).on("change", browserSync.reload);
};

// Реєстрація завдань
const watchPug = series(compilePug, watcher);
export { compilePug, watchPug };
