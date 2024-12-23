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

### 2. Download all dependencies running the following:
```bash
npm install
```

### 3. Create a .env file at the root of the directory and add this DatabaseURL in the .env file:
```bash
DATABASE_URL="mysql://root:ksOYSpSQrCuyvOJSVrLQAjrkzUjixxMp@junction.proxy.rlwy.net:44375/railway"
```

### 4. If prisma is not setup already, run the following commands:
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 5. Initialize primsa and generate prisma client:
```bash
npx prisma init
npx prisma generate
```

### 6. Then run the migration for the table that's already there:
```bash
npx prisma migrate dev --name init
```

### 8. Turn the server on so that the frontend project can make appropriate requests:
```bash
npx nodemon index.js
```
