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

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000` (or your configured port).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/medistore
# OR for MongoDB
# MONGODB_URI=mongodb://localhost:27017/medistore

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Pagination
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 💾 Database Schema

### Users Table
```sql
users
├── id (PK, UUID/Integer)
├── name (String, required)
├── email (String, unique, required)
├── password (String, hashed, required)
├── role (Enum: 'customer', 'seller', 'admin')
├── phone (String, optional)
├── address (Text, optional)
├── avatar (String, URL, optional)
├── is_active (Boolean, default: true)
├── is_banned (Boolean, default: false)
├── email_verified (Boolean, default: false)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### Categories Table
```sql
categories
├── id (PK, UUID/Integer)
├── name (String, unique, required)
├── description (Text, optional)
├── slug (String, unique, required)
├── image (String, URL, optional)
├── is_active (Boolean, default: true)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### Medicines Table
```sql
medicines
├── id (PK, UUID/Integer)
├── seller_id (FK -> users.id, required)
├── category_id (FK -> categories.id, required)
├── name (String, required)
├── description (Text, required)
├── manufacturer (String, required)
├── price (Decimal, required)
├── discount_price (Decimal, optional)
├── stock_quantity (Integer, required)
├── images (Array/JSON, optional)
├── dosage (String, optional)
├── side_effects (Text, optional)
├── is_prescription_required (Boolean, default: false)
├── is_active (Boolean, default: true)
├── sku (String, unique, optional)
├── expiry_date (Date, optional)
├── rating_average (Decimal, default: 0)
├── rating_count (Integer, default: 0)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### Orders Table
```sql
orders
├── id (PK, UUID/Integer)
├── customer_id (FK -> users.id, required)
├── order_number (String, unique, required)
├── status (Enum: 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')
├── total_amount (Decimal, required)
├── payment_method (Enum: 'cod', default: 'cod')
├── payment_status (Enum: 'pending', 'paid', 'failed', default: 'pending')
├── shipping_address (JSON/Text, required)
├── notes (Text, optional)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### Order Items Table
```sql
order_items
├── id (PK, UUID/Integer)
├── order_id (FK -> orders.id, required)
├── medicine_id (FK -> medicines.id, required)
├── quantity (Integer, required)
├── price (Decimal, required) -- Price at time of order
├── subtotal (Decimal, required)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### Reviews Table
```sql
reviews
├── id (PK, UUID/Integer)
├── customer_id (FK -> users.id, required)
├── medicine_id (FK -> medicines.id, required)
├── order_id (FK -> orders.id, required)
├── rating (Integer, 1-5, required)
├── comment (Text, optional)
├── is_verified_purchase (Boolean, default: true)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### Cart Table (Optional)
```sql
cart_items
├── id (PK, UUID/Integer)
├── customer_id (FK -> users.id, required)
├── medicine_id (FK -> medicines.id, required)
├── quantity (Integer, required)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "customer", // or "seller"
  "phone": "+1234567890",
  "address": "123 Main St, City"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "token": "jwt-token"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "token": "jwt-token"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "phone": "+1234567890"
  }
}
```

### Medicine Endpoints (Public)

#### Get All Medicines
```http
GET /api/medicines?page=1&limit=20&category=pain-relief&minPrice=5&maxPrice=50&search=aspirin&sort=price

Response: 200 OK
{
  "success": true,
  "data": {
    "medicines": [...],
    "pagination": {
      "total": 150,
      "page": 1,
      "pages": 8,
      "limit": 20
    }
  }
}
```

#### Get Medicine Details
```http
GET /api/medicines/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Aspirin 500mg",
    "description": "Pain reliever and fever reducer",
    "manufacturer": "PharmaCorp",
    "price": 9.99,
    "stock_quantity": 100,
    "category": {
      "id": "uuid",
      "name": "Pain Relief"
    },
    "seller": {
      "id": "uuid",
      "name": "City Pharmacy"
    },
    "rating_average": 4.5,
    "rating_count": 120,
    "reviews": [...]
  }
}
```

### Category Endpoints

#### Get All Categories
```http
GET /api/categories

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Pain Relief",
      "slug": "pain-relief",
      "medicine_count": 45
    }
  ]
}
```

### Order Endpoints (Protected)

#### Create Order
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "medicine_id": "uuid",
      "quantity": 2
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "phone": "+1234567890"
  },
  "notes": "Please deliver after 5 PM"
}

Response: 201 Created
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": "uuid",
    "order_number": "ORD-20240123-001",
    "total_amount": 49.99,
    "status": "pending"
  }
}
```

