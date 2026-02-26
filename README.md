# Service Management System

A full-stack Service Management System built with Node.js, Express, MySQL, and Vanilla JavaScript.
It supports user authentication using JWT and allows authenticated users to manage their own services.

## Features
- User registration and login
- JWT-based authentication
- Create, read, update, delete services
- Service ownership enforcement
- Responsive frontend UI
- Secure REST APIs

## Tech Stack
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JWT
- Frontend: HTML, CSS, Vanilla JavaScript

## Setup Instructions

### Prerequisites
- Node.js
- MySQL

### Backend Setup
1. Navigate to backend folder
2. Install dependencies
3. Create a .env file with:

   PORT=5000
   
   DB_HOST=localhost
   
   DB_USER=root
   
   DB_PASSWORD=yourpassword
   
   DB_NAME=service_management
   
   JWT_SECRET=your_secret

5. Run the server:
   node server.js

### Database Setup
- Create database `service_management`
- Run the SQL script in `database/schema.sql`

### Frontend Setup
- Open `frontend/index.html` in browser (Open with live server option preferred)
- Register the user
- Login and manage services

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/services
- POST /api/services
- PUT /api/services/:id
- DELETE /api/services/:id

## Screenshot

Dashboard page

<img width="664" height="771" alt="image" src="https://github.com/user-attachments/assets/7b2b052a-d202-4c6b-bc29-50c242f3b009" />


## Notes
- Only authenticated users can access services
- Users can manage only their own services
