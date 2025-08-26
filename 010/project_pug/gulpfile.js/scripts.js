import { src, dest } from "gulp";
import rename from "gulp-rename";
import plumber from "gulp-plumber";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify-es";
import eslint from "gulp-eslint";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.
import { logTask, logSummary } from "./logger.js"; // Імпортуємо функцію логування

const browserSync = browserSyncLib.create();

// Копіювання JS-файлів
const moveScripts = (env = "dev") => {
  let targetFrom, targetTo;

  if (env === "src") {
    targetFrom = paths.src.js;
    targetTo = paths.dev.js;
  } else if (env === "dev") {
    targetFrom = paths.copy.devJs;
    targetTo = paths.dist.js;
  }

  const startTime = Date.now();
  const processed = [];

  return src(targetFrom)
    .pipe(dest(targetTo))
    .on("data", (file) => processed.push(file))
    .on("end", () => {
      logTask({
        env,
        label: "Копіювання JS-файлів",
        files: processed,
        startTime,
        showSize: true,
      });
    })
    .pipe(browserSync.stream());
};

// Лінтинг з автофіксом
const scriptLint = (env = "dev") => {
  let target;
  if (env === "src") {
    target = paths.src.js;
  } else if (env === "dev") {
    target = paths.copy.devJs;
  } else if (env === "dist") {
    target = paths.copy.distJs;
  }
  const startTime = Date.now();
  const processed = [];

  return src(target)
    .pipe(plumber())
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(dest((file) => file.base))
    .pipe(eslint.failAfterError())
    .on("data", (file) => processed.push(file))
    .on("end", () => {
      logTask({
        env,
        label: "Валідація JS-файлів",
        files: processed,
        startTime,
        showSize: false,
      });
    });
};

// Трансформація + мінімізація
const jsModify = () => {
  const startTime = Date.now();
  const processed = [];

  return src(paths.copy.distJs)
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-transform-spread"],
      })
    )
    .pipe(concat("index.js"))
    .pipe(uglify.default()) // важливо: .default для ESM
    .pipe(rename("main.min.js"))
    .pipe(dest(paths.dist.js))
    .on("data", (file) => processed.push(file))
    .on("end", () => {
      logTask({
        env: "prod",
        label: "Трансформація та мінімізація JS-файлів",
        files: processed,
        startTime,
        showSize: true,
      });
    });
};

export { moveScripts, scriptLint, jsModify };
