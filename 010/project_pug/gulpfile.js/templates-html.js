import { src, dest } from "gulp";
import processhtml from "gulp-processhtml";
import { minify } from "html-minifier-terser";
import plumber from "gulp-plumber";
import htmlValidator from "gulp-html";
import through2 from "through2";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { logTask } from "./logger.js"; // Імпортуємо функцію логування

const browserSync = browserSyncLib.create();

// Переміщення HTML + live reload
const moveHtml = () => {
  const startTime = Date.now();
  const processed = [];

  return src(`${paths.dev.html}/*.html`)
    .on("data", (file) => processed.push(file))
    .pipe(dest(paths.dist.html))
    .pipe(browserSync.stream())
    .on("end", () => {
      logTask({
        env: "dist",
        label: "Переміщення HTML",
        files: processed,
        startTime,
        showSize: true,
      });
    });
};

// Переписування шляхів у HTML
const pathRewriteHtml = () => {
  const startTime = Date.now();
  const processed = [];

  return src(paths.copy.devHtml)
    .pipe(processhtml())
    .on("data", (file) => processed.push(file))
    .pipe(dest(paths.dist.html))
    .on("end", () => {
      logTask({
        env: "dist",
        label: "Переписування шляхів у HTML",
        files: processed,
        startTime,
        showSize: true,
      });
    });
};

// Мінімізація HTML через html-minifier-terser
const minifyHtml = () => {
  const startTime = Date.now();
  const processed = [];

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
        processed.push(file);
        cb(null, file);
      })
    )
    .pipe(dest(paths.dist.html))
    .on("end", () => {
      logTask({
        env: "dist",
        label: "Мінімізація HTML",
        files: processed,
        startTime,
        showSize: true,
      });
    });
};

// Функція для валідації HTML з вибором середовища
const validateHtml = (env = "dist") => {
  const target = paths.copy[env === "dev" ? "devHtml" : "distHtml"];
  const startTime = Date.now();
  const processed = [];

  return src(target)
    .pipe(plumber())
    .pipe(htmlValidator({ verbose: true }))
    .on("data", (file) => {
      processed.push(file);
    })
    .on("end", () => {
      logTask({
        env,
        label: "Валідація HTML",
        files: processed,
        startTime,
        showSize: true,
      });
    });
};

export { moveHtml, pathRewriteHtml, minifyHtml, validateHtml };
