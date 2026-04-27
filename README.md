# ProductStack

A complete product registration and management system, featuring a modern HTML/CSS/JS frontend and a PHP RESTful API backend.

## Features

- Dynamic product table listing
- Instant search by name, brand, or category
- Add products via modal (name, brand, category, price)
- Edit products via modal
- Delete products with confirmation
- Full frontend/backend integration using Promises (fetch)
- Light/dark theme with persistence
- Data validation on both frontend and backend
- Backend ready for environment variables (.env)
- CORS configured for local integration

## Project Structure

```
produtos-app/
├── assets/
│   ├── api/api.js
│   └── service/
│       ├── createProduct.js
│       ├── deleteProduct.js
│       ├── getAllProducts.js
│       ├── getByIdProduct.js
│       └── updateProduct.js
├── backend/
│   ├── api/
│   │   └── products/products.php
│   ├── config/db.php
|   ├── database/db.php
│   ├── controller/products.controller.php
│   ├── http/ (get.php, post.php, put.php, delete.php)
│   ├── model/products.php
│   ├── routes/router.php
│   └── index.php
├── .env
├── index.html
├── script.js
├── style.css
└── README.md
```

## How to Run

### Backend
1. Install PHP dependencies (including vlucas/phpdotenv):
   ```sh
   composer install
   ```
2. Configure the `.env` file with your database credentials.
3. Start the PHP server inside the `backend` folder:
   ```sh
   php -S localhost:8000 -t . routes/router.php
   ```

### Frontend
1. Open the `index.html` file at the project root in your browser (use Live Server extension or open directly).
2. The frontend communicates with the backend at `http://localhost:8000/api/products`.

## Database Setup

1. Import the database structure:
   - Open phpMyAdmin (or another MySQL client).
   - Create a new database (e.g., `ps_db`).
   - Import the file `database/ps_db.sql` located in the project root into your database.
2. Make sure your `.env` file matches your database credentials and name.

## Notes
- Backend uses PDO and centralized validation in the model.
- Frontend uses ES6 modules (`type="module"` in the script tag).
- All API services are in `assets/service/`.
- The search field filters in real time.
- The modal is used for both creating and editing products.
- The project is ready for local development and easy adaptation for production.

## Example .env
```env
DB_HOST=localhost
DB_NAME=ps_db
DB_USER=root
DB_PASS=
```

## Example JSON for Testing (Postman)
### Create Product (POST)
```json
{
  "name": "Test Product",
  "brand": "Test Brand",
  "category": "Test Category",
  "price": 99.90
}
```

### Update Product (PUT)
```json
{
  "name": "Updated Product",
  "brand": "New Brand",
  "category": "New Category",
  "price": 120.00
}
```

> **Note:**
> This project is intended to be run locally. Just open `index.html` in your browser—no hosting required. The interface is intuitive and self-explanatory, so you can start managing products right away!