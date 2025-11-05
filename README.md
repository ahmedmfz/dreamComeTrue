# Mini eCommerce Product Listing – Technical Task

This project is a small full-stack mini eCommerce product listing module built for the **Technical Project Manager** assessment.

It includes:

- **Frontend:** React (Vite) + Bootstrap
- **Backend:** Laravel (latest) + MySQL
- **API Docs:** Swagger / OpenAPI
- **Database:** MySQL
- **Cloud Design:** AWS EC2 + S3 (documented, not deployed)

---

## 1. Features

- List products with:
  - Product Name
  - Price
  - Category
  - Stock Status
- Add a new product through a form.
- Clean, responsive UI (Bootstrap).
- API endpoints:
  - `GET /api/products` – list products (with pagination & optional search).
  - `POST /api/products` – create product.
- Standardized JSON responses.
- Swagger documentation for the API.

---

## 2. Tech Stack

- **Frontend:** React, Vite, Axios, Bootstrap
- **Backend:** Laravel (latest), PHP 8.3
- **Database:** MySQL
- **Documentation:** Swagger (OpenAPI)

---

## 3. How to Run – BackEnd (Laravel)

```bash
cd dreamComeTrueBackend

cp .env.example .env

composer install
php artisan key:generate
php artisan migrate

php artisan serve
---

## 4. How to Run – FrontEnd (React)

```bash
cd dreamComeTrueFrontEnd

npm install
npm run dev