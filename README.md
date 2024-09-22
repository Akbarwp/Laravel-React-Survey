# Laravel React Survey

Laravel React Survey is a website that provides flexible survey creation features, similar to Google Forms. Built with Laravel and ReactJS, this site allows users to easily create, manage, and share surveys, while efficiently collecting responses in a modern and responsive interface.

## Tech Stack

- **Laravel 10**
- **MySQL Database**
- **ReactJS**
- **TailwindCSS**
- **LottieFiles**

## Features

- Main features available in this application:
  - CRUD Survey
  - Fill out surveys for other users

## Installation

Follow the steps below to clone and run the project in your local environment:

1. Clone repository:

    ```bash
    git clone https://github.com/Akbarwp/Laravel-React-Survey.git
    ```

2. Install dependencies use Composer and NPM:

    ```bash
    composer install
    npm install
    ```

3. Copy file `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

4. Generate application key:

    ```bash
    php artisan key:generate
    ```

5. Setup database in the `.env` file:

    ```plaintext
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel_react_survey
    DB_USERNAME=root
    DB_PASSWORD=
    ```

6. Run migration database:

    ```bash
    php artisan migrate
    ```

7. Run website:

    ```bash
    npm run dev
    php artisan serve
    ```

## Screenshot

- ### **Dashboard**

<img src="https://github.com/user-attachments/assets/7e4fb2b5-35bf-4676-b880-34f547fa873c" alt="Halaman Dashboard" width="" />
<br><br>

- ### **Survey page**

<img src="https://github.com/user-attachments/assets/c3765ca4-6151-44d7-adf6-6d92f868cc9f" alt="Halaman Survey" width="" />
&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/c6d524af-1e48-4615-932f-a4629c951fc6" alt="Halaman Survey" width="" />
&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/8aad2601-0b40-4e9d-9a20-0bf61b2a2d6d" alt="Halaman Survey" width="" />
&nbsp;&nbsp;&nbsp;
<br><br>

- ### **Survey form page**

<img src="https://github.com/user-attachments/assets/54071f51-26c1-4762-aa7e-5f3713d8b32a" alt="Survey Form" width="" />
<br><br>
