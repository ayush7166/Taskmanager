Here's a summary of my Task Manager project deployment and functionality:


---

Project Summary: Task Manager

This Task Manager application is a full-stack project built with the MERN stack (MongoDB, Express, React, Node.js). It is designed to help users manage tasks, with features including authentication, task creation, updating, deletion, and error handling. The project follows a structured, modular approach for scalability and efficient data handling.

Project Overview

1. Frontend:

Deployed on: Vercel

Key Features:

Login and Registration: Frontend includes validation checks for user login and registration forms.

Task Management UI: React components display and handle CRUD (Create, Read, Update, Delete) operations for tasks.

API Requests: Axios is used to connect to the backend via API, with error handling for failed requests or validation errors.


Environment Variables: VITE_API_URL points to the backend deployment on Render for seamless communication with the server.



2. Backend:

Deployed on: Render

Key Features:

User Authentication: Utilizes JWT tokens for secure login, ensuring access control for users.

Data Storage: MongoDB stores user information and tasks. Each task entry includes data like title, description, and status.

Error Handling: Custom error messages and standardized responses are implemented for improved debugging and user feedback.


Environment Variables: Configured with secure connection strings (MongoDB URI) and JWT secret for token generation.

CORS Configuration: Allows requests from the Vercel domain, ensuring the frontend and backend interact securely.





---

Summary of Setup Process

1. Development & Testing:

Development was structured by setting up frontend and backend directories separately, each with its own dependencies and .gitignore files.

Local testing was done using environment variables to replicate the deployed setup.



2. Deployment:

Frontend on Vercel: Used Vercel environment variables to set VITE_API_URL pointing to the backend on Render.

Backend on Render: Configured Render settings with Root Directory set to backend, ensuring it found the server files. Verified MongoDB connectivity using .env file with DATABASE_URL.





---

This summary should provide a quick overview whenever you revisit the project. You can refer to this GitHub repository for the complete code, and adjust API URLs or environment variables as needed for different deployment environments.

