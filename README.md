docs : https://docs.google.com/document/d/1WAmWVGUUsGbFQ9DCfJmWFk_8-73QpAEcBj_-KFIi59Y/edit?usp=sharing



# MediStore Backend API 💊

> Backend API for MediStore - Your Trusted Online Medicine Shop

A full-stack e-commerce backend for managing over-the-counter (OTC) medicine sales, inventory, and orders. Built to support customers, sellers, and administrators with role-based access control.

---



## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Authentication & Authorization](#-authentication--authorization)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Functionality
- **Multi-Role System**: Customer, Seller, and Admin roles with distinct permissions
- **Authentication**: Secure JWT-based authentication
- **Medicine Management**: Full CRUD operations for medicine inventory
- **Order Processing**: Complete order lifecycle from creation to delivery
- **Search & Filtering**: Advanced filtering by category, price, manufacturer
- **Review System**: Customer feedback and ratings
- **Cash on Delivery**: Payment method support

### Role-Based Features

#### Customer Features
- Browse and search medicines
- Shopping cart management
- Order placement and tracking
- Review submission
- Profile management

#### Seller Features
- Inventory management (add, edit, remove medicines)
- Stock level tracking
- Order fulfillment
- Sales dashboard

#### Admin Features
- User management (ban/unban)
- Platform-wide medicine oversight
- Category management
- Order monitoring
- Analytics dashboard

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL / MongoDB / MySQL (specify your choice)
- **ORM/ODM**: Prisma / Mongoose / Sequelize (specify your choice)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator / Joi / Zod
- **Password Hashing**: bcrypt

### Additional Libraries
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Morgan**: HTTP request logger
- **Dotenv**: Environment configuration
- **Multer**: File upload handling (for medicine images)

---

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ HTTP/HTTPS
       │
┌──────▼──────────────────────────┐
│     Express.js API Server       │
├─────────────────────────────────┤
│  ┌─────────────────────────┐   │
│  │   Middleware Layer      │   │
│  │  - Auth                 │   │
│  │  - Validation           │   │
│  │  - Error Handling       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Route Layer           │   │
│  │  - Auth Routes          │   │
│  │  - Medicine Routes      │   │
│  │  - Order Routes         │   │
│  │  - Seller Routes        │   │
│  │  - Admin Routes         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Controller Layer      │   │
│  │  - Business Logic       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Service Layer         │   │
│  │  - Data Operations      │   │
│  └─────────────────────────┘   │
└─────────────┬───────────────────┘
              │
       ┌──────▼──────┐
       │   Database  │
       └─────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL/MongoDB/MySQL (based on your choice)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medistore-backend.git
   cd medistore-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   # For Prisma
   npx prisma migrate dev
   npx prisma db seed

   # For Sequelize
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all

   # For Mongoose (MongoDB)
   npm run seed
   ```

