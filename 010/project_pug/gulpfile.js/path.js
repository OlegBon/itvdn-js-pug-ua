// Конфігурація шляху для завдань Gulp
// Цей файл визначає вихідні дані, шляхи розробки та розповсюдження для різних ресурсів проекту

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, ".."); // корінь проєкту

const srcRoot = resolve(root, "src");
const devRoot = resolve(root, "dev");
const distRoot = resolve(root, "prod");

const paths = {
  src: {
    root: srcRoot,
    pug: [`${srcRoot}/pug/**/*.pug`, `!${srcRoot}/pug/includes/**/*.pug`],
    scss: `${srcRoot}/scss/**/*.scss`,
    scssEntry: `${srcRoot}/scss/main.scss`,
    js: `${srcRoot}/js/**/*.js`,
    assets: `${srcRoot}/assets/**/*`,
    fonts: `${srcRoot}/assets/fonts/**/*`,
    images: `${srcRoot}/assets/images/**/*`,
    sprite: `${srcRoot}/assets/sprite/**/*`,
  },

  dev: {
    root: devRoot,
    html: `${devRoot}`,
    css: `${devRoot}/css`,
    js: `${devRoot}/scripts`,
    assets: `${devRoot}/assets`,
    fonts: `${devRoot}/assets/fonts`,
    images: `${devRoot}/assets/images`,
    sprite: `${devRoot}/assets/sprite`,
  },

  dist: {
    root: distRoot,
    html: `${distRoot}`,
    css: `${distRoot}/styles`,
    js: `${distRoot}/scripts`,
    assets: `${distRoot}/assets`,
    fonts: `${distRoot}/assets/fonts`,
    images: `${distRoot}/assets/images`,
    sprite: `${distRoot}/assets/sprite`,
    all: `${distRoot}/**/*`,
  },

  includes: {
    pug: `${srcRoot}/pug/includes/**/*.pug`,
  },

  watch: {
    pug: [`${srcRoot}/pug/**/*.pug`, `!${srcRoot}/pug/includes/**/*.pug`],
    scss: `${srcRoot}/scss/**/*.scss`,
    js: `${srcRoot}/js/**/*.js`,
    assets: `${srcRoot}/assets/**/*`,
  },

  // Якщо змінюємо структуру папок, потрібно буде оновити ці шляхи
  // Пам'ятаємо, що dev та prod при зміні назви папки потрібно буде змінити!!!
  clean: {
    dev: ["dev/**/*", "!dev/cache/**/*"],
    dist: ["prod/**/*", "!prod/cache/**/*"],
    distJs: ["prod/scripts/**/*", "!prod/scripts/main.min.js"],
  },
};

// Додаємо copy окремо після ініціалізації
paths.copy = {
  fonts: paths.src.fonts,
  images: paths.src.images,
  assets: paths.src.assets,
  devHtml: `${paths.dev.root}/*.html`,
  distHtml: `${paths.dist.root}/*.html`,
  devCss: `${paths.dev.css}/*.css`,
  distCss: `${paths.dist.css}/*.css`,
  devJs: `${paths.dev.js}/*.js`,
  distJs: `${paths.dist.js}/*.js`,
};

const getPath = (type, env = "src") => paths?.[env]?.[type];

export { paths, getPath };
