# NPC IRS Dashboard

Веб-приложение для учёта отделов и сотрудников: PostgreSQL + Node.js (Express, Sequelize) + React (MUI, AG Grid).

- **Отделы** — главная таблица, загружается частями при прокрутке (AG Grid Infinite Row Model, `LIMIT`/`OFFSET` на сервере).
- **Сотрудники** — связанная таблица (`employees.department_id` → `departments.id`) с добавлением, изменением и удалением.

## Требования

- Node.js 20.19 или новее
- PostgreSQL 14 или новее, утилита `psql` в `PATH`

## Запуск

### 1. База данных

Из корня проекта:

```bash
psql -U postgres -f init-db.sql
```

Скрипт удаляет базу `company`, если она есть, создаёт её заново, создаёт таблицы и заполняет их данными.

### 2. Сервер

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

В `.env` укажите пароль пользователя PostgreSQL (`DB_PASSWORD`) и при необходимости остальные параметры подключения. Сервер запускается на `http://localhost:3000`.

### 3. Клиент

В отдельном терминале:

```bash
cd client
npm install
npm run dev
```

Приложение открывается на `http://localhost:5173`. Запросы к `/api` Vite проксирует на сервер.

## API

| Метод  | Путь                              | Описание                                                    |
| ------ | --------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/departments?limit=&offset=` | отделы порциями, ответ `{ rows, total }`; без `limit` — все |
| GET    | `/api/departments/:id`            | один отдел                                                  |
| POST   | `/api/departments`                | создать отдел                                               |
| PUT    | `/api/departments/:id`            | изменить отдел                                              |
| DELETE | `/api/departments/:id`            | удалить отдел (409, если в нём есть сотрудники)             |
| GET    | `/api/employees`                  | сотрудники с названием отдела                               |
| GET    | `/api/employees/:id`              | один сотрудник                                              |
| POST   | `/api/employees`                  | создать сотрудника                                          |
| PUT    | `/api/employees/:id`              | изменить сотрудника                                         |
| DELETE | `/api/employees/:id`              | удалить сотрудника                                          |

Тело запросов — JSON. Ошибки возвращаются в виде `{ "message": "..." }` с кодами 400, 404, 409 или 500.

## Структура

```
client/   React + Vite: app/ (роутинг, layout), components/ui, pages/, services/ (запросы к API)
server/   Express: src/models, src/controllers, src/routes
init-db.sql
```

## Шаблон

Оформление основано на [Material Dashboard 2 React](https://github.com/creativetimofficial/material-dashboard-react) от [Creative Tim](https://www.creative-tim.com/) (лицензия MIT). Из шаблона перенесены тёмная тема и вид бокового меню, навбара и карточек.
