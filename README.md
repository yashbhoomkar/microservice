# Microservices Repository

This repository contains a collection of microservices designed to be modular, reusable, and easy to integrate into any project. These services are particularly useful for hackathons, where rapid development and scalability are key.

---

## Microservices Included

### 1. **Auth Service**
- **Purpose**: Handles user authentication and authorization.
- **Features**:
  - User registration and login.
  - Password hashing with `bcrypt`.
  - JWT-based authentication.
- **Tech Stack**: Node.js, Express, MongoDB.

### 2. **Notification Service**
- **Purpose**: Manages notifications for users.
- **Features**:
  - Email notifications.
  - Push notifications (e.g., Firebase).
  - SMS notifications (e.g., Twilio).
- **Tech Stack**: Node.js, Express, Third-party APIs (e.g., SendGrid, Twilio).

### 3. **Google OAuth Service**
- **Purpose**: Provides Google OAuth 2.0 authentication.
- **Features**:
  - Login with Google.
  - Secure session management.
  - User profile retrieval.
- **Tech Stack**: Node.js, Express, Passport.js.

---

## Why Use This Repository?

- **Modular Design**: Each service is independent and can be used standalone or together.
- **Hackathon Ready**: Prebuilt services save time and allow you to focus on building your core application.
- **Scalable**: Designed to be easily deployable and scalable for production use.
- **Customizable**: Each service can be extended to meet specific project requirements.

---
