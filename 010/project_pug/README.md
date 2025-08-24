# 🧱 Pug Project Starter

Модульний білд-сетап на Gulp 5 з підтримкою Pug, SCSS, PostCSS, HTML-валідації та Browsersync. Побудований на ESM, з чистою архітектурою та централізованим управлінням шляхами.

## 🚀 Можливості

- ✅ Компіляція Pug → HTML
- ✅ SCSS → CSS з sourcemaps, autoprefixer, cssnano
- ✅ HTML-валідація через `gulp-html`
- ✅ Live reload через Browsersync
- ✅ Централізоване управління шляхами (`path.js`)
- ✅ Безпечне управління залежностями через `overrides`
- ✅ Чистий білд: `dev` і `prod` середовища

## 📦 Встановлення

```bash
npm install
```

> Після встановлення всі вразливості усуваються через `overrides` у `package.json`.

## 🛠️ Скрипти

| Команда            | Опис                                |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Запускає білд у режимі розробки     |
| `npm run prod`     | Збирає оптимізований продакшн-білд  |
| `npm run tasks`    | Показує доступні Gulp-таски         |
| `npm run htmlLint` | Перевірка HTML-файлів на валідність |

## 📁 Структура проєкту

```
project_pug/
├── src/           # Вихідні файли (pug, scss, js, assets)
├── dev/           # Режим розробки
├── prod/          # Продакшн-білд
├── gulpfile.js/   # Модульні таски
│   ├── index.js
│   ├── path.js
│   ├── styles.js
│   ├── templates-pug.js
│   └── templates-html.js
```

## 🧩 Управління залежностями

У `package.json` використовується:

```json
"overrides": {
  "postcss": "^8.4.38"
}
```

Це дозволяє уникнути вразливостей без зламу білду, зберігаючи сумісність з ESM.

## 🧠 Автор

[Oleg Bon](https://github.com/OlegBon)
