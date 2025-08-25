# 🧱 Pug Project Starter

![Node.js version](https://img.shields.io/badge/node-%3E=18.x-brightgreen)
![npm version](https://img.shields.io/badge/npm-%3E=9.x-blue)
![License](https://img.shields.io/badge/license-ISC-yellow)
![Build](https://img.shields.io/badge/build-passing-success)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-green)

Модульний білд-сетап на Gulp 5 з підтримкою Pug, SCSS, PostCSS, HTML-валідації та Browsersync. Побудований на ESM, з чистою архітектурою, централізованим управлінням шляхами та інтегрованим логером.

## 🚀 Можливості

- ✅ Компіляція Pug → HTML
- ✅ SCSS → CSS з sourcemaps, autoprefixer, cssnano
- ✅ HTML-валідація через `gulp-html` (з параметром середовища)
- ✅ Live reload через Browsersync
- ✅ Централізоване управління шляхами (`path.js`)
- ✅ Безпечне управління залежностями через `overrides`
- ✅ Чистий білд: `dev` і `prod` середовища
- ✅ Універсальне очищення файлів (`cleanOldFiles(env)`)
- ✅ Логер з аналітикою: кількість файлів, розмір, час виконання
- ✅ Загальна статистика білду після завершення

## 📦 Встановлення

```bash
npm install
```

> Після встановлення всі вразливості усуваються через `overrides` у `package.json`.

## 📦 Вимоги

Щоб коректно працювати з проєктом, необхідно:

- **Node.js** `>=18.x` — рекомендована версія для підтримки ESM та сучасних API
- **npm** `>=9.x` — для коректної роботи `overrides` та керування залежностями
- **Операційна система**: Windows, macOS або Linux — білд-сетап кросплатформений
- **Текстовий редактор**: рекомендовано [Visual Studio Code](https://code.visualstudio.com/) з розширеннями для Pug, SCSS, ESLint

> Перевірити версію Node.js можна командою:

```bash
node -v
```

## 🛠️ Скрипти

| Команда            | Опис                                        |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Запускає білд у режимі розробки             |
| `npm run prod`     | Збирає оптимізований продакшн-білд          |
| `npm run tasks`    | Показує доступні Gulp-таски                 |
| `npm run htmlLint` | Перевірка HTML-файлів на валідність (`dev`) |

## 📁 Структура проєкту

```
project_pug/
├── src/           # Вихідні файли (pug, scss, js, assets)
├── dev/           # Режим розробки
├── prod/          # Продакшн-білд
├── gulpfile.js/   # Модульні таски
│   ├── index.js               # Основна точка входу
│   ├── path.js                # Централізовані шляхи
│   ├── styles.js              # SCSS → CSS
│   ├── templates-pug.js       # Компіляція Pug
│   ├── templates-html.js      # Обробка HTML
│   └── logger.js              # Логер з аналітикою
```

## 📊 Логер

Після кожного таску виводиться:

- Середовище (`[dev]` / `[dist]`)
- Назва операції (`Компіляція`, `Валідація`, `Мінімізація`)
- Кількість оброблених файлів
- Імена файлів + розмір
- Час виконання
- Загальна статистика білду (в кінці)

## 🧩 Управління залежностями

У `package.json` використовується:

```json
"overrides": {
  "postcss": "^8.4.38"
}
```

Це дозволяє уникнути вразливостей без зламу білду, зберігаючи сумісність з ESM.

## 🙏 Подяки

Особлива подяка авторам навчальних курсів на платформі ITVDN, які надихнули на створення цього білд-сетапу:

- **Сластен Максим** — [Верстка сторінок з використанням Gulp](https://itvdn.com/ua/video/gulp)  
  За чітке пояснення принципів роботи Gulp та побудову ефективного workflow.

- **Кінаш Станіслав** — [Шаблонізатор Pug](https://itvdn.com/ua/video/pug-ua)  
  За глибоке занурення у синтаксис Pug та практичні приклади використання шаблонізатора.

> Ці матеріали стали основою для архітектурних рішень, які реалізовані в цьому проєкті.

## 🧠 Автор

[Oleg Bon](https://github.com/OlegBon)

## 📚 Корисні ресурси

- [Gulp.js Documentation](https://gulpjs.com/docs/en/getting-started/quick-start) — офіційна документація таск-раннера Gulp
- [Pug.js Guide](https://pugjs.org/api/getting-started.html) — синтаксис та API шаблонізатора Pug
- [PostCSS Docs](https://postcss.org/) — плагін-система для трансформації CSS
- [Browsersync Docs](https://browsersync.io/docs) — live reload та синхронізація браузера
- [gulp-html](https://www.npmjs.com/package/gulp-html) — HTML-валідатор для Gulp
- [ITVDN: Верстка сторінок з використанням Gulp](https://itvdn.com/ua/video/gulp) — відеокурс Максима Сластена
- [ITVDN: Шаблонізатор Pug](https://itvdn.com/ua/video/pug-ua) — відеокурс Станіслава Кінаша

> Ці ресурси допоможуть краще зрозуміти архітектуру білду, розширити функціональність або адаптувати проєкт під власні потреби.
