# Auto Grader Hub Backend

## Overview
The Auto Grader Hub Backend is a Bun.js server that provides APIs for the Auto Grader Hub frontend. It is built using the Elysia framework, which is a lightweight and flexible framework for building web applications.
## Getting Started

### Prerequisites
- [Bun](https://bun.sh/)
- [Postgres](https://www.postgresql.org/)

### Setup Bun

1. Install Bun

For MacOS or Linux:
```bash 
curl -fsSL https://bun.sh/install | bash
```

For Windows:
open a PowerShell terminal and run the following command:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

2. Check Bun version:
```bash
bun --version
```

### Setup Postgres

1. Install Postgres

[Download link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

version 16.4
[Guide](https://www.w3schools.com/postgresql/postgresql_install.php)


2. Add Postgres to your PATH

For Windows:
- Open Search and type in 'Environment Variables'
- Click on 'Edit the system environment variables'
- Click on 'Environment Variables'
- Under 'System variables', find 'Path' and click 'Edit'
- Click 'New' and add the path to your Postgres bin directory (e.g. C:\Program Files\PostgreSQL\16\bin)
- Click 'OK' on all windows
- Restart your terminal

3. Check Postgres version:
```bash
psql --version
```

4. Create new user and database

- Login to Postgres:
```bash
psql -U postgres
```

- Then input password

- After logging in, create a new user:

```bash
CREATE USER auto_grader_hub WITH PASSWORD 'abcd@1234';
```

- Create a new database:

```bash
 CREATE DATABASE auto_grader_hub_local OWNER auto_grader_hub;
```

- Grant all privileges to the new user:

```bash
GRANT ALL PRIVILEGES ON DATABASE drive_hub_local TO auto_grader_hub;
```

- Exit Postgres:

```bash
\q
```


### Setup the Auto Grader Hub Backend

1. Open a terminal and clone the repository:

```bash
git clone https://github.com/Binh-Innovations/auto-grader-hub-be.git
```

2. Navigate to the project directory:

```bash
cd auto-grader-hub-be
```

3. Install dependencies:

```bash
bun install
```

## How to use:

- Entities: Create new entities in `src/entities` folder then import them in `src/data-source.ts`
- Routes: define as an elysia plugin in `src/plugins.ts` need to chaining methods so can refer type :`app.post().get()`
- Services: Create new services in `src/services` folder then export it as a elysia decorate so it can be dependency
  injected into plugins

```typescript
//UserService.ts
class UserService{}
export default new Elysia()
  .decorate('userService', new UserService())
```

```typescript
//plugin/auth.ts
const authPlugin = new Elysia()
  .group("/auth", (group) =>
    group
      .use(userService))
     
```
- Global try catch so you don't need to wrap every function with try catch: look at `src/middlewares/errorMiddleware.ts`
- Global response so don't need to wrap anything when return: look at `src/middlewares/responseMiddleware.ts`
- For routes that need authentication, use the `derive()` api of elysia and passed in the `isAuthenticated` middleware
```typescript
app
 .derive(isAuthenticated())
      .get("/me", async ({user}) => {})
```
- All endpoints defined under the `derive(isAuthenticated())` will require a valid JWT token to access
- All endpoints defined below the `derive(isAdmin())` will not require jwt
- After `derive()` you can use user in request context to get the logged in user
- For testing
    - Create test as `*.test.ts` in `test` folder
    - Run test with `bun test`


## Running the server

### For development:
```bash
bun run dev
```

### For production:
```bash
bun run dev:prod
```

Happy coding!
Created By Binh Truong - 10/28/2024


