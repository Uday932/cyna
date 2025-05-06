# Cyna app by MuUdMa

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Install PostgreSQL

You can download from the this [link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) the executable to install automatically :

- PostgreSQL Server
- pgAdmin 4
- Command Line Tools

## Install dependencies

Ensure you have all necessary dependencies installed:

```bash
npm install
```

## Configure the Database

### Setup

- **Create the Database**

  Before running migrations, ensure that your PostgreSQL database exists.

- **PostgreSQL database**

  In your `.env` file, set the DATABASE_URL environment variable to point to your database.

  ```
  DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
  ```

### Run Migrations

After setting up the database and configuring the environment variables, run the following command to apply the migrations:

```bash
npm run migrate
```

**Note:**: This runs "prisma migrate deploy" as defined in the `package.json` scripts.

### Database Reset and Seeding

If you need to reset your database (which will delete all data) and automatically apply migrations and seed data:

```bash
npx prisma migrate reset
```

This command will:

1. Drop the existing database
2. Create a new database
3. Apply all migrations
4. Run the seed script defined in your `package.json`

If you want to run the seed script separately without resetting the database:

```bash
npx prisma db seed
```

If you want to reset the database without running the seed script:

```bash
npx prisma migrate reset --skip-seed
```

## Admin User (Seed)

✅ **A default admin user is created by the seed script**:

Login: `muudma.solutions@gmail.com`

Password: `123Admin*`

🗑️ **If you don’t want this user**, you can remove or modify it in `prisma/seed.js`.

---
