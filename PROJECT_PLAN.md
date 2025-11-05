
---

## 2️⃣ `PROJECT_PLAN.md`

```md
# Project Plan – Mini eCommerce Product Listing

## 1. Tech Stack Justification

- **React (Frontend)**
  - Modern, component-based framework.
  - Easy to build dynamic, responsive UIs.
  - Works well with REST APIs via Axios.

- **Laravel (Backend)**
  - Mature PHP framework with built-in routing, validation, and Eloquent ORM.
  - Very productive for building REST APIs.
  - Good structure for service classes, documentation, and future features (queues, events, jobs).

- **SQLite (Local Development)**
  - Very easy to set up for a small demo.
  - File-based, no extra installation required.
  - The same migrations can later be used with MySQL on AWS RDS.

- **MySQL on AWS RDS (Production – Proposed)**
  - Managed, scalable relational database.
  - Well supported by Laravel and AWS ecosystem.

- **Swagger / OpenAPI**
  - Clear, self-documented API.
  - Helpful for collaboration with front-end and QA teams.

---

## 2. Architecture Overview

### Frontend

- Built with React (Vite + Axios).
- Provides:
  - Product list page (table with pagination and optional search).
  - Form to add new products.
- Communicates with backend via REST calls:

  - `GET /api/products`
  - `POST /api/products`

### Backend

- Laravel application exposing REST API.
- Layers:
  - **Controller** – receives HTTP requests, validates input.
  - **Service** – contains business logic for creating and listing products.
  - **Model (Eloquent)** – maps to `products` table.

- API documented with Swagger, exposed at a URL like:
  - `/api/documentation`

### Database

- Local development:
  - SQLite database: `database/database.sqlite`
  - Table `products` with columns:
    - `id`
    - `product_name`
    - `price`
    - `category`
    - `in_stock` or `stock_status`
    - timestamps

- Production design:
  - The same schema migrated to MySQL on AWS RDS.

### AWS Components (Proposed)

- **EC2** – Laravel app server (Nginx + PHP-FPM).
- **RDS (MySQL)** – main relational database.
- **S3** – store product images (future enhancement).
- **CloudFront** – CDN in front of S3 (and optionally the frontend build).
- **Route 53** – DNS and custom domain (optional).
- **IAM** – roles & policies to allow EC2 to access S3 securely.

---

## 3. Task Breakdown – Team of 3 Developers

Assume a short sprint (2–3 days).

### Developer 1 – Backend & Database

- Design database schema for `products`.
- Implement Laravel migrations and Eloquent model.
- Implement API endpoints:
  - `GET /api/products` with pagination and optional search/filter.
  - `POST /api/products` with validation and error handling.
- Add service layer to keep controllers clean.
- Configure Swagger/OpenAPI endpoints.

### Developer 2 – Frontend (React)

- Set up React project using Vite.
- Build product listing page:
  - Table layout, responsive with Bootstrap.
  - Pagination and search box.
- Build “Add Product” form:
  - Controlled inputs.
  - Client-side validation (basic).
- Integrate with backend APIs using Axios.
- Handle loading and error states.

### Developer 3 – DevOps & Documentation

- Define AWS architecture (EC2, RDS, S3, CloudFront).
- Write deployment steps for Laravel on EC2.
- Prepare environment configuration (.env templates).
- Document how to run frontend and backend locally.
- Write project documentation:
  - README
  - This project plan
- (Optional) Prepare a short demo video and CI/CD pipeline outline.

### Rough Timeline

- **Day 1:**  
  - Backend: DB + migrations + basic API.  
  - Frontend: project setup + basic UI layout.

- **Day 2:**  
  - API integration with frontend (list + create).  
  - Add pagination & search.  
  - Add Swagger and refine error handling.  
  - Documentation (README + architecture).

- **Day 3 (if available / future):**  
  - Add authentication for admin.  
  - Add product images (S3).  
  - Add unit/feature tests.  
  - Draft CI/CD pipeline with GitHub Actions.

---

## 4. Deployment Plan – AWS (Proposed)

### Backend – Laravel on EC2 + RDS

1. **Create EC2 instance**
   - Ubuntu-based, with security group allowing HTTP/HTTPS and SSH.

2. **Install dependencies**
   - Nginx, PHP-FPM, PHP extensions, Composer, Git.

3. **Deploy Laravel**
   - Clone the `backend` repo into `/var/www/backend`.
   - Set correct permissions for `storage` and `bootstrap/cache`.

4. **Configure environment**
   - Set `.env` with:
     - `APP_ENV=production`
     - `APP_KEY` (generated)
     - `DB_CONNECTION=mysql`
     - `DB_HOST` = RDS endpoint
     - `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
   - Run:
     - `composer install --no-dev`
     - `php artisan migrate --force`

5. **Configure Nginx**
   - Create a server block pointing to `public/index.php`.
   - Enable HTTPS using ACM/Load Balancer or Certbot (if needed).

### Database – RDS (MySQL)

- Create an RDS MySQL instance.
- Allow incoming connections only from the EC2 security group.
- Run `php artisan migrate` from EC2 to build schema.

### Frontend – React

**Option 1 – Host on same EC2 (simple):**

- `npm run build` in `frontend/`.
- Copy the `dist/` folder to `/var/www/frontend`.
- Serve `dist/` as static site via Nginx.

**Option 2 – S3 + CloudFront (recommended for scale):**

- Build frontend: `npm run build`.
- Upload `dist/` output to an S3 bucket with static website hosting enabled.
- Configure CloudFront distribution to serve the S3 bucket.
- Point a custom domain (e.g. `app.example.com`) via Route 53 to CloudFront.

---

## 5. Future Enhancements

If more time is available, planned improvements:

- **Authentication & Authorization**
  - Admin login (JWT or Laravel Sanctum).
  - Role-based permissions.

- **Product Images**
  - Image upload from frontend.
  - Store files in S3.
  - Save image URL in the database.

- **Advanced Filtering & Sorting**
  - Filter by category, price range, and stock status.
  - Sorting by price or date created.

- **Monitoring & Logging**
  - CloudWatch logs for EC2.
  - Structured application logs.

- **CI/CD**
  - GitHub Actions pipeline:
    - Run tests.
    - Build frontend.
    - Deploy backend to EC2 or Elastic Beanstalk automatically.

- **Testing**
  - Backend feature tests for APIs.
  - Frontend component and integration tests.
