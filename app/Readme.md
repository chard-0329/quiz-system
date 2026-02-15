📘 QuizVerse – Online Quiz System

QuizVerse is a modern full-stack online quiz platform that allows administrators to create quizzes manually and users to take quizzes with automatic scoring and leaderboard tracking.

🚀 Tech Stack
Frontend

Next.js (React + App Router)

TypeScript

Tailwind CSS

Firebase Authentication (client-side)

Backend

Spring Boot

Spring Security

Firebase Admin SDK (JWT verification)

RESTful APIs

Database

Firebase Firestore

👥 User Roles (RBAC)

The system uses Role-Based Access Control (RBAC).

Role	Permissions
USER	Take quizzes, view results, leaderboard
ADMIN	Create, edit, publish quizzes
SUPER_ADMIN	Create/manage admin accounts

All users share a single login system. Access control is enforced at the backend level.

🔐 Authentication & Security

Authentication handled by Firebase Auth

JWT validated in Spring Boot backend

Role stored in Firestore (USER, ADMIN, SUPER_ADMIN)

Backend enforces protected routes

Protected API Structure
/api/user/** → USER
/api/admin/** → ADMIN, SUPER_ADMIN
/api/super-admin/** → SUPER_ADMIN


No separate admin login page. Access is controlled through role validation.

📂 Core Features
🎓 User Side

Register / Login

Select quiz category:

App Development

System Fundamentals

Living in the IT Era

Artificial Intelligence

Automata

Other (Fun quizzes)

Take quiz

Automatic scoring

Review correct and incorrect answers

Leaderboard ranking

🛠 Admin Side

Create quizzes manually

Add multiple-choice questions

Edit or delete quizzes

Publish/unpublish quizzes

Assign quiz category

(Quiz content can be prepared externally using AI tools if desired, but no AI integration exists inside the system.)

👑 Super Admin

Create admin accounts

Assign roles

Manage system-level access

🗃 Firestore Structure
users/
  {uid}
    email
    role
    createdAt

quizzes/
  {quizId}
    title
    category
    createdBy
    published
    questions[]

results/
  {resultId}
    userId
    quizId
    score
    completedAt

leaderboard/
  {category}
    userId
    totalScore

🏆 Scoring & Leaderboard

Auto-scoring after quiz submission

Results stored in Firestore

Leaderboard ranked by total score per category

Backend ensures score integrity

🔄 Application Flow

User logs in via Firebase Auth

Frontend receives JWT

JWT sent with API requests

Spring Boot validates token

Backend checks role

Access granted or denied

Quiz data stored securely in Firestore

🛡 Security Principles

Backend-enforced authorization

Role-based route protection

No direct privilege assignment from frontend

Super Admin controls admin creation

Clean separation of frontend and backend responsibilities

⚙ Development Setup
Frontend
npm install
npm run dev

Backend
mvn clean install
mvn spring-boot:run

🌍 Deployment Recommendation

Frontend:

Vercel / Netlify

Backend:

AWS / GCP / Azure / Render

Database:

Firebase (Production rules configured)

📌 Development Rule

The architecture must remain modular, secure, and aligned with role-based access control. Backend validation must always enforce permissions, and the overall structure should remain clean and scalable.