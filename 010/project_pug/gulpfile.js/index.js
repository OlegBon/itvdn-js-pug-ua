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

const browserSync = browserSyncLib.create();

// Функція для видалення старих файлів у dev
async function cleanDevOldFiles() {
  const deleted = await deleteAsync(paths.clean.dev, {
    force: true,
  });
  console.log(
    deleted.length
      ? `Видалено ${deleted.length} файлів:\n` +
          deleted.map((f) => ` - ${f}`).join("\n")
      : "Нічого не видалено — файлів не знайдено."
  );
}

// Функція для видалення старих файлів у prod
async function cleanProdOldFiles() {
  const deleted = await deleteAsync(paths.clean.dist, {
    force: true,
  });
  console.log(
    deleted.length
      ? `Видалено ${deleted.length} файлів:\n` +
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
const dev = series(cleanDevOldFiles, compileDevPug, watcherDev);
const prod = series(
  cleanProdOldFiles,
  moveHtml,
  validateHtml,
  pathRewriteHtml,
  minifyHtml,
  startProd
);

const htmllint = validateHtml;

export { dev, prod, htmllint };
