# Finance Dashboard Backend API

This is a backend system for a finance dashboard that manages users, financial records, and provides analytical insights.
It is designed with a modular architecture and role-based access control.

---

## Tech Stack

* Node.js
* Express.js
* MySQL

---

## Features

* User management with roles (admin, analyst, viewer)
* Financial records CRUD operations
* Dashboard summary APIs (income, expense, balance, category-wise data)
* Role-based access control using middleware
* Filtering support (date range, category, type)

---

## Project Structure

```
src/
│
├── config/         # Database connection
├── middleware/     # Authorization middleware
├── modules/
│   ├── user/       # User logic
│   ├── record/     # Financial records logic
│   └── summary/    # Dashboard summary logic
│
├── app.js          # Main entry point
```

---

## Database Schema

### Users Table

* id (Primary Key)
* name
* email
* password
* role (admin / analyst / viewer)
* is_active
* created_at

### Records Table

* id (Primary Key)
* amount
* type (income / expense)
* category
* date
* note
* user_id (Foreign Key)

---

## API Endpoints

### Users

* `POST /users` → Create user (Admin only)
* `GET /users` → Get all users (Admin, Analyst)

### Records

* `POST /records` → Create record (Admin only)
* `GET /records` → Get records with filters (Admin, Analyst)
* `PUT /records/:id` → Update record (Admin only)
* `DELETE /records/:id` → Delete record (Admin only)

### Summary

* `GET /summary/income`
* `GET /summary/expense`
* `GET /summary/balance`
* `GET /summary/categories`

(All roles can access summary APIs)

---

## Access Control

* **Admin** → Full access (users + records + summary)
* **Analyst** → Read records + access summary
* **Viewer** → Access summary only

Authorization is handled using middleware based on roles.

---

## How to Run the Project

1. Install dependencies:

```
npm install
```

2. Configure `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=finance_db
```

3. Start the server:

```
node src/app.js
```

Server will run on:
http://localhost:3000

---

## Testing the APIs

Use Postman or any API client.

For role-based access, pass role in headers:

```
role: admin
```

You can change the role value to:

* admin
* analyst
* viewer

---

## Note

This project focuses on clean backend design and logical structure rather than unnecessary complexity.
SQL aggregation queries are used for efficient financial insights, and role-based middleware ensures secure and controlled access.
