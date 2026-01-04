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

1.POST :/api/users/register  (Register a new user)

2.POST :/api/users/login    (Login and receive a JWT token)

2.Courses

1.GET: /api/courses    ( Fetch all courses-authentication is not required)

2.POST:  /api/courses/create  (Create a new course- authentication is required)

3.PUT :  /api/courses/update/:id (update a course (owner only)- authentication is required )

4.DELETE: /api/courses/delete/:id  (Delete a course (owner only)-authentication is required)

Note: Only the user who posted the ourse can edit or delete the Courses posted by them.

**Live Url**

https://courses-energytec-8.onrender.com/

**ScreenShots**

![WhatsApp Image 2026-01-04 at 10 24 49 PM](https://github.com/user-attachments/assets/f3ef422b-1fe2-4d40-afbc-88559a321812)
![WhatsApp Image 2026-01-04 at 10 24 50 PM](https://github.com/user-attachments/assets/36f0a577-293c-409b-bb66-efa7b550449e)
![WhatsApp Image 2026-01-04 at 10 24 50 PM (1)](https://github.com/user-attachments/assets/e099b2bd-2431-474b-bfc6-08cecc4f2c54)
![WhatsApp Image 2026-01-04 at 10 24 51 PM](https://github.com/user-attachments/assets/87162c4e-d396-4ea6-aa57-a3693f806776)





