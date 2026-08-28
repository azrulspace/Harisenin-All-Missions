# Harisenin LMS Edu Course Backend (Mission 9)

Welcome to the backend repository for the **LMS Edu Course** project (Mission 9 Intermediate Backend). This project serves as a robust and scalable REST API designed to manage online courses, enrollments, users, and educational materials.

## 🚀 Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database Engine:** PostgreSQL
- **Security:** `bcryptjs` for password hashing, `jsonwebtoken` for stateless authentication sessions, `helmet` and `cors` for API security.

## 🏗 Architecture & Design Pattern

The codebase adheres strictly to the **Service Layer Pattern** to ensure separation of concerns and a clean codebase:

- **Routes (`src/routes/`)**: Defines the endpoint mappings and applies necessary middlewares (like authentication/authorization).
- **Controllers (`src/controllers/`)**: Responsible only for handling incoming HTTP request data and returning HTTP responses using standardized formatters. No direct database queries happen here.
- **Services (`src/services/`)**: Contains all core business logic and Database ORM interactions (Prisma). Controllers delegate their work to these services.
- **Utils (`src/utils/`)**: Standalone helper functions like response formatting, JWT signing/verifying, and password hashing.
- **Middlewares (`src/middlewares/`)**: Contains logic to intercept requests (e.g., verifying JWTs, role checking, global error handling specifically tailored for Prisma unique constraints).

## 🛠 Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- PostgreSQL
- Postman (for API testing)

## 💻 Local Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Ensure you have a `.env` file at the root of the project with your connection details:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/edu_course_db?schema=public"
   JWT_SECRET="your_secret_key"
   JWT_EXPIRES_IN="1d"
   PORT=5000
   ```

3. **Database Migration & Sync**
   Ensure your PostgreSQL server is running, then execute Prisma to build the tables:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

## 🧪 API Testing with Postman

A complete Postman Collection is provided for easy API testing and assessment.

1. Locate the file: `docs/LMS-EduCourse-API.postman_collection.json`
2. Open Postman.
3. Click **Import** and select the `.json` file.
4. Set the `baseUrl`, `adminToken`, and `learnerToken` in the **Variables** tab of the imported collection to begin testing endpoints.
