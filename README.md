# Server Events

NestJS server with weather forecast using Server-Sent Events (SSE).

## Description

The project is a NestJS server that provides weather forecasts through Server-Sent Events. This allows clients to receive real-time weather updates without the need for constant HTTP requests.

## Technologies

- NestJS
- TypeScript
- Docker
- Server-Sent Events (SSE)
- Axios for HTTP requests

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Running the app

### Development

```bash
# Run in development mode
npm run start:dev
```

### Production

```bash
# Build the project
npm run build

# Run in production mode
npm run start:prod
```

### Docker

```bash
# Build and run using Docker Compose
docker-compose up --build
```

## Scripts

- `npm run build` - build the project
- `npm run start` - run in normal mode
- `npm run start:dev` - run in development mode
- `npm run start:debug` - run in debug mode
- `npm run start:prod` - run in production mode
- `npm run lint` - run linter
- `npm run test` - run tests
- `npm run test:watch` - run tests in watch mode
- `npm run test:cov` - run tests with coverage
- `npm run test:e2e` - run end-to-end tests

## Project Structure

```
├── src/              # Source code
├── dist/             # Compiled code
├── test/             # Tests
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── .env              # Environment variables
```

## License

ISC 