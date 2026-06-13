# AASTU Digital Resource Sharing Platform

## Overview

The AASTU Digital Resource Sharing Platform is a web-based application designed to help students and instructors share academic resources efficiently. The platform enables users to upload, browse, download, bookmark, review, and manage educational materials organized by courses.

This project was developed to improve resource accessibility, encourage knowledge sharing, and create a centralized repository for academic content within Addis Ababa Science and Technology University (AASTU).

---

## Features

### User Features

- User registration and authentication
- Secure login and logout
- Password recovery via email
- Browse available courses
- Upload academic resources
- Download learning materials
- Bookmark resources for later access
- Track learning progress
- Comment on resources
- Rate and review resources
- Receive notifications
- User profile management

### Course Management

- Create new courses
- Edit course information
- View course details
- Organize resources by course

### Resource Management

- Upload PDFs and learning materials
- Cloud-based file storage
- Resource categorization
- Resource approval workflow
- Resource reporting system

### Admin Features

- Dashboard and analytics
- User management
- Resource moderation
- Approval management
- Report management
- System settings management
- Notification management

---

## Technology Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- React PDF
- React Toastify
- Recharts
- Font Awesome
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- BcryptJS
- Cloudinary
- Multer
- Nodemailer
- Cookie Parser

---

## Project Structure

```text
AASTU-Resource-Sharing/
│
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── utilities/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│
└── README.md
```

---

## Installation

### Prerequisites

Make sure you have installed:

- Node.js (v18 or later)
- npm
- MongoDB

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_password
```

Start the development server:

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend application:

```bash
npm run dev
```

---

## API Modules

The backend contains APIs for:

- Authentication
- Courses
- Resources
- Comments
- Reviews
- Bookmarks
- Notifications
- Progress Tracking
- Reports
- Admin Settings

---

## Deployment

### Frontend

Recommended platforms:

- Netlify
- Vercel

### Backend

Recommended platforms:

- Render
- Railway
- VPS Hosting

### Database

- MongoDB Atlas

---

## Future Enhancements

- AI-powered resource recommendations
- Advanced search and filtering
- Resource version control
- Mobile application
- Real-time collaboration
- Discussion forums
- Resource plagiarism detection

---

## Academic Purpose

This project was developed as a Final Year Project at Addis Ababa Science and Technology University (AASTU) to facilitate academic resource sharing among students and instructors.

---

## Authors

AASTU Final Year Project Team

- Surafel Aschalew
- Sifen Oumar
- Fuad Ahmed
- Yohannes Tsegaye

---

## License

This project is developed for educational and academic purposes.
