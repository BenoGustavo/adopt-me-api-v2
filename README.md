# Fastify Prisma API Template

A simple Fastify + Prisma application with some boilerplate code, following the SOLID principles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/fastify-prisma-api-template.git
    cd fastify-prisma-api-template
    ```

2. Install dependencies:

    ```sh
    yarn install
    ```

3. Set up the environment variables:

    ```sh
    cp .env.example .env
    ```

4. Update the .env file with your configuration.

## Usage

### Development

To start the development server with hot-reloading:

```sh
yarn start:dev
```

### Production

To build and start the production server:

```sh
yarn build
yarn start
```

## Scripts

- `start:dev`: Start the development server with hot-reloading.
- `start`: Start the production server.
- `build`: Build the project.
- `prisma-web`: Open Prisma Studio.
- `test`: Run tests using Jest.

## Environment Variables

The following environment variables are used in this project:

- `NODE_ENV`: The environment in which the application is running (`dev`, `prod`, `test`).
- `PORT`: The port on which the server will run.

## Project Structure

```plaintext
.env
.env.example
.eslintignore
.eslintrc.json
.gitignore
.vscode/
  settings.json
docker-compose.yml
Dockerfile
eslint.config.mjs
jest.config.ts
LICENSE
package.json
prisma/
  schema.prisma
README.md
src/
  __tests__/
    services/
      hello-world.service.spec.ts
  app.ts
  env/
    index.ts
  errors/
    InvalidEnvironmentVariablesError.ts
  http/
    controllers/
      hello-world.controller.ts
    routes/
      hello-world.router.ts
  repositories/
    in-memory/
      database/
        init-sqlite.ts
        sqlite.ts
      sqlite-hello-world.repository.ts
    interfaces/
      hello-world.repository.ts
    postgres/
      hello-world.repository.ts
  server.ts
  services/
    factories/
      make-hello-world-service.ts
    hello-world.service.ts
tsconfig.json
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
