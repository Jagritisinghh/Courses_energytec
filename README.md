Course Management System 
A full-stack web application built with React, Node.js, Express, and SQLite. Users can register, log in, and manage (Create, Read, Update, Delete) their own courses.

Features
Authentication: Secure login and registration using JWT (JSON Web Tokens) and bcrypt password hashing.
Authorization: Users can only edit or delete courses they created.
Centralized API Service: Clean frontend architecture using a dedicated API service layer.
Responsive UI: Styled with Tailwind CSS for a modern, clean look

Tech Stack
Frontend: React, Tailwind CSS, Axios, React Router.
Backend: Node.js, Express.
Database: SQLite3.

Setup Instructions
1. Prerequisites
    Node.js installed on your machine.
    Git installed.
2. Clone the Repository
    git clone https://github.com/Jagritisinghh/Courses_Energytec.git
    cd courses
3. Backend Setup
    1.Navigate to the server folder and run: npm install
    2.Create a .env file in the root:
       add- JWT_SECRET=your_super_secret_key_here
    3.Start the server: node index.js

4. Frontend Setup
    1.Open a new terminal window.
    2.Navigate to the client folder and run:  npm install
    3.Start the React app: npm start

API Endpoints

1.Authentication

Method|      Endpoint      | Description
POST, |/api/users/register |Register a new user
POST, |/api/users/login    |Login and receive a JWT token

2.Courses

Method|       EndpointAuth    | Required |Description
GET   |/api/courses           |   No     |Fetch all courses
POST  |/api/courses/create    |   Yes    |Create a new course
PUT   |/api/courses/update/:id|   Yes    |Update a course (owner only)
DELETE|/api/courses/delete/:id|   Yes    |Delete a course (owner only)

