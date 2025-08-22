import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import htmlValidator from "gulp-html";
import processhtml from "gulp-processhtml";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js

const browserSync = browserSyncLib.create();

// Переміщення HTML + live reload
function moveHtml() {
  return src(`${paths.dev.html}/*.html`)
    .pipe(dest(paths.dist.html))
    .pipe(browserSync.stream());
}

// Переписування шляхів у HTML
function pathRewriteHtml() {
  return src(paths.copy.devHtml)
    .pipe(processhtml())
    .pipe(processhtml())
    .on("data", (file) => {
      console.log("Оброблено файл:", file.relative);
    })
    .pipe(dest(paths.dist.html));
}

// Валідація HTML через gulp-html
function validationHtml() {
  return src(paths.copy.distHtml)
    .pipe(plumber())
    .pipe(htmlValidator({ verbose: true }));
}

export { moveHtml, pathRewriteHtml, validationHtml };
