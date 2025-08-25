import { src, watch, series } from "gulp";
import { deleteAsync } from "del";
import plumber from "gulp-plumber";
import htmlValidator from "gulp-html";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { compileDevPug } from "./templates-pug.js"; // Імпортуємо функції для шаблонів Pug
import { moveHtml, pathRewriteHtml, minifyHtml } from "./templates-html.js"; // Імпортуємо функції для шаблонів HTML
import { scss2cssDev, postcss2cssProd } from "./styles.js"; // Імпортуємо функції для стилів

const browserSync = browserSyncLib.create();

// Функція для видалення старих файлів у dev або prod
async function cleanOldFiles(env = "dev") {
  const targets = paths.clean[env];
  const deleted = await deleteAsync(targets, { force: true });

  console.log(
    deleted.length
      ? `[${env}] Видалено ${deleted.length}:\n` +
          deleted.map((f) => ` - ${f}`).join("\n")
      : `[${env}] Нічого не видалено — файлів не знайдено.`
  );
}

// Функція для валідації HTML з вибором середовища
function validateHtml(env = "dist") {
  const target = paths.copy[env === "dev" ? "devHtml" : "distHtml"];
  return src(target)
    .pipe(plumber())
    .pipe(htmlValidator({ verbose: true }))
    .on("data", (file) => {
      console.log(`[${env}] Валідація:`, file.relative);
    });
}

// Завдання для спостереження dev
const watcherDev = () => {
  browserSync.init({
    server: {
      baseDir: paths.dev.root,
    },
  });
  watch(paths.watch.pug, compileDevPug);
  watch(paths.watch.scss, scss2cssDev);
  watch(paths.dev.html).on("change", browserSync.reload);
};

// Завдання для старту після збірки prod
const startProd = (done) => {
  browserSync.init({
    server: {
      baseDir: paths.dist.root,
    },
  });
  done();
};

// Реєстрація завдань

// Завдання для видалення старих файлів
const cleanDevOldFiles = () => cleanOldFiles("dev");
const cleanProdOldFiles = () => cleanOldFiles("dist");

// Завдання для валідації HTML
const validateHtmlDev = () => validateHtml("dev");
const validateHtmlProd = () => validateHtml("dist");

// Основні завдання
const dev = series(
  cleanDevOldFiles,
  compileDevPug,
  validateHtmlDev,
  scss2cssDev,
  watcherDev
);
const prod = series(
  cleanProdOldFiles,
  moveHtml,
  validateHtmlProd,
  pathRewriteHtml,
  minifyHtml,
  postcss2cssProd,
  startProd
);

// Додаткове завдання
const htmllintDev = validateHtmlDev;
const htmllintProd = validateHtmlProd;

// Експорт завдань
export { dev, prod, htmllintDev, htmllintProd };
