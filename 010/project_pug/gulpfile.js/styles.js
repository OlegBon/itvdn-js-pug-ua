import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import combineMediaQuery from "postcss-combine-media-query";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { logTask } from "./logger.js"; // Імпортуємо функцію логування

const browserSync = browserSyncLib.create();
const sass = gulpSass(dartSass);

// Компіляція SCSS → style.css
const scss2cssDev = () => {
  const startTime = Date.now();
  const processed = [];

  return src(paths.src.scssEntry)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rename("style.css"))
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.dev.css))
    .on("data", (file) => processed.push(file))
    .on("end", () => {
      logTask({
        env: "dev",
        label: "Компіляція SCSS",
        files: processed,
        startTime,
        showSize: true,
      });
    })
    .pipe(browserSync.stream());
};

// Оптимізація CSS → style.min.css
const postcss2cssProd = () => {
  const startTime = Date.now();
  const processed = [];
  const plugins = [autoprefixer(), combineMediaQuery(), cssnano()];

  return src(paths.copy.devCss)
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(rename("style.min.css"))
    .pipe(dest(paths.dist.css))
    .on("data", (file) => processed.push(file))
    .on("end", () => {
      logTask({
        env: "dist",
        label: "Оптимізація CSS",
        files: processed,
        startTime,
        showSize: true,
      });
    });
};

export { scss2cssDev, postcss2cssProd };
