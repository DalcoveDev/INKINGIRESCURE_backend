# React Native Integration Proposal for INKINGI RESCURE

## Overview
This document outlines the proposed integration approach for connecting a React Native frontend application with the INKINGI RESCURE backend API. The integration will enable mobile users to access emergency reporting, communication, and community features through a native mobile experience.

## Architecture Overview

### Backend
- RESTful API built with NestJS
- PostgreSQL database
- TypeORM for data modeling
- JWT-based authentication

### Frontend
- React Native mobile application
- Redux for state management
- Axios for HTTP requests
- AsyncStorage for local data persistence

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
```

## State Management with Redux

### Store Structure
```javascript
// store/index.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import reportsReducer from './reducers/reportsReducer';
import threadsReducer from './reducers/threadsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  reports: reportsReducer,
  threads: threadsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

### User Reducer
```javascript
// reducers/userReducer.js
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        currentUser: action.payload 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        currentUser: null 
      };
    default:
      return state;
  }
};

export default userReducer;
```

### Async Actions with Thunk
```javascript
// actions/userActions.js
import { loginUser as apiLoginUser } from '../api/userApi';

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const userData = await apiLoginUser(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };
};
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen name="Community" component={CommunityScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="EmergencyReport" component={EmergencyReportScreen} />
    </Stack.Navigator>
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

## Conclusion

This integration proposal provides a comprehensive approach to connecting a React Native frontend with the INKINGI RESCURE backend. The implementation focuses on security, performance, and user experience while maintaining scalability for future enhancements.

The proposed architecture supports all core features of the application and includes considerations for offline usage, error handling, and performance optimization. The modular structure allows for easy maintenance and future feature additions.