# Название
Севрер: Node.js + Express
MongoDB + Mongoose

Клиент: React + React Router + Material UI


## Сервер

---

### Routers Scheme

#### `/tags/` GET

JSON список всех тегов в виде массива объектов из БД.

#### `/tags/filter/` POST

Список отфильтроновых тегов в виде массива объектов из БД. Фильтр отправляется в виде JSON.

#### `/:id` GET

Одни тэг по индетификатору в виде JSON.

#### `/createTestTags` GET

Тестовая функция слзданяия 3-х тегов.
