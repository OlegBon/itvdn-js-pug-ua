import { src, watch, series, parallel } from "gulp";
import { deleteAsync } from "del";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { logTask, logSummary } from "./logger.js"; // Імпортуємо функцію логування

import { compileDevPug } from "./templates-pug.js"; // Імпортуємо функції для шаблонів Pug
import {
  moveHtml,
  pathRewriteHtml,
  minifyHtml,
  validateHtml,
} from "./templates-html.js"; // Імпортуємо функції для шаблонів HTML
import { scss2cssDev, postcss2cssProd } from "./styles.js"; // Імпортуємо функції для стилів
import { moveScripts, scriptLint, jsModify } from "./scripts.js"; // Імпортуємо функції для скриптів

const browserSync = browserSyncLib.create();

// Іменовані функції-обгортки для виклику з вибором середовища
const moveScriptsSrc = () => moveScripts("src");
const moveScriptsDev = () => moveScripts("dev");
const lintScriptsDev = () => scriptLint("dev");
const lintScriptsDist = () => scriptLint("dist");
const logDevSummary = logSummary("dev");
const logProdSummary = logSummary("prod");

// Функція для видалення старих файлів у dev або prod
async function cleanOldFiles(env = "dev") {
  const startTime = Date.now();
  const targets = paths.clean[env];
  const deletedPaths = await deleteAsync(targets, { force: true });

  const files = deletedPaths.map((path) => ({
    relative: path,
  }));

  logTask({
    env,
    label: "Очищення файлів",
    files,
    startTime,
    showSize: false, // true, якщо потрібно бачити (0 Б)
  });
}

// Функція для очищення сирих JS-файлів у prod, залишаючи лише main.min.js
const cleanRawJs = async () => {
  const startTime = Date.now();

  const deletedPaths = await deleteAsync(paths.clean.distJs, { force: true });

  const files = deletedPaths.map((path) => ({
    relative: path,
  }));

  logTask({
    env: "prod",
    label: "Очищення сирих JS-файлів",
    files,
    startTime,
    showSize: false,
  });
};

// Завдання для спостереження (слідкування за змінами у src, щоб потім збирати dev)
const watcherSrc = () => {
  browserSync.init({
    server: { baseDir: paths.dev.root },
  });

  watch(paths.watch.pug, compileDevPug);
  watch(paths.watch.scss, scss2cssDev);
  watch(paths.src.js, series(moveScriptsSrc, lintScriptsDev));
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
  moveScriptsSrc,
  lintScriptsDev,
  logDevSummary,
  watcherSrc
);
const prod = series(
  cleanProdOldFiles,
  parallel(
    series(moveHtml, validateHtmlProd, pathRewriteHtml, minifyHtml),
    series(postcss2cssProd),
    series(moveScriptsDev, lintScriptsDist, jsModify)
  ),
  cleanRawJs,
  logProdSummary,
  startProd
);

const buildOnlyProd = series(
  cleanProdOldFiles,
  parallel(
    series(moveHtml, validateHtmlProd, pathRewriteHtml, minifyHtml),
    series(postcss2cssProd),
    series(moveScriptsDev, lintScriptsDist, jsModify)
  ),
  cleanRawJs,
  logProdSummary
);

// Додаткове завдання
const htmllintDev = validateHtmlDev;
const htmllintProd = validateHtmlProd;
const jsLintSrc = () => scriptLint("src");
const jsLintDev = () => scriptLint("dev");
const jsLintProd = () => scriptLint("dist");
const jsBuildProd = jsModify;

const lintAllSrc = parallel(htmllintDev, jsLintSrc);

// Експорт завдань
export {
  dev,
  prod,
  buildOnlyProd,
  lintAllSrc,
  htmllintDev,
  htmllintProd,
  jsLintSrc,
  jsLintDev,
  jsLintProd,
  jsBuildProd,
};
