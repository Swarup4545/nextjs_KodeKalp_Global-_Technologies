## Next.js Login & Signup System with Resume Creator

Project Overview
This project is a Login and Signup system using Next.js and MongoDB, with email confirmation via SMTP server integration. Once a user signs up, they can access a simple resume creator to generate a resume by filling in their personal information such as name, education, experience, skills, and contact details.
The system uses JWT (JSON Web Tokens) for session management, bcrypt for password hashing, and NodeMailer to send email confirmations. The project is hosted on Vercel.

Live Demo

👉 Live App:- nextjs-kode-kalp-global-technologies-kn8k-6hiz0y7pp.vercel.app

Features

User Authentication:

Signup using email and password.
Login with email and password.
Secure session management using JWT.
Password hashing with bcrypt for secure storage.
Error handling for invalid logins and signups.

Email Confirmation:

Sends a confirmation email to the user after signup using NodeMailer.
SMTP server integration using Gmail’s SMTP settings.

Resume Creator:

Users can create a resume by filling out a form with fields like:
   Name
   Education
   Experience
   Skills
   Contact Details (e.g., phone number)
   Resume is generated dynamically based on the user’s input.

Session Management:
  Users remain logged in until they manually log out or the session expires.

Error Handling:
   Detailed error messages for failed logins, signups, and email confirmation errors.

Tech Stack

Frontend:
    Next.js
    TypeScript for type safety and better developer experience
    Tailwind CSS for styling
Backend:
  Node.js
  MongoDB with Mongoose for the database

Authentication:
   JWT (JSON Web Tokens) for user sessions
   bcrypt for password hashing

Email Service:
   NodeMailer for sending email confirmations
   SMTP server configured using Gmail

Hosting:

Hosted on Vercel.

SMTP Configuration
To configure the SMTP server for email confirmations, set up the following environment variables in your .env file:
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=test.kkgt@gmail.com
   SMTP_PASS=rxuxhphurchkmvng

Installation & Setup
Clone the Repository:
    git clone https://github.com/Swarup4545/nextjs_KodeKalp_Global-_Technologies.git
    cd nextjs_KodeKalp_Global-_Technologies

Install Dependencies:
  npm install

Set Up Environment Variables:

Create a .env file in the root directory and add the following variables

MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=test.kkgt@gmail.com
SMTP_PASS=rxuxhphurchkmvng

Run the Development Server:
   npm run dev

The application will start on http://localhost:3000.

Build and Deploy to Vercel:

To deploy to Vercel, you can use:
  vercel --prod

Usage

  Signup & Login
  Visit the Live App.
  Sign up with your email and password.
  Confirm your email using the confirmation link sent to your inbox.
  Log in and create your resume by filling in the form.
Resume Creation
  After logging in, navigate to the Resume Creator page.
  Fill in your personal and professional information.
  Generate and download your resume.
Future Improvements
  Add additional templates for resume creation.
  Implement password reset functionality.
  Add user profile and update features.
