# Adopt Me API

Adopt Me API is a Fastify-based application designed to manage pet adoptions. It uses Prisma as the ORM and follows SOLID principles for a clean and maintainable codebase.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/adopt-me-api.git
    cd adopt-me-api
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

5. Generate Prisma client:

    ```sh
    npx prisma generate
    ```

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
- `PORT`: The port on which the server runwill.
- `JWT_SECRET`: Secret key for JWT authentication.
- `DATABASE_URL`: Database connection URL.

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
README.md
src/
  app.ts
  database/
    prisma/
      schema.prisma
  env/
    index.ts
  errors/
    handlers/
      GlobalErrorHandler.ts
      ZodErrorHandler.ts
    InvalidEnvironmentVariablesError.ts
    OngAddressError.ts
    PasswordDontMatchError.ts
    UnautorizedError.ts
    UserAlreadyExistsError.ts
    UserInvalidCredentialsError.ts
    UserNotFoundError.ts
  middleware/
    auth.test.ts
    auth.ts
    swagger.ts
  modules/
    ongs/
      controllers/
        OngController.ts
      dtos/
        OngDTO.ts
      repositories/
        interfaces/
          IOngRepository.ts
        prisma/
          OngRepository.ts
      services/
        factories/
          MakeOngService.ts
        OngService.ts
      routes.ts
      index.ts
    pets/
      controllers/
        PetController.ts
      dtos/
        PetDTO.ts
      repositories/
        interfaces/
          IPetRepository.ts
        prisma/
          PetRepository.ts
      services/
        factories/
          MakePetService.ts
        PetService.ts
      routes.ts
      index.ts
    users/
      controllers/
        UserController.ts
      dtos/
        UserDTO.ts
      repositories/
        interfaces/
          IUserRepository.ts
        prisma/
          UserRepository.ts
      services/
        factories/
          MakeUserService.ts
        UserService.ts
      routes.ts
      index.ts
  routes.ts
  server.ts
  utils/
    Response.ts
tsconfig.json
```

## API Documentation

The API documentation is available at `/docs` when the server is running. It uses Swagger UI for interactive API documentation.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
