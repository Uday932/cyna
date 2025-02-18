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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Install PostgreSQL

You can download from the this [link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) the executable to install automatically :

- PostgreSQL Server
- pgAdmin 4
- Stack builder
- Command Line Tools

## Install dependencies

Ensure you have all necessary dependencies installed:

```bash
npm install
```

## Configure the Database

### Set Up the Database:

**Create the Database**

Before running migrations, ensure that your PostgreSQL database exists.
Configure Environment Variables: In your `.env` file, set the DATABASE_URL environment variable to point to your

**PostgreSQL database**

```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### Run Migrations

After setting up the database and configuring the environment variables, run the following command to apply the migrations:

```bash
npm run migrate
```
