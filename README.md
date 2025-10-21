# Resume Builder Application

A full-stack application to create, manage, and showcase your career activities and generate a professional resume.  

Frontend: **Next.js** | Backend: **Node.js** | Database: **MongoDB**

---

## Features

- **User Registration & Login**
- **Profile Management** (update mobile and summary)
- **Add/Edit/Delete Activities**
- **Resume Preview & PDF Download**

---

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   Copy code
   npm install

3. Create a .env file (based on .env.example) and configure:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the backend server:
   ```bash
   npm run dev

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the frontend:
   ```bash
   npm run dev
4. Open the app in your browser (usually at http://localhost:3000).

### Usage
#### Register
- Go to the Register page.
- Provide your email, username, and password.
- Submit the form to create a new account.

#### Login
- Go to the Login page.
- Enter your email and password.
- After successful login, you will be redirected to your Profile Page.

#### Update Profile
- On the Profile Page, update your mobile number and summary.
- Click Update to save the changes.

#### Add Activities
- Navigate to the Activities Page.
- Add activities completed as part of your career:
   - Title
   - Type (Project, Internship, Course)
   - Organization / Platform
   - Duration
   - Link (optional)
   - Description
- Activities will be displayed in a list below the form.
- You can Edit or Delete each activity if needed.

#### Resume Preview
- Go to the Resume Preview Page to see how your resume looks.
- The resume includes your profile details (name, email, mobile, summary) and your activities grouped by type.

#### Download Resume
- On the Resume Preview Page, click Download to get your resume in PDF format.

#### Project Structure
   ```bash
   Copy code
   root/
   ├─ frontend/       # Next.js frontend
   ├─ backend/        # Node.js backend
   ├─ backend/.env    # Environment variables for backend
```
#### Notes
- Use two terminals to run the frontend and backend simultaneously.
- Ensure MongoDB is running and .env is correctly configured.
- All sensitive information like database URI and JWT secret should be in .env.

#### License
MIT License

