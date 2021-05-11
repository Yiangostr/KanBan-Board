# Kanban Board -Task

> ReactJS | TypeScript | NodeJS | Pgsql | GraphQL | Apollo | MaterialUI

## Setup

First `git clone` and `cd` into the root directory

---

#### 1. Frontend

`yarn` to install the dependencies \
`yarn start` to start the ReactJS application

---

#### 2. Backend

> You need to have a Postgres DB. <https://www.postgresql.org/download/>

open another terminal and `cd <root folder>/server`
setup the `env` variables <br>
enter `mv sample.env .env` to copy the sample env file and change the values.
enter the values for the following ENVs

```
DB_HOST=localhost:5432
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

##### 2.1 my Env example (picture 4)

![Image](https://i.imgur.com/Fc9mwgO.png)

```
DB_HOST=localhost:5432
DB_USER=postgres
DB_PASSWORD=Rckmlibr2
DB_NAME=postgres
```

then `yarn` to install the dependencies

`yarn start` to start the GraphQL NodeJS server.

---

## Short description about FE

- Application is based on ReactJS.
- `Redux` is used as a centralized data store. `reselector` is used for the redux query caching.
- `Immer` is used to maintain the store immutable property
- Google Material UI is used as the UI theme
- `react-beautiful-dnd` is used for the drag and drop feature
- `react-router-dom` is used for simple routing within the application
- backend communication is done via `Graph-QL`

## Short description about the BE

- NodeJS as the backend.
- Pgsql to store the data
- GraphQL is used for REST Communication.
- Sequlize is used for ORM. (prevent writing raw SQL queries)

## Features

- A column can be renamed or removed :white_check_mark:

- The user can add tasks to a column :white_check_mark:

- A task can be added to any column. A task features a short description which is output to the kanban board. To edit the short description, the user clicks the task and updates the text of the caption in the dialog window that opens. :white_check_mark:

- A task can be dragged to another column :white_check_mark:

- A task can be removed. :white_check_mark:

- In the dialog window which is used to edit the task properties, the user can provide the full description of the task. :white_check_mark:

- A task can be opened on a dedicated page by using a link. When open, the task features a short description (caption), full description, the name of the column where the task can be located on the kanban board, as well as the creation time and the time of the latest update. Using this page, the user can delete the task. :white_check_mark:

- All columns and tasks must be stored in memory of the graphql service. :white_check_mark:

Optional / Nice to see:

Advanced feature 1: enable adding multiple kanban boards providing their name and an alias for opening a selected board.:white_check_mark:

Advanced feature 2: store everything not in graphql memory but in redis or pgsql.:white_check_mark:
