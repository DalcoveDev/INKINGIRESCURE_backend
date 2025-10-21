# React Native Integration Quick Reference

## API Connection Details

- **Base URL (Development)**: http://localhost:3001
- **Base URL (Production)**: https://your-production-url.com
- **Authentication**: JWT Bearer tokens
- **Token Storage**: AsyncStorage

## Essential Dependencies

```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install @reduxjs/toolkit react-redux
npm install axios
npm install @react-native-async-storage/async-storage
```

## Core API Endpoints

### Authentication
```
POST /auth/login     # User login
POST /users          # User registration
```

### Users
```
GET    /users        # Get all users
GET    /users/:id    # Get user by ID
PATCH  /users/:id    # Update user
DELETE /users/:id    # Delete user
```

### Emergency Reports
```
POST   /emergency-reports      # Create report
GET    /emergency-reports      # Get all reports
GET    /emergency-reports/:id  # Get report by ID
PATCH  /emergency-reports/:id  # Update report
DELETE /emergency-reports/:id  # Delete report
```

### Communication
```
POST   /threads      # Create thread
GET    /threads      # Get all threads
GET    /threads/:id  # Get thread by ID
POST   /messages     # Send message
GET    /messages     # Get all messages
GET    /messages?thread_id=:id  # Get messages for thread
```

### Community
```
POST   /community-posts      # Create post
GET    /community-posts      # Get all posts
GET    /community-posts/:id  # Get post by ID
```

## Authentication Flow

1. **Login Request**:
```javascript
const response = await axios.post('/auth/login', {
  username: 'user@example.com',
  password: 'password123'
});
```

2. **Store Token**:
```javascript
await AsyncStorage.setItem('token', response.data.access_token);
```

3. **Authenticated Requests**:
```javascript
const token = await AsyncStorage.getItem('token');
const response = await axios.get('/users', {
  headers: { Authorization: `Bearer ${token}` }
});
```

## Redux State Structure

```javascript
{
  user: {
    currentUser: object,
    isAuthenticated: boolean,
    loading: boolean,
    error: string
  },
  reports: {
    items: array,
    loading: boolean,
    error: string
  },
  threads: {
    items: array,
    loading: boolean,
    error: string
  },
  posts: {
    items: array,
    loading: boolean,
    error: string
  }
}
```

## Error Handling Pattern

```javascript
try {
  const response = await apiCall();
  return response.data;
} catch (error) {
  if (error.response) {
    // Server error
    throw new Error(error.response.data.message);
  } else if (error.request) {
    // Network error
    throw new Error('Network error - check connection');
  } else {
    // Other error
    throw new Error('An unexpected error occurred');
  }
}
```

## Key React Native Components

### API Service Wrapper
```javascript
// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### Authentication Hook
```javascript
// hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../store/slices/userSlice';

export const useAuth = () => {
  const { currentUser, isAuthenticated, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const login = (credentials) => dispatch(loginUser(credentials));
  const logoutUser = () => dispatch(logout());

  return { currentUser, isAuthenticated, loading, error, login, logout: logoutUser };
};
```

## Environment Configuration

```javascript
// config/env.js
const Config = {
  development: {
    API_URL: 'http://localhost:3001',
  },
  production: {
    API_URL: 'https://api.inkingirescue.com',
  },
};

export default __DEV__ ? Config.development : Config.production;
```

## Data Models

### User
```javascript
{
  id: string,
  name: string,
  phone: string,
  password: string,
  role_id: string,
  district: string
}
```

### Emergency Report
```javascript
{
  id: string,
  type: string,
  severity: string,
  description: string,
  lat: number,
  lng: number,
  district: string,
  reported_by: string,
  status: string
}
```

### Thread
```javascript
{
  id: string,
  report_id: string,
  organizer: string
}
```

### Message
```javascript
{
  id: string,
  thread_id: string,
  sender_id: string,
  content: string
}
```

### Community Post
```javascript
{
  id: string,
  user_id: string,
  title: string,
  content: string,
  category: string
}
```

## Testing Endpoints

Use these curl commands to test the API:

```bash
# Get all users
curl -X GET http://localhost:3001/users

# Create a user
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-004",
    "name": "Alice NewUser",
    "phone": "5556667777",
    "password": "newpassword123",
    "role_id": "user",
    "district": "District C"
  }'

# Get all emergency reports
curl -X GET http://localhost:3001/emergency-reports

# Create a community post
curl -X POST http://localhost:3001/community-posts \
  -H "Content-Type: application/json" \
  -d '{
    "id": "post-001",
    "user_id": "user-001",
    "title": "Community Safety Tips",
    "content": "Here are some safety tips for our community...",
    "category": "Safety"
  }'
```

## Common Issues and Solutions

1. **CORS Errors**: Ensure backend is configured to accept requests from React Native
2. **Network Errors**: Check if the backend server is running on port 3001
3. **Authentication Failures**: Verify JWT token is properly stored and sent in headers
4. **Data Not Loading**: Check if the user has proper permissions for the requested data

## Next Steps

1. Set up the development environment with the required dependencies
2. Implement the authentication flow
3. Create the main navigation structure
4. Build the core screens (Home, Reports, Community, Profile)
5. Implement offline support for emergency reporting
6. Add push notifications for real-time alerts
7. Test all API integrations
8. Optimize performance and handle error cases