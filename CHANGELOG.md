# Backend Feature Updates - User Profile & Push Notifications

## Overview

This update adds comprehensive user profile management with image uploads and a complete push notifications system for emergency alerts.

---

## New Features

### 1. User Profile Management

#### Database Schema Updates

- Added `nationalId` field (optional, unique) - For storing national ID numbers
- Added `profileImageUrl` field (optional) - Cloudinary URL for profile images
- Added `address` field (optional) - User's physical address
- Added `latitude` field (optional, Float) - Location coordinate
- Added `longitude` field (optional, Float) - Location coordinate

#### New DTOs

- **`UpdateUserDto`** - Validation for profile updates with fields:
  - `firstName`, `lastName` (optional strings)
  - `email` (optional, validated email format)
  - `phoneNumber` (optional, international format validation)
  - `nationalId` (optional string)
  - `address` (optional string)
  - `latitude`, `longitude` (optional numbers)
  - `password` (optional, min 8 chars, must contain uppercase, lowercase, and number)
  - `profileImage` (optional file upload)

#### New Endpoints

**PATCH `/auth/profile`**

- Update user profile with optional fields
- Supports multipart/form-data for profile image upload
- Validates unique constraints (email, phone, nationalId)
- Automatically uploads image to Cloudinary
- Deletes old profile image when new one is uploaded

**POST `/auth/profile/image`**

- Dedicated endpoint for profile image upload only
- Accepts single image file
- Replaces existing profile image
- Returns updated user profile

**GET `/auth/profile`** (Updated)

- Now includes: `nationalId`, `profileImageUrl`, `address`, `latitude`, `longitude`

#### Features

- ✅ Cloudinary integration for image storage
- ✅ Automatic cleanup of old images
- ✅ Conflict detection for email, phone, and nationalId
- ✅ Password hashing for security
- ✅ File validation and error handling

---

### 2. Push Notifications System

#### Database Schema

- **New `PushToken` Model**:
  - `id` (UUID primary key)
  - `userId` (Foreign key to User)
  - `token` (Unique Expo push token)
  - `deviceType` (Optional: 'ios' or 'android')
  - `createdAt`, `updatedAt` timestamps
  - Indexed on `userId` and `token` for performance

- **Updated `Notification` Model**:
  - Added `type` field (optional) - e.g., "emergency", "update", "system"
  - Added `data` field (JSON) - Additional payload data
  - Added `updatedAt` timestamp
  - Added indexes on `userId` and `isRead`

#### New Dependencies

- `expo-server-sdk` - For sending Expo push notifications

#### New DTOs

- **`RegisterTokenDto`** - For registering push tokens
- **`UnregisterTokenDto`** - For unregistering push tokens

#### New Endpoints

**POST `/notifications/register`**

- Register Expo push token for authenticated user
- Validates token format
- Upserts token (updates if exists)
- Stores device type

**POST `/notifications/unregister`**

- Unregister push token (called on logout)
- Removes token from database

**GET `/notifications`**

- Get all notifications for authenticated user
- Ordered by creation date (newest first)
- Optional filter by read/unread status

**PATCH `/notifications/:id/read`**

- Mark single notification as read
- Authorization check (user owns notification)

**PATCH `/notifications/read-all`**

- Mark all unread notifications as read
- Returns count of updated notifications

**DELETE `/notifications/:id`**

- Delete a notification
- Authorization check (user owns notification)

#### Emergency Integration

- **Automatic Push Notifications**: When an emergency is created, all registered users receive:
  - Push notification to their devices
  - Notification record saved in database
  - Rich data payload with emergency details

#### Notification Features

- ✅ Token validation (Expo push token format)
- ✅ Batch sending with chunking for large user bases
- ✅ Error handling and logging
- ✅ Database persistence for all notifications
- ✅ CRUD operations on notifications
- ✅ High priority for emergency alerts
- ✅ Android notification channel support
- ✅ Automatic cleanup on user deletion (CASCADE)

---

## API Summary

### Authentication & Profile Endpoints

| Method | Endpoint              | Description                             |
| ------ | --------------------- | --------------------------------------- |
| PATCH  | `/auth/profile`       | Update user profile with optional image |
| POST   | `/auth/profile/image` | Upload profile image only               |
| GET    | `/auth/profile`       | Get user profile (includes new fields)  |

### Notification Endpoints

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/notifications/register`   | Register push token       |
| POST   | `/notifications/unregister` | Unregister push token     |
| GET    | `/notifications`            | Get all notifications     |
| PATCH  | `/notifications/:id/read`   | Mark notification as read |
| PATCH  | `/notifications/read-all`   | Mark all as read          |
| DELETE | `/notifications/:id`        | Delete notification       |

---

## Database Migrations

### Migration 1: `add_user_profile_fields`

- Added `nationalId`, `profileImageUrl`, `address`, `latitude`, `longitude` to User table

### Migration 2: `add_push_tokens`

- Created `push_tokens` table with indexes

### Migration 3: `update_notifications_table`

- Added `type`, `data`, `updatedAt` to Notification table
- Added indexes on `userId` and `isRead`

---

## Technical Details

### Cloudinary Integration

- Profile images stored in `profiles/` folder
- Automatic deletion of old images
- Max file size: 100MB
- Supported formats: JPEG, PNG, GIF, WebP

### Push Notification Flow

1. User registers push token on login
2. Emergency is created
3. System saves notification to DB for all users
4. System sends push notification to all registered devices
5. Users can view, mark as read, or delete notifications

### Security

- JWT authentication required for all endpoints
- Authorization checks for notification operations
- Password hashing with bcrypt
- Unique constraints on email, phone, nationalId
- File validation for uploads

---

## Dependencies Added

```json
{
  "expo-server-sdk": "^3.x.x"
}
```

---

## Usage Examples

### Update Profile with Image (React Native)

```typescript
const formData = new FormData();
formData.append('firstName', 'John');
formData.append('nationalId', '1199780012345678');
formData.append('address', 'KN 5 Ave, Kigali');
formData.append('latitude', '-1.9441');
formData.append('longitude', '30.0619');
formData.append('profileImage', {
  uri: imageUri,
  type: 'image/jpeg',
  name: 'profile.jpg',
});

await axios.patch('/auth/profile', formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});
```

### Register Push Token

```typescript
await axios.post(
  '/notifications/register',
  {
    token: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
    deviceType: 'ios',
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  },
);
```

### Get Notifications

```typescript
const response = await axios.get('/notifications', {
  headers: { Authorization: `Bearer ${token}` },
});
// Returns array of notifications with emergency data
```

---

## ✅ Testing Checklist

- [x] Profile update with all fields
- [x] Profile image upload and replacement
- [x] Push token registration
- [x] Emergency creation triggers notifications
- [x] Notification CRUD operations
- [x] Authorization checks
- [x] Database constraints (unique fields)
- [x] Cloudinary image cleanup

---

## Notes

- Push notifications require valid Expo push tokens
- Profile images are stored on Cloudinary (ensure credentials are configured)
- Notifications are automatically created for all users when emergency is reported
- Old profile images are automatically deleted from Cloudinary when replaced

---

## Future Enhancements

- [ ] Notification preferences (allow users to opt-out of certain types)
- [ ] Notification sound customization
- [ ] Push notification scheduling
- [ ] Image compression before upload
