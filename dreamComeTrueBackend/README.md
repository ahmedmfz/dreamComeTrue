# Backend – Laravel API (Mini eCommerce Product Listing)

This is the **Laravel backend API** for the Mini eCommerce Product Listing module.

It exposes REST endpoints for:

- Listing products
- Creating products

and uses **SQLite** for local development. The same migrations can be used with MySQL/RDS on AWS.

---

## 1. Tech Stack

- PHP 8.3
- Laravel (latest)
- SQLite (local)
- Swagger / OpenAPI (API docs)

---

## 2. Requirements

- PHP 8.3
- Composer
- SQLite (built into PHP, no extra server needed)

---

## 3. Swagger / OpenAPI
- Visit: `/api/documentation` (Here you can Show and Test Apis)
- Rebuild docs:
```bash
php artisan l5-swagger:generate
```
---

## 4. Setup

From the project root:

```bash
git clone https://github.com/ahmedmfz/dreamComeTrue.git

cd dreamComeTrueBackend

cp .env.example .env

composer install
php artisan key:generate
php artisan migrate

php artisan serve
