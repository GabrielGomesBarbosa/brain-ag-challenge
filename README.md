# AG Brain - Challenge
----

## Backend

This system is built for registering rural producers, with features for data validation, CRUD operations, and dashboard metrics. The project is built using **Node.js** with **Express** for the backend, **Prisma ORM** for database interaction, and **PostgreSQL** as the database.

### Prerequisites

Ensure you have the following software installed on your machine:

- **Node.js**: `v20.11.0`
- **PostgreSQL**: `v12.16`

### Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/GabrielGomesBarbosa/brain-ag-challenge
cd brain-ag-challenge
```

#### 2. Install dependencies

Navigate to your project directory and run the following command to install all required packages:

```bash
npm install
```

#### 3. Environment setup

Create an ```.env.local``` file in the root directory with the following contents:

```bash
HOST=<host>
PORT=<port>
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database-name>?schema=public"
```

Replace the env variables to your correct data

##### Example:

```<host>```: Replace with the host string for use in the API.
```<port>```: Replace with the port for the API.
```postgresql://<user>:<password>@<host>:<port>/<database-name>?schema=public```: Replace with the actual connection string to your PostgreSQL database.

#### 4. Database Migration

Once the environment variables are set up, run the following command to migrate the database:

```bash
npm run migrate:dev
```

#### 5. Seeding the Database

To seed the database with initial data (for countries, states, and cities), run:

```bash
npm run seed:dev
```

### Running the Project

#### Development Mode

To run the project in development mode with hot-reloading, execute:

```bash
npm run dev
```

The application will run using your environment variables from ```.env.local``` with the Prisma client connected to the database.

#### Production Mode

To build the project for production, use the following command:

```bash
npm run build
```

Then, to start the production build, use:

```bash
npm run start:dev
```
