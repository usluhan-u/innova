# innova

The website for the Innova company.

- [PayloadCMS](https://payloadcms.com/) is used to manage the content of the website.
- The content is stored in a [MongoDB](https://www.mongodb.com/) database.
- The website is built with [Next.js](https://nextjs.org/) and [ChakraUI](https://chakra-ui.com/).

## How to Run on Local without Docker

1. Run `cp .env.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `yarn install` to install all dependencies.
4. Run `yarn dev` to start the application.

## How to Run on Local with Docker

1. Run `cp .env.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `docker-compose up` or `docker compose up` (if you use docker compose v2+) to start the application.

## How to Build and Run on Local

1. Run `cp .env.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `yarn install` to install all dependencies.
4. Run `yarn build` to build the application.
5. Run `yarn serve` to start the application.

## How to Run on Production

1. Run `cp .env.prod.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `./deploy.sh` file to deploy. Make sure you have the proper permissions to run the file. If not, run `chmod +x deploy.sh` to give yourself permissions.
