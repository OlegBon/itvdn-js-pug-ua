import { src, dest } from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import browserSyncLib from "browser-sync";
import through2 from "through2";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { logTask } from "./logger.js"; // Імпортуємо функцію логування

const browserSync = browserSyncLib.create();

// Завдання для компіляції Pug з обробкою першого порожнього рядка
const compileDevPug = () => {
  const startTime = Date.now();
  const processed = [];

  return src(paths.src.pug)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          let content = file.contents.toString("utf8");

          // Видалити перший порожній рядок
          content = content.replace(/^\s*\n/, "");

          // Прибрати слеші з void-елементів
          content = content.replace(
            /<(\b(?:meta|link|img|input|br|hr|source|track)\b[^>]*?)\/>/gi,
            "<$1>"
          );

          file.contents = Buffer.from(content);
        }
        processed.push(file);
        this.push(file);
        cb();
      })
    )
    .pipe(dest(paths.dev.html))
    .on("end", () => {
      logTask({
        env: "dev",
        label: "Компіляція Pug",
        files: processed,
        startTime,
        showSize: true,
      });
    })
    .pipe(browserSync.stream());
};

export { compileDevPug };
