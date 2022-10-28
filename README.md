# Сайт для онлайн школы тренировок “SkyFitnessPro”

[Demo](https://skyfitnesspro.herokuapp.com/)

## Установка

Склонируйте репозиторий и установите зависимости

```sh
cd skyfitnesspro
npm install
```

Создайте файл .env (пример переменной окружения находится в файле .env.example)

Для запуска сервера в development-режиме выполните команду

```sh
npm run serve
```

При необходимости production сборки выполните команду

```sh
npm run build
```

## Описание проекта:

Сайт для онлайн школы тренировок “SkyFitnessPro”.

Макет доступен [здесь.](https://www.figma.com/file/QoOmLM2WGbES23xQeDCCYi/%D0%A1%D0%B0%D0%B9%D1%82-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD-%D1%82%D1%80%D0%B5%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%BE%D0%BA?node-id=0%3A1)

## Структура и функционал приложения

### Главная страница приложения

- [x] логотип, краткое описание
- [x] список карточек с названиями всех курсов, имеющихся в базе данных
- [x] кнопка "Войти", при клике на которую пользователь попадает на страницу авторизации

### Страница курса

- [x] содержит логотип приложения и описание курса, имеющееся в базе данных

### Страница авторизации

- [x] на данной странице пользователь имеет возможность зарегистрироваться или войти в свой аккаунт

### Страница профиля

- [x] логотип приложения
- [x] информация о пользователе
- [x] кнопки для смены логина и пароля
- [x] в правом верхнем углу отображается имя пользователя, при клике на которое появляется дополнительное меню
- [x] отображается список курсов пользователя

### Страница тренировки

- [x] логотип приложения, краткое описание
- [x] в правом верхнем углу отображается имя пользователя, при клике на которое появляется дополнительное меню
- [x] видео тренировки
- [x] список упражнений (из базы данных)
- [x] таблица с прогрессом пользователя
- [x] кнопка для возможности заполнения прогресса по тренировке

### Работа приложения

- [x] приложение реализовано как SPA
- [x] главная страница:
  - [x] при клике на кнопку "Войти" пользователь попадает на страницу авторизации, если он еще не авторизован
  - [x] если пользователь авторизован, то при клике на кнопку "Войти" он сразу попадает на страницу профиля
  - [x] список карточек выводится в соответствии с названиями всех курсов, имеющихся в базе данных
  - [x] пока данные прогружаются, пользователь видит скелетоны карточек
  - [x] при ошибке запроса на странице выводится соответствующая надпись
  - [x] по клику на выбранный курс пользователь попадает на страницу, где может ознакомиться с его описанием
  - [x] при нажатии на кнопку "Наверх" страница прокручивается в начало списка доступных курсов
- [x] страницы авторизации и регистрации:
  - [x] настроена валидация полей логина и пароля
  - [x] при возникновении ошибки выводится соответствующее сообщение
- [x] страница профиля пользователя:
  - [x] при клике на кнопки "Редактировать e-mail", "Редактировать пароль" появляется модальное окно с возможностью редактировать и сохранять введенные данные
  - [x] в правом верхнем углу отображается имя пользователя, при клике на которое появляется меню с возможностью добавить/удалить курс (для демонстрации работы приложения), остаться на странице профиля, а также выйти из приложения
  - [x] в качестве аватарки отображается первая буква имени пользователя
  - [x] при клике на карточку курса появляется модальное окно с возможностью выбора тренировки, выполненные тренировки отмечены цветом и галочкой
  - [x] при клике на тренировку пользователь попадает на страницу соответствующей тренировки
- [x] страница тренировки:
  - [x] в правом верхнем углу отображается имя пользователя, при клике на которое появляется меню с возможностью добавить/удалить курс (для демонстрации работы приложения), перейти на страницу профиля, а также выйти из приложения
  - [x] при клике на название курса появляется модальное окно с возможностью выбрать тренировку
  - [x] возможность просматривать видео тренировки (play, stop, pause, регулировка громкости)
  - [x] при клике на кнопку "Заполнить свой прогресс" появляется модальное окно с возможностью ввести данные (настроена валидация) и сохранить их, при этом уже имеющиеся до этого данные о количестве выполненных повторений отображаются сразу при открытии окна
  - [x] после сохранения данных появляется модальное окно с надписью "Ваш прогресс засчитан", исчезающее через 0.8 секунды.
  - [x] в таблице прогресса отображаются упражнения (список берется из базы данных), а также выводится прогресс в процентах (автоматически рассчитывается после ввода данных пользователем)
- [x] при попытке неавторизованного пользователя зайти на страницу профиля или тренировки он автоматически попадает на главную страницу
- [x] при попытке авторизованного пользователя зайти на страницу тренировки, которой нет в списке его курсов, он автоматически попадает на главную страницу
- [x] при переходе на новую страницу реализована прокрутка страницы в начало
- [ ] реализована адаптивная верстка (breakpoints: 1440px, 1024px, 768px, 425px)

### Технический стек приложения

- [x] React
- [x] Redux + Redux Toolkit + RTK Query
- [x] Firebase
- [x] React Router DOM, реализация routing
- [x] TypeScript
- [x] [Material UI](https://mui.com/material-ui/getting-started/overview/)
