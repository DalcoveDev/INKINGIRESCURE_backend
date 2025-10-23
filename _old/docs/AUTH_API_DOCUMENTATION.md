# Authentication API Documentation

## Overview
This document describes the authentication endpoints for the INKINGI Rescue backend API. The authentication system uses JWT (JSON Web Tokens) for secure user authentication.

## Base URL
```
http://localhost:3000/auth
```

## Endpoints

### 1. Register User
Creates a new user account with hashed password.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+250788123456",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "role_id": "role-uuid-here",
  "district": "Kigali",
  "lat": -1.9536,
  "lng": 30.0606,
  "availability": "online"
}
```

**Required Fields:**
- `name` (string): User's full name
- `phone` (string): User's phone number (must be unique)
- `password` (string): User's password (minimum 6 characters)
- `role_id` (string): UUID of the user's role
- `district` (string): User's district

**Optional Fields:**
- `email` (string): User's email address (must be unique if provided)
- `lat` (number): Latitude coordinate
- `lng` (number): Longitude coordinate
- `availability` (string): User availability status (default: "offline")

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "generated-uuid",
    "name": "John Doe",
    "phone": "+250788123456",
    "email": "john.doe@example.com",
    "role_id": "role-uuid-here",
    "district": "Kigali",
    "lat": -1.9536,
    "lng": 30.0606,
    "availability": "online",
    "created_at": "2025-10-22T00:00:00.000Z",
    "updated_at": "2025-10-22T00:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `409 Conflict`: User with this phone or email already exists
- `400 Bad Request`: Validation error (missing required fields, invalid format)

---

### 2. Login
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "phoneOrEmail": "+250788123456",
  "password": "securePassword123"
}
```

**Required Fields:**
- `phoneOrEmail` (string): User's phone number or email address
- `password` (string): User's password

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "phone": "+250788123456",
    "email": "john.doe@example.com",
    "role_id": "role-uuid-here",
    "district": "Kigali",
    "lat": -1.9536,
    "lng": 30.0606,
    "availability": "online",
    "created_at": "2025-10-22T00:00:00.000Z",
    "updated_at": "2025-10-22T00:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials (wrong phone/email or password)
- `400 Bad Request`: Validation error (missing required fields)

---

### 3. Get Profile
Retrieves the authenticated user's profile information.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "id": "user-uuid",
  "name": "John Doe",
  "phone": "+250788123456",
  "email": "john.doe@example.com",
  "role_id": "role-uuid-here",
  "district": "Kigali",
  "lat": -1.9536,
  "lng": 30.0606,
  "availability": "online",
  "created_at": "2025-10-22T00:00:00.000Z",
  "updated_at": "2025-10-22T00:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

---

### 4. Logout
Logs out the current user (client-side token removal).

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Logout successful. Please remove the token from client storage."
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token

---

## Authentication Flow

### Registration Flow
1. User submits registration form with required information
2. Backend validates the data
3. Backend checks if user already exists (by phone or email)
4. Password is hashed using bcrypt (10 salt rounds)
5. User is created in the database
6. JWT token is generated and returned
7. Client stores the token for subsequent requests

### Login Flow
1. User submits phone/email and password
2. Backend finds user by phone or email
3. Backend verifies password using bcrypt
4. JWT token is generated and returned
5. Client stores the token for subsequent requests

### Protected Route Access
1. Client includes JWT token in Authorization header
2. Backend validates the token
3. Backend extracts user information from token payload
4. Request proceeds if token is valid

---

## JWT Token Structure

The JWT token contains the following payload:
```json
{
  "sub": "user-uuid",
  "phone": "+250788123456",
  "email": "john.doe@example.com",
  "role": "role-uuid-here",
  "iat": 1729555200,
  "exp": 1729641600
}
```

**Token Expiration:** 24 hours (configurable via `JWT_EXPIRES_IN` environment variable)

---

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Authentication**: Stateless authentication using JSON Web Tokens
3. **Token Expiration**: Tokens expire after 24 hours by default
4. **Unique Constraints**: Phone and email must be unique across all users
5. **Input Validation**: All inputs are validated using class-validator decorators

---

## Environment Variables

Add these to your `.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

---

## Example Usage

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+250788123456",
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "role_id": "role-uuid-here",
    "district": "Kigali"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneOrEmail": "+250788123456",
    "password": "securePassword123"
  }'
```

**Get Profile:**
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Logout:**
```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using JavaScript/Fetch

**Register:**
```javascript
const response = await fetch('http://localhost:3000/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '+250788123456',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    role_id: 'role-uuid-here',
    district: 'Kigali'
  })
});

const data = await response.json();
localStorage.setItem('access_token', data.access_token);
```

**Login:**
```javascript
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phoneOrEmail: '+250788123456',
    password: 'securePassword123'
  })
});

const data = await response.json();
localStorage.setItem('access_token', data.access_token);
```

**Get Profile:**
```javascript
const token = localStorage.getItem('access_token');
const response = await fetch('http://localhost:3000/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const profile = await response.json();
```

**Logout:**
```javascript
const token = localStorage.getItem('access_token');
await fetch('http://localhost:3000/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

localStorage.removeItem('access_token');
```

---

## Protecting Other Routes

To protect other routes in your application, use the `JwtAuthGuard`:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

---

## Testing the Authentication

1. Start your server: `npm run start:dev`
2. Register a new user using the `/auth/register` endpoint
3. Copy the `access_token` from the response
4. Use the token to access protected endpoints like `/auth/profile`
5. Test login with the same credentials
6. Verify that requests without a token are rejected with 401 Unauthorized

---

## Notes

- Passwords are never returned in API responses
- The `id` field is automatically generated as a UUID
- Tokens should be stored securely on the client side (e.g., httpOnly cookies or secure localStorage)
- In production, ensure `JWT_SECRET` is a strong, random string
- Consider implementing refresh tokens for better security in production
- The logout endpoint is stateless; actual logout happens client-side by removing the token
