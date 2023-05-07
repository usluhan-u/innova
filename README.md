# innova

The website for the Innova company.

- [PayloadCMS](https://payloadcms.com/) is used to manage the content of the website.
- The content is stored in a [MongoDB](https://www.mongodb.com/) database.
- The website is built with [Next.js](https://nextjs.org/) and [ChakraUI](https://chakra-ui.com/).

## Table of Contents

- [Installation](#installation)
  - [How to Run on Local without Docker](#how-to-run-on-local-without-docker)
  - [How to Run on Local with Docker](#how-to-run-on-local-with-docker)
  - [How to Build and Run on Local](#how-to-build-and-run-on-local)
  - [How to Run on Production](#how-to-run-on-production)
- [How to Use](#how-to-use)

## Installation

---

### How to Run on Local without Docker

1. Run `cp .env.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `yarn install` to install all dependencies.
4. Run `yarn dev` to start the application.

### How to Run on Local with Docker

1. Run `cp .env.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `docker-compose up` or `docker compose up` (if you use docker compose v2+) to start the application.

### How to Build and Run on Local

1. Run `cp .env.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `yarn install` to install all dependencies.
4. Run `yarn build` to build the application.
5. Run `yarn serve` to start the application.

### How to Run on Production

1. Run `cp .env.prod.example .env` to create your .env file in the project root.
2. Fill out the **.env** file with your environment variables.
3. Run `./deploy.sh` file to deploy. Make sure you have the proper permissions to run the file. If not, run `chmod +x deploy.sh` to give yourself permissions.

## How to Use

---

<!-- TODO: Custom Pages and how to add them (name of the custom pages)  -->
<!-- TODO: How to add a new page -->
<!-- TODO: How to add menu -->
<!-- TODO: How to add footer -->
