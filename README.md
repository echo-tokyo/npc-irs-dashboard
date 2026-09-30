## Тестовое задание в НПЦ ИРС (Fullstack)

Backend: PostgreSQL, Node.js, Express, Sequelize
Frontend: React, TypeScript, MUI, AG Grid

Оформление основано на Material Dashboard 2 React от Creative Tim

## Требования:

1. Node.js 20.19+
2. PostgreSQL 14+, утилита psql в PATH

## Запуск

1. Запуск БД. Из корня проекта:

```bash
psql -U postgres -f init-db.sql
```

P.S. Скрипт удаляет базу company, если она есть, создаёт её заново, создаёт таблицы и заполняет их данными

2. Запуск сервера

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

В `.env` укажите пароль пользователя PostgreSQL (`DB_PASSWORD`) и при необходимости остальные параметры подключения. Сервер запускается на `http://localhost:3000`

3. Запуск клиента, в отдельном терминале

```bash
cd client
npm install
npm run dev
```
