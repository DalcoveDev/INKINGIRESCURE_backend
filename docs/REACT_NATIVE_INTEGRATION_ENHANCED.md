# Enhanced React Native Integration Guide for INKINGI RESCURE

## Overview
This document provides a comprehensive guide for integrating a React Native frontend application with the INKINGI RESCURE backend API. The integration enables mobile users to access emergency reporting, communication, and community features through a native mobile experience.

## Architecture Overview

### Backend
- RESTful API built with NestJS
- PostgreSQL database
- TypeORM for data modeling
- JWT-based authentication
- Port: 3001 (development)

### Frontend
- React Native mobile application
- Redux Toolkit for state management
- Axios for HTTP requests
- AsyncStorage for local data persistence
- React Navigation for routing

## API Integration Structure

### Base Configuration
```
API Base URL: http://localhost:3001 (development)
API Base URL: https://your-production-url.com (production)
```

### Authentication Flow
1. User registration
2. User login with JWT token generation
3. Token storage in AsyncStorage
4. Token inclusion in all authenticated requests

## Core Features Integration

### 1. User Management

#### Endpoints:
- `POST /users` - Register new user
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get specific user
- `PATCH /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user

#### React Native Implementation:
```javascript
// User registration
const registerUser = async (userData) => {
  try {
    const response = await axios.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// User login
const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    await AsyncStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get user profile
const getUserProfile = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update user profile
const updateUserProfile = async (userId, userData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(`/users/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### 2. Emergency Reports

#### Endpoints:
- `POST /emergency-reports` - Create new emergency report
- `GET /emergency-reports` - Get all emergency reports
- `GET /emergency-reports/:id` - Get specific emergency report
- `PATCH /emergency-reports/:id` - Update emergency report
- `DELETE /emergency-reports/:id` - Delete emergency report

#### React Native Implementation:
```javascript
// Create emergency report
const createEmergencyReport = async (reportData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('/emergency-reports', reportData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get emergency reports
const getEmergencyReports = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/emergency-reports', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get specific emergency report
const getEmergencyReport = async (reportId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/emergency-reports/${reportId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update emergency report
const updateEmergencyReport = async (reportId, reportData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(`/emergency-reports/${reportId}`, reportData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### 3. Communication Threads

#### Endpoints:
- `POST /threads` - Create new communication thread
- `GET /threads` - Get all threads
- `GET /threads/:id` - Get specific thread
- `PATCH /threads/:id` - Update thread
- `DELETE /threads/:id` - Delete thread

#### React Native Implementation:
```javascript
// Create thread
const createThread = async (threadData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('/threads', threadData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get threads
const getThreads = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/threads', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get specific thread
const getThread = async (threadId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/threads/${threadId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### 4. Messaging System

#### Endpoints:
- `POST /messages` - Send new message
- `GET /messages` - Get all messages
- `GET /messages/:id` - Get specific message
- `PATCH /messages/:id` - Update message
- `DELETE /messages/:id` - Delete message

#### React Native Implementation:
```javascript
// Send message
const sendMessage = async (messageData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('/messages', messageData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get messages for a thread
const getMessages = async (threadId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/messages?thread_id=${threadId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get specific message
const getMessage = async (messageId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/messages/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### 5. Community Features

#### Endpoints:
- `POST /community-posts` - Create community post
- `GET /community-posts` - Get all community posts
- `GET /community-posts/:id` - Get specific community post
- `PATCH /community-posts/:id` - Update community post
- `DELETE /community-posts/:id` - Delete community post

#### React Native Implementation:
```javascript
// Create community post
const createCommunityPost = async (postData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('/community-posts', postData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get community posts
const getCommunityPosts = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/community-posts', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get specific community post
const getCommunityPost = async (postId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/community-posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### 6. Roles Management

#### Endpoints:
- `POST /roles` - Create a new role
- `GET /roles` - Get all roles
- `GET /roles/:id` - Get a specific role
- `PATCH /roles/:id` - Update a role
- `DELETE /roles/:id` - Delete a role

#### React Native Implementation:
```javascript
// Get all roles
const getRoles = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/roles', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get specific role
const getRole = async (roleId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/roles/${roleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

### 7. District Services

#### Endpoints:
- `POST /district-services` - Create a new district service
- `GET /district-services` - Get all district services
- `GET /district-services/:id` - Get a specific district service
- `PATCH /district-services/:id` - Update a district service
- `DELETE /district-services/:id` - Delete a district service

#### React Native Implementation:
```javascript
// Get district services
const getDistrictServices = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/district-services', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get specific district service
const getDistrictService = async (serviceId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/district-services/${serviceId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
```

## State Management with Redux Toolkit

### Store Structure
```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import reportsReducer from './slices/reportsSlice';
import threadsReducer from './slices/threadsSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    reports: reportsReducer,
    threads: threadsReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### User Slice
```javascript
// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser } from '../../api/userApi';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await apiLoginUser(credentials);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
```

## Navigation Structure

### Main Navigation Stack
```javascript
// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EmergencyReportScreen from '../screens/EmergencyReportScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen name="Community" component={CommunityScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = ({ isAuthenticated }) => (
  <NavigationContainer>
    {isAuthenticated ? (
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyReport" component={EmergencyReportScreen} />
      </Stack.Navigator>
    ) : (
      <AuthNavigator />
    )}
  </NavigationContainer>
);

export default AppNavigator;
```

## Security Considerations

### Authentication
- JWT tokens stored securely in AsyncStorage
- Token refresh mechanism
- Secure API endpoints with role-based access control

### Data Protection
- HTTPS in production
- Input validation on both client and server
- Sensitive data encryption

### Error Handling
```javascript
// Error handling wrapper
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 401:
        // Unauthorized - redirect to login
        navigation.navigate('Login');
        break;
      case 403:
        // Forbidden - show access denied message
        Alert.alert('Access Denied', 'You do not have permission to perform this action.');
        break;
      case 500:
        // Server error - show generic error message
        Alert.alert('Server Error', 'An unexpected error occurred. Please try again later.');
        break;
      default:
        Alert.alert('Error', error.response.data.message || 'An error occurred');
    }
  } else if (error.request) {
    // Network error
    Alert.alert('Network Error', 'Unable to connect to the server. Please check your connection.');
  } else {
    // Other error
    Alert.alert('Error', 'An unexpected error occurred.');
  }
};
```

## Performance Optimization

### Caching Strategy
- Implement Redux for state management
- Cache frequently accessed data
- Use pagination for large datasets

### Image Handling
- Compress images before upload
- Implement lazy loading for image galleries
- Use thumbnails for list views

### Network Optimization
- Implement request batching
- Use pagination for large data sets
- Implement offline support with local storage

## Offline Support

### Data Synchronization
```javascript
// Offline data handling
const syncOfflineData = async () => {
  try {
    const offlineReports = await AsyncStorage.getItem('offlineReports');
    if (offlineReports) {
      const reports = JSON.parse(offlineReports);
      for (const report of reports) {
        await createEmergencyReport(report);
      }
      await AsyncStorage.removeItem('offlineReports');
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
};
```

## Testing Strategy

### Unit Testing
- Test API service functions
- Test Redux reducers and actions
- Test utility functions

### Integration Testing
- Test API endpoints with mock data
- Test navigation flows
- Test authentication flows

### End-to-End Testing
- Test complete user workflows
- Test error scenarios
- Test edge cases

## Deployment Considerations

### Environment Configuration
```javascript
// config/environment.js
const environments = {
  development: {
    apiUrl: 'http://localhost:3001',
    debug: true,
  },
  production: {
    apiUrl: 'https://api.inkingirescue.com',
    debug: false,
  },
};

const getCurrentEnvironment = () => {
  return __DEV__ ? environments.development : environments.production;
};

export default getCurrentEnvironment();
```

### Build Process
- Environment-specific configurations
- Code minification for production
- Asset optimization

## Future Enhancements

### Push Notifications
- Firebase Cloud Messaging integration
- Real-time emergency alerts
- Community post notifications

### Geolocation Features
- Location-based emergency reporting
- Responder proximity detection
- Map integration for incident locations

### Real-time Communication
- WebSocket integration for live messaging
- Real-time status updates
- Live community feed

## API Endpoint Reference

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users | Create a new user |
| GET | /users | Get all users |
| GET | /users/:id | Get a specific user |
| PATCH | /users/:id | Update a user |
| DELETE | /users/:id | Delete a user |

### Roles
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /roles | Create a new role |
| GET | /roles | Get all roles |
| GET | /roles/:id | Get a specific role |
| PATCH | /roles/:id | Update a role |
| DELETE | /roles/:id | Delete a role |

### Emergency Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /emergency-reports | Create a new emergency report |
| GET | /emergency-reports | Get all emergency reports |
| GET | /emergency-reports/:id | Get a specific emergency report |
| PATCH | /emergency-reports/:id | Update an emergency report |
| DELETE | /emergency-reports/:id | Delete an emergency report |

### Threads
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /threads | Create a new thread |
| GET | /threads | Get all threads |
| GET | /threads/:id | Get a specific thread |
| PATCH | /threads/:id | Update a thread |
| DELETE | /threads/:id | Delete a thread |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /messages | Send a new message |
| GET | /messages | Get all messages |
| GET | /messages/:id | Get a specific message |
| PATCH | /messages/:id | Update a message |
| DELETE | /messages/:id | Delete a message |

### Community Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /community-posts | Create a community post |
| GET | /community-posts | Get all community posts |
| GET | /community-posts/:id | Get a specific community post |
| PATCH | /community-posts/:id | Update a community post |
| DELETE | /community-posts/:id | Delete a community post |

## Conclusion

This enhanced integration guide provides a comprehensive approach to connecting a React Native frontend with the INKINGI RESCURE backend. The implementation focuses on security, performance, and user experience while maintaining scalability for future enhancements.

The proposed architecture supports all core features of the application and includes considerations for offline usage, error handling, and performance optimization. The modular structure allows for easy maintenance and future feature additions.