import { src, dest } from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import browserSyncLib from "browser-sync";
import through2 from "through2";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js

const browserSync = browserSyncLib.create();

// Завдання для компіляції Pug з обробкою першого порожнього рядка
const compileDevPug = () => {
  return src(paths.src.pug)
    .pipe(plumber())
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
    .pipe(dest(paths.dev.html))
    .pipe(browserSync.stream());
};

export { compileDevPug };
