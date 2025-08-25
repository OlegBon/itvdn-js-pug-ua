import { watch, series } from "gulp";
import { deleteAsync } from "del";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { compileDevPug } from "./templates-pug.js"; // Імпортуємо функції для шаблонів Pug
import {
  moveHtml,
  pathRewriteHtml,
  validateHtml,
  minifyHtml,
} from "./templates-html.js"; // Імпортуємо функції для шаблонів HTML
import { scss2cssDev, postcss2cssProd } from "./styles.js"; // Імпортуємо функції для стилів

const browserSync = browserSyncLib.create();

// Функція для видалення старих файлів у dev або prod
async function cleanOldFiles(env = "dev") {
  const targets = paths.clean[env];
  const deleted = await deleteAsync(targets, { force: true });

  console.log(
    deleted.length
      ? `Видалено ${deleted.length}:\n` +
          deleted.map((f) => ` - ${f}`).join("\n")
      : "Нічого не видалено — файлів не знайдено."
  );
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

// Основні завдання
const dev = series(cleanDevOldFiles, compileDevPug, scss2cssDev, watcherDev);
const prod = series(
  cleanProdOldFiles,
  moveHtml,
  validateHtml,
  pathRewriteHtml,
  minifyHtml,
  postcss2cssProd,
  startProd
);

// Додаткове завдання
const htmllint = validateHtml;

// Експорт завдань
export { dev, prod, htmllint };
