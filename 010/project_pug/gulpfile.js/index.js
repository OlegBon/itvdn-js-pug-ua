import { watch, series } from "gulp";
import { deleteAsync } from "del";
import browserSyncLib from "browser-sync";

import { paths } from "./path.js"; // Імпортуємо шляхи з файлу path.js
import { compileDevPug } from "./templates-pug.js"; // Імпортуємо функції для шаблонів Pug

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

// Завдання для спостереження
const watcher = () => {
  browserSync.init({
    server: {
      baseDir: paths.dev.root,
    },
  });
  watch(paths.watch.pug, compileDevPug);
  watch(paths.dev.html).on("change", browserSync.reload);
};

// Реєстрація завдань
const watchDevPug = series(compileDevPug, watcher);

const dev = series(cleanDevOldFiles, compileDevPug, watcher);

export { dev, compileDevPug, watchDevPug, cleanDevOldFiles };
