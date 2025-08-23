import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import htmlValidator from "gulp-html";
import processhtml from "gulp-processhtml";
import { minify } from "html-minifier-terser";
import through2 from "through2";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js

const browserSync = browserSyncLib.create();

// Переміщення HTML + live reload
const moveHtml = () => {
  return src(`${paths.dev.html}/*.html`)
    .pipe(dest(paths.dist.html))
    .pipe(browserSync.stream());
};

// Переписування шляхів у HTML
const pathRewriteHtml = () => {
  return src(paths.copy.devHtml)
    .pipe(processhtml())
    .on("data", (file) => {
      console.log("Оброблено файли:", file.relative);
    })
    .pipe(dest(paths.dist.html));
};

// Валідація HTML через gulp-html
const validateHtml = () => {
  return src(paths.copy.distHtml)
    .pipe(plumber())
    .pipe(htmlValidator({ verbose: true }));
};

// Мінімізація HTML через html-minifier-terser
const minifyHtml = () => {
  return src(paths.copy.distHtml)
    .pipe(
      through2.obj(async function (file, _, cb) {
        const result = await minify(file.contents.toString(), {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        });
        file.contents = Buffer.from(result);
        cb(null, file);
      })
    )
    .pipe(dest(paths.dist.html));
};

export { moveHtml, pathRewriteHtml, validateHtml, minifyHtml };
