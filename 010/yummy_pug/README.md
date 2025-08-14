# 🍰 YUMMY PUG Project 🐶

Welcome to the world of sweets with Yummy, our delightful pug that has a penchant for delightful desserts!

## 🌐 Overview

This project showcases Yummy the Pug's love for sweets. On this website, you'll get to see some of Yummy's favorite desserts, and even some handy tips for a sweet tooth!

## 📌 Table of Contents

- [YUMMY PUG's Introduction](#introduction)
- [Favorite Sweets](#favorite-sweets)
- [Tips from Yummy](#tips-from-yummy)
- [Join the Sweet World](#join-the-sweet-world)

## 🍩 Introduction

Meet YUMMY PUG! As the name suggests, Yummy loves all things sweet and is here to share this love with all of you. The word "Yummy" translates to "Tasty" in English, and this pug is here to introduce you to some delectable treats.

## 🍪 Favorite Sweets

Yummy the Pug's most loved desserts include:

1. **Червоний мак**: A praline treat with caramel crumbs, hazelnut seeds paste, and almond covered in chocolate glaze.
2. **Сливки-ленивки**: Light wafers combined with a dairy cream filling and covered in glaze.
3. **Ліщина**: A praline with added ground and grated hazelnut and almond, covered in chocolate glaze.

🖼️ Check out the images of these treats on the website!

## 🍫 Tips from Yummy

Eating a piece of chocolate not only adds a few extra calories but can boost your mood and brain function! Always opt for dark chocolate with high cocoa content. It has fewer fats and sugars compared to milk chocolate and is rich in magnesium, calcium, iron, protein, antioxidants, and vitamins.

Here are some other sweets recommended by Yummy:

- Dark Chocolate 🍫
- Marshmallow 🍥
- Fruit Jelly 🍇
- Marmalade 🍊
- Honey 🍯
- Halva 🥜
- Candied Fruits 🍬

## 💌 Join the Sweet World

Dive into this sweet world and live it up with Yummy!

## 👥 Credits

**Authors**: [neprostostas](#) and [Oleg Bon](https://github.com/OlegBon)

---

⭐️ Remember to give this project a star if you like it and want to see more updates!

# INSTRUCTION

A set of files for automatic compilation of .pug templates into html files.

To get started, you need to have Node.js installed (with its npm manager) - https://nodejs.org/en/

After installing Node.js via the command line, you need to globally install the Gulp manager with the command

```
npm i gulp -g
```

After that, you can work with the starter package for processing Pug files, which includes a customized gulp manager for compiling pug to html. Note that all files from the <b>app/pug</b> folder in <b>app/html</b> will be compiled, including subdirectories except for the <b>app/pug/includes</b> folder
(Intended for basic templates and general page blocks).

To start autocompilation in the project folder, you need to open the command line and write the command:<br>

```
gulp watch
```

After that, gulp-manager will automatically track changes in pug files and compile them into html. The command prompt should remain open. Moreover, in the case of errors in the code, compilation will not occur, and instead, error information will be displayed on the command line.