#### Get User Orders
```http
GET /api/orders?status=pending&page=1
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "orders": [...],
    "pagination": {...}
  }
}
```

#### Get Order Details
```http
GET /api/orders/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "order_number": "ORD-20240123-001",
    "status": "shipped",
    "total_amount": 49.99,
    "items": [...],
    "shipping_address": {...}
  }
}
```

### Seller Endpoints (Seller Role Required)

#### Add Medicine
```http
POST /api/seller/medicines
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Aspirin 500mg",
  "description": "Pain reliever",
  "category_id": "uuid",
  "manufacturer": "PharmaCorp",
  "price": 9.99,
  "stock_quantity": 100,
  "images": [file1, file2]
}

Response: 201 Created
{
  "success": true,
  "message": "Medicine added successfully",
  "data": {...}
}
```

#### Update Medicine
```http
PUT /api/seller/medicines/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 8.99,
  "stock_quantity": 150
}

Response: 200 OK
{
  "success": true,
  "message": "Medicine updated successfully",
  "data": {...}
}
```

#### Delete Medicine
```http
DELETE /api/seller/medicines/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Medicine deleted successfully"
}
```

#### Get Seller Orders
```http
GET /api/seller/orders?status=pending
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "orders": [...],
    "statistics": {
      "total_orders": 150,
      "pending": 12,
      "shipped": 98,
      "delivered": 40
    }
  }
}
```

#### Update Order Status
```http
PATCH /api/seller/orders/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped",
  "tracking_number": "TRK123456"
}

Response: 200 OK
{
  "success": true,
  "message": "Order status updated",
  "data": {...}
}
```

### Admin Endpoints (Admin Role Required)

#### Get All Users
```http
GET /api/admin/users?role=seller&page=1
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {...}
  }
}
```

#### Update User Status
```http
PATCH /api/admin/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "is_banned": true
}

Response: 200 OK
{
  "success": true,
  "message": "User status updated"
}
```

#### Manage Categories
```http
POST /api/admin/categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Vitamins & Supplements",
  "description": "Daily health supplements",
  "slug": "vitamins-supplements"
}

Response: 201 Created
{
  "success": true,
  "message": "Category created",
  "data": {...}
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {} // Optional additional details
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 🔐 Authentication & Authorization

### JWT Token Structure

```javascript
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "customer",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Middleware Protection

```javascript
// Public routes - no authentication required
router.get('/medicines', getMedicines);

// Protected routes - authentication required
router.get('/orders', authenticate, getOrders);

// Role-based routes
router.post('/seller/medicines', authenticate, authorize('seller'), addMedicine);
router.get('/admin/users', authenticate, authorize('admin'), getUsers);
```

### Authorization Flow

1. User sends credentials to `/api/auth/login`
2. Server validates credentials and generates JWT
3. Client stores JWT (localStorage/cookie)
4. Client includes JWT in Authorization header: `Bearer {token}`
5. Server validates JWT on protected routes
6. Server checks user role for role-based endpoints

---

## 📁 Project Structure

