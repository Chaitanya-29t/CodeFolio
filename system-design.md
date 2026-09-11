# CodeFolio – System Design Note

## 1. Project Overview

CodeFolio is a No-Code/Low-Code developer portfolio CMS. It allows developers to create and manage their portfolio without writing portfolio code.

The application has two main parts:

- Dashboard – used to create and update profile, projects and skills.
- Public Portfolio – used by visitors to view a developer's portfolio.

## 2. Technology Stack

### Frontend
- React.js
- React Router
- React Hook Form
- React Helmet Async
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Resend API for contact emails

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB

## 3. System Architecture

The system follows a client-server architecture.

User
  ↓
React Frontend
  ↓
Express REST API
  ↓
MongoDB

For the contact form:

User
  ↓
React Contact Form
  ↓
Express API
  ↓
Resend API
  ↓
Developer Email

## 4. Dashboard

The Dashboard allows the portfolio owner to manage:

- Profile information
- Social links
- Resume URL
- Custom domain
- Projects
- Skills
- Portfolio template

The data entered in the Dashboard is stored in MongoDB through REST APIs.

## 5. Public Portfolio Routing

Each user has a unique username.

Example:

/user/chaitanya
/user/demo1
/user/demo2

React Router uses the dynamic route:

/user/:username

The `username` is obtained using React Router's `useParams()`.

The frontend then requests the corresponding user data from the backend:

GET /api/users/:username

The backend searches MongoDB using the username.

If the user exists, the backend returns the user's profile data.

The frontend then loads the user's projects and skills and displays the portfolio.

## 6. Template System

CodeFolio supports multiple portfolio templates.

Currently available templates:

- Minimalist
- Cyberpunk

The selected template is stored in the user's `templateId`.

The frontend uses a template map to select the correct layout:

templateMap[user.templateId]

This allows different users to use different portfolio designs while using the same backend data.

## 7. SEO

React Helmet Async is used to dynamically set:

- Page title
- Meta description

For example, the public portfolio title is generated using the user's name.

## 8. Custom Domain

The system supports a simulated custom-domain feature.

The custom domain is stored in the User model.

Example:

chaitanya.dev

The dashboard allows the user to enter the custom domain and the public portfolio displays the configured domain with DNS setup status.

Actual DNS configuration can be added as an advanced feature.

## 9. Contact Form

The public portfolio contains a contact form.

The visitor enters:

- Name
- Email
- Message

The data is sent to the backend using a POST request:

POST /api/contact

The backend uses the Resend API to send the message to the developer's configured email address.

The developer's email address is not exposed in the frontend code.

## 10. Database Design

### User
Stores:

- username
- name
- bio
- email
- socialLinks
- resumeUrl
- customDomain
- templateId

### Project
Stores:

- user
- title
- description
- techStack
- repoLink
- liveLink
- screenshot

### Skill
Stores:

- user
- name
- category
- level

## 11. Data Flow

### Creating a Portfolio

Dashboard
→ React Form
→ REST API
→ Express Backend
→ MongoDB
→ Data Saved

### Viewing a Portfolio

Visitor
→ /user/:username
→ React Router
→ Backend API
→ MongoDB
→ User + Projects + Skills
→ Selected Template
→ Public Portfolio

## 12. Security Considerations

- Environment variables are used for sensitive configuration.
- Database credentials are not stored in frontend code.
- Email credentials/API keys are stored as environment variables.
- Backend APIs validate and process incoming data.
- Developer email is not exposed in the public contact form.

## 13. Future Improvements

Possible future improvements include:

- Real custom-domain DNS integration
- User authentication and login
- More portfolio templates
- Image upload/storage
- Analytics for portfolio visitors
- Advanced portfolio customization
- Email verification