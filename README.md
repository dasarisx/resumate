Here’s the updated and complete README.md including your new points about the frontend, backend, MongoDB, and .env configuration:

🧾 User Resume Management System

This application helps users create and manage their professional profiles, add career activities, and generate resumes in PDF format.
It has a Next.js frontend, a Node.js + Express backend, and uses MongoDB as the database.

📁 Project Structure
root/
│
├── frontend/        # Next.js frontend (UI)
│
├── backend/         # Node.js + Express backend (API)
│
└── README.md

⚙️ Setup Instructions
1. Clone the Repository
git clone <repository-url>
cd <project-folder>

2. Backend Setup (Node.js + Express + MongoDB)
Navigate to backend folder:
cd backend

Install dependencies:
npm install

Create a .env file in the backend root with the following variables:
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
PORT=5000

Start the backend server:
npm run dev


The backend will run at:
👉 http://localhost:5000

3. Frontend Setup (Next.js)
Navigate to frontend folder:
cd frontend

Install dependencies:
npm install

Start the frontend app:
npm run dev


The frontend will run at:
👉 http://localhost:3000

User Resume Management System
This application allows users to create and manage their professional profile, add activities, and generate a resume in PDF format.
Features
•	User registration and login
•	Profile management (update mobile and summary)
•	Add, edit, and delete career activities
•	Resume preview
•	Download resume in PDF format
________________________________________
How to Use
1. Register
   •	Go to the Register page.
   •	Provide your email, username, and password.
   •	Submit the form to create a new account.
2. Login
   •	Go to the Login page.
   •	Enter your email and password.
   •	After successful login, you will be redirected to your Profile Page.
3. Update Profile
   •	On the Profile Page, update your mobile number and summary about yourself.
   •	Click Update to save the changes.
4. Add Activities
   •	Navigate to the Activities Page.
   •	Add activities that you have completed as part of your career:
     o	Title
     o	Type (Project, Internship, Course)
     o	Organization / Platform
     o	Duration
     o	Link (optional)
     o	Description
   •	Once added, activities will be displayed in a list below the form.
   •	You can Edit or Delete each activity if needed.
5. Resume Preview
   •	Go to the Resume Preview Page to see how your resume looks with the added activities.
   •	The resume will include your profile details (name, email, mobile, summary) and your activities grouped by type.
6. Download Resume
   •	On the Resume Preview Page, click Download to get your resume in PDF format.
________________________________________
Notes
•	Make sure you are logged in to access the profile, activities, and resume pages.
•	All changes are saved per user and protected via authentication token.
•	The resume PDF includes your profile information and grouped activities.
