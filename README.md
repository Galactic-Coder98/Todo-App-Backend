# Backend Setup

Follow these steps to set up the backend for the project.

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

## Steps to Set Up the Backend

### 1. Clone the Repository

Clone the backend repository to your local machine.

```bash
git clone <backend-repo-url>
cd <backend-repo-folder>

```

### 2. Run npm install (to download all dependencies)

### 3. Create a .env file at the root of the directory and add this DatabaseURL in the .env file:
DATABASE_URL="mysql://root:ksOYSpSQrCuyvOJSVrLQAjrkzUjixxMp@junction.proxy.rlwy.net:44375/railway"

### 4. If prisma is not setup already, run the following commands:
npm install prisma --save-dev
npm install @prisma/client

### 5. Initialize primsa (npx prisma init)

### 6. Run (npx prisma generate)

### 7. Then run (npx prisma migrate dev --name init)

### 8. Turn the server on (npx nodemon index.js) so that the frontend project can make appropriate requests.
