# Booking Service

## Overview
Welcome to the Booking Service repository. This project includes a backend service and a frontend application for managing reservations.

## Table of Contents
- [Service Requirements](#service-requirements-)
- [Initial Database Setup](#initial-database-setup-)
- [Front-End Requirements](#front-end-requirements-)
- [Starting the Back-End](#starting-the-back-end-)
- [Starting the Front-End](#starting-the-front-end-)
- [WOMM](#womm)
- [WHY USE THESE TECH](#why-tech-stack)

## Service Requirements 🔧
1. **Install Node Version Manager (nvm):**
    ```bash
    nvm use 20
    ```

2. **Navigate to the Booking Service Directory:**
    ```bash
    cd booking-service
    cd service  # Path: booking-service/service
    ```

3. **Install Backend Dependencies:**
    ```bash
    npm install  # Installs all backend requirements
    ```

## Initial Database Setup 🗄️
1. **Navigate to the src Directory:**
    ```bash
    cd src
    ```

2. **Run Database Migrations:**
    ```bash
    knex migrate:latest
    ```

## Front-End Requirements 🖥️
1. **Navigate to the Web Directory:**
    ```bash
    cd web  # Path: booking-service/web
    ```

2. **Install Front-End Dependencies:**
    ```bash
    npm install
    ```

## Starting the Back-End 🚀
1. **Run Post-Install Setup:**
    ```bash
    npm run postinstall
    ```

2. **Start the Back-End Server:**
    ```bash
    npm run start
    ```

## Starting the Front-End 🌐
1. **Build the Front-End Application:**
    ```bash
    npm run build
    ```

2. **Start the Front-End Server:**
    ```bash
    npm run start
    ```

## WOMM

### Guest Role 👤
- **Login Credentials:**
    - Email: [guest@gmail.com, guest_1@gmail.com, guest_2@gmail.com, guest_3@gmail.com, guest_4@gmail.com]
    - Password: password (in lowercase)

- **Happy Path:**
    - [Watch Video](https://www.loom.com/share/c0674bd108da41c6b2a95e02016cb033?sid=9bf2bbd3-48fb-4ede-b20e-833fe0d58aa2)

- **Reservation is Full → Status: Queued:**
    - [Watch Video](https://www.loom.com/share/0e502a351913434e8e9949b006389257?sid=273faedd-b334-46ce-bd0d-e53bd2252487)

- **One Confirmed Reservation → Canceled:**
    - [Watch Video](https://www.loom.com/share/02b795f72ba64c9da9dcc4c16d4b6e23?sid=5d535bb8-965b-4b06-993c-f2926164fd76)

### Employee Role 🧑‍💼
- **Login Credentials:**
    - Email: [employee@gmail.com]
    - Password: password (in lowercase)

- **Happy Path:**
    - [Watch Video](https://www.loom.com/share/dc5c5765ca6e4dfca8f9ee0793a9e329?sid=d031863c-0911-4603-9546-2b58d5f44d13)

## WHY USE THESE TECH
FE: React, antd
- **antd:** An enterprise-class UI design language and React UI library with a set of high-quality React components out of the box.

BE: sqlite3, knex, express
- **sqlite3:** SQList is friendly and good for demo, small fast and reliable.

- **knex:** Knex.js is a "batteries included" SQL query builder for SQLite3 *** the most important part is that I should add transaction to the mutations for integrity and consistency.

- [ ] Add transactions to mutations for integrity and consistency.

- **cache:** The cache I add is the temp cache for control table capacity, it is a simple cache, I can use redis or memcached for a better cache.

- [ ] Add redis or memcached for a better cache.

- **typescript:** TypeScript is a superset of JavaScript that compiles to clean JavaScript output. I used TypeScript for type checking and better code quality. But in this case I can add ZOD for better type checking.

- [ ] Add ZOD for better type checking. Especially for the input validation for example the date and time.

- ** authentication:** I used JWT for authentication, but I can use OAuth2 for better security.
- [ ] Add OAuth2 for better security.
- [ ] Add role based access control for better security in backend.

Failed in adding test cases with cucumber, should do later on.

There is a lot of things to do, but I think this is a good start.
