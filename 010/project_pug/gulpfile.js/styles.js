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

const browserSync = browserSyncLib.create();
const sass = gulpSass(dartSass);

// Компіляція SCSS → style.css
const scss2cssDev = () => {
  return src(paths.src.scssEntry)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rename("style.css"))
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.dev.css))
    .pipe(browserSync.stream());
};

// Оптимізація CSS → style.min.css
const postcss2cssProd = () => {
  const plugins = [autoprefixer(), combineMediaQuery(), cssnano()];
  return src(paths.copy.devCss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(rename("style.min.css"))
    .pipe(dest(paths.dist.css));
};

export { scss2cssDev, postcss2cssProd };
