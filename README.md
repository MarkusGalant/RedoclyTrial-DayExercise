# Redocly Trial Day Exercise

## Overview
This repository contains a full-stack application built for the Redocly trial day exercise. The project consists of a NestJS backend with Prisma ORM and a React frontend using Material-UI.

## Project Structure
```
.
├── backend/           # NestJS backend application
│   ├── src/          # Source code
│   ├── prisma/       # Database schema and migrations
│   └── test/         # Backend tests
├── frontend/         # React frontend application
│   ├── src/          # Source code
│   └── tools/        # Development tools
└── docs/             # Project documentation
```

## Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn
- SQLite (used as the database)

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npm run migrate
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate API client:
   ```bash
   npm run generate:api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

### Backend
- `npm run start:dev` - Start development server
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run preview` - Preview production build
- `npm run generate:api` - Generate API client from Swagger

## Tech Stack

### Backend
- NestJS
- Prisma ORM
- SQLite
- Swagger/OpenAPI
- Jest for testing

### Frontend
- React
- Material-UI
- Vite
- React Query
- TypeScript

## API Documentation
The API documentation is available at `/docs` when running the backend server.

## Contributing
Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License.