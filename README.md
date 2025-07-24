# 🌱 Rural Producer API

This API was developed for managing rural producers, their farms, harvests, and associated crops. It allows entity registration, crop associations with farms and harvests, and visual dashboards.

## 📦 Technologies

- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (unit and e2e tests)
- [Swagger](https://swagger.io/) for OpenAPI docs
- [Pino](https://github.com/pinojs/pino) for logging

---

## 🧱 Project Structure

```
.
├── src
│   ├── app.module.ts
│   ├── common
│   │   ├── entities
│   │   ├── exceptions
│   │   ├── interfaces
│   │   ├── seeds
│   │   └── tests
│   ├── modules
│   │   ├── culture
│   │   ├── culture-association
│   │   ├── dashboard
│   │   ├── farm
│   │   ├── harvest
│   │   └── producer
│   ├── shared
│   │   ├── database
│   │   ├── decorators
│   │   ├── filters
│   │   ├── interceptors
│   │   ├── services
│   │   ├── utils
│   │   └── validators
```

---

## 🚀 Running the Application

### 1. Clone the project

```bash
git clone https://github.com/mariasza/rural-producer-api.git
```

### 2. Start with Docker

```bash
docker-compose up --build
```

### 3. Run migrations

```bash
npm run migration:run:docker
```

### 4. Run seed data

```bash
npm run seed:docker
```

---

## 🧪 Tests

- Unit and integration tests:

```bash
npm run test:all
```

- Coverage:

```bash
npm run test:cov
```

---

## 📘 API Documentation

Available at:

```
http://localhost:3000/docs
```

---

## 📊 Dashboard

The `/dashboard` route returns (example):

```json
{
  "totalFarms": 3,
  "totalHectares": 250,
  "charts": {
    "byState": {
      "AM": 2,
      "PA": 1
    },
    "byCulture": {
      "Soja": 1,
      "Milho": 2
    },
    "landUse": {
      "agriculture": 160,
      "vegetation": 90
    }
  }
}
```

---

## 👷 Useful Scripts

| Command                     | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `docker-compose up`         | Start the app in development mode using Docker |
| `migration:generate:docker` | Generate a new migration inside container      |
| `migration:run:docker`      | Run migrations inside container                |
| `seed:docker`               | Seed database with mock data inside container  |
| `test:all`                  | Run all tests (including e2e)                  |

---

## ✍️ Author

- Created by [Maria Regina Araújo Souza](https://github.com/mariaregina)

---

## 🧠 Notes

- Designed with clean code principles, robust validation, exception handling, and full test coverage.
- The architecture is scalable and follows NestJS best practices.