```
medistore-backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Database connection
│   │   ├── env.js               # Environment configuration
│   │   └── constants.js         # App constants
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── medicineController.js
│   │   ├── orderController.js
│   │   ├── sellerController.js
│   │   └── adminController.js
│   ├── middlewares/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── authorize.js         # Role-based authorization
│   │   ├── validate.js          # Request validation
│   │   ├── errorHandler.js      # Global error handler
│   │   ├── upload.js            # File upload handler
│   │   └── rateLimiter.js       # Rate limiting
│   ├── models/
│   │   ├── User.js
│   │   ├── Medicine.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── medicine.routes.js
│   │   ├── order.routes.js
│   │   ├── seller.routes.js
│   │   ├── admin.routes.js
│   │   └── index.js             # Route aggregator
│   ├── services/
│   │   ├── authService.js
│   │   ├── medicineService.js
│   │   ├── orderService.js
│   │   └── emailService.js
│   ├── utils/
│   │   ├── jwt.js               # JWT utilities
│   │   ├── hashPassword.js      # Password hashing
│   │   ├── validators.js        # Custom validators
│   │   ├── apiResponse.js       # Standard response format
│   │   └── logger.js            # Winston logger
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── medicineValidator.js
│   │   └── orderValidator.js
│   └── app.js                   # Express app setup
├── prisma/                      # If using Prisma
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── uploads/                     # File upload directory
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js                    # Entry point
```

---

## 📜 Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "db:migrate": "npx prisma migrate dev",
    "db:seed": "node prisma/seed.js",
    "db:reset": "npx prisma migrate reset",
    "db:studio": "npx prisma studio"
  }
}
```

**Usage:**
```bash
# Development
npm run dev

# Production
npm start

# Database operations
npm run db:migrate
npm run db:seed

# Testing
npm test
npm run test:watch

# Code quality
npm run lint
npm run lint:fix
```

---

## 🧪 Testing

### Test Structure
```
tests/
├── unit/
│   ├── services/
│   ├── controllers/
│   └── utils/
├── integration/
│   └── api/
└── e2e/
    └── workflows/
```

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js

# Watch mode
npm run test:watch
```

### Example Test
```javascript
describe('POST /api/auth/register', () => {
  it('should register a new customer', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        role: 'customer'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('token');
  });
});
```

---

## 🚀 Deployment

### Prerequisites
- Node.js hosting (Heroku, Railway, Render, AWS, DigitalOcean)
- PostgreSQL/MongoDB database (managed service recommended)
- Environment variables configured

### Deployment Steps

#### 1. Build Optimization
```bash
# Install production dependencies only
npm ci --production

# Set NODE_ENV
export NODE_ENV=production
```

#### 2. Environment Configuration
Ensure all production environment variables are set:
```env
NODE_ENV=production
DATABASE_URL=your-production-db-url
JWT_SECRET=your-production-secret
ALLOWED_ORIGINS=https://yourdomain.com
```

#### 3. Database Migration
```bash
# Run migrations
npm run db:migrate

# Seed initial data (admin user, categories)
npm run db:seed
```

#### 4. Deploy to Platform

**Heroku:**
```bash
heroku create medistore-api
heroku addons:create heroku-postgresql
git push heroku main
heroku run npm run db:migrate
```

**Railway:**
```bash
railway init
railway up
railway run npm run db:migrate
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Performance Optimization
- Enable compression middleware
- Implement Redis caching for frequently accessed data
- Use CDN for static assets (medicine images)
- Database query optimization and indexing
- Connection pooling

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow existing code style and patterns

### Pull Request Process
1. Update README.md with API changes
2. Ensure all tests pass
3. Update version numbers (Semantic Versioning)
4. Get approval from maintainers

---

## 📝 API Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {
      // Additional error details
    }
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "total": 100,
      "page": 1,
      "pages": 10,
      "limit": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 🔒 Security Best Practices

- ✅ Password hashing with bcrypt (10+ rounds)
- ✅ JWT token expiration
- ✅ HTTPS only in production
- ✅ CORS configuration
- ✅ Rate limiting to prevent abuse
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection (Helmet.js)
- ✅ Environment variables for secrets
- ✅ File upload restrictions (type, size)
- ✅ Secure HTTP headers

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/medistore-backend/issues)
- **Email**: support@medistore.com
- **Documentation**: [API Docs](https://api.medistore.com/docs)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Express.js community
- All contributors
- Open source libraries used in this project

---

**Built with ❤️ for safe and accessible medicine distribution**

---

## 📊 Additional Resources

### Postman Collection
Import our Postman collection for easy API testing:
[Download Collection](link-to-postman-collection)

### Database Diagram
View the complete database schema:
[View ER Diagram](link-to-diagram)

### Changelog
See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

*Last Updated: February 2026*
