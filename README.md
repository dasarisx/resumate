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

🚀 How to Use
1. Register

Go to the Register page.

Provide your email, username, and password.

Submit to create your account.

2. Login

Go to the Login page.

Enter your credentials.

After successful login, you will be redirected to your Profile Page.

3. Update Profile

On the Profile Page, update your mobile number and summary.

Click Update to save.

4. Add Activities

Navigate to the Activities Page.

Add details about your career-related activities:

Title

Type (e.g., Project, Internship, Course)

Organization / Platform

Duration

Link (optional)

Description

Added activities appear in a list below the form.

You can Edit or Delete them anytime.

5. Preview Resume

Visit the Resume Preview Page.

The resume includes:

Your Profile Details (name, email, mobile, summary)

Grouped Activities by type.

6. Download Resume

On the Resume Preview Page, click Download Resume.

The resume will be generated in PDF format, including your profile and activities.

🧠 Notes

Both frontend and backend must run in separate terminals.

Ensure the .env file is properly configured in the backend.

The JWT token is stored in localStorage for authentication.

All routes related to profile, activities, and resume are protected and require login.
