# DVMB

#### DVMB is a backend application developed as a technical test. 

It is built using Node.js, Express, and PostgreSQL, with Drizzle ORM handling database operations. The application features user authentication and employee data management through a RESTful API.

## Project Structure
```
DVMB/
├── src/
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── karyawanController.ts
│   ├── db/
│   │   ├── migrations/
│   │   │   └── 0001_red_obadiah_stane.sql
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   ├── routes/
│   │   └── index.ts
│   ├── services/
│   │   ├── userService.ts
│   │   └── karyawanService.ts
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- User authentication and management
- Employee data management
- PostgreSQL database with Drizzle ORM
- RESTful API endpoints
- CORS support
- Rate limiting for API protection

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL database

## Installation

1. Clone the repository:
```
 git clone https://github.com/your-username/DVMB.git

 cd DVMB
```
2. Install dependencies:
```
pnpm install
```
3. Set up your environment variables by copying the `.env.example` file to `.env` and filling in your specific details:
```
cp .env.example .env
```

4. Run database migrations:
```
pnpm run db:migrate
```

5. (Optional) Seed the database:
```
pnpm run db:seed
```

## Running the Application

To start the development server:
```
pnpm run dev
```

The server will start on the port specified in your `.env` file (default is 3000).

## API Endpoints

- Users:
    - POST /api/users
    - GET /api/users
    - GET /api/users/:id
    - PUT /api/users/:id
    - DELETE /api/users/:id

- Karyawan (Employees):
    - POST /api/karyawan
    - GET /api/karyawan
    - GET /api/karyawan/:id
    - PUT /api/karyawan/:id
    - DELETE /api/karyawan/:id