# Complete API Documentation

## Base URL
```
http://localhost:3000
```

## Database Integration

The API is connected to a PostgreSQL database with the following sample data:

### Sample Users
| ID | Name | Phone | Role | District |
|----|------|-------|------|----------|
| user-001 | John Admin | 1234567890 | Administrator | District A |
| user-002 | Jane User | 0987654321 | User | District B |
| user-003 | Bob Responder | 1122334455 | Responder | District A |

### Sample Emergency Reports
| ID | Type | Severity | Status | District | Reported By |
|----|------|----------|--------|----------|-------------|
| report-001 | Fire | High | Pending | District A | John Admin |
| report-002 | Medical | Medium | In Progress | District B | Jane User |
| report-003 | Flood | Low | Resolved | District A | Bob Responder |

### Sample Threads
| ID | Report ID | Organizer |
|----|-----------|-----------|
| thread-001 | report-001 | user-001 |
| thread-002 | report-002 | user-002 |

### Sample Messages
| ID | Thread ID | Sender | Content |
|----|-----------|--------|---------|
| msg-001 | thread-001 | John Admin | Fire department has been notified |
| msg-002 | thread-001 | Bob Responder | I am on my way to the location |
| msg-003 | thread-002 | Jane User | Ambulance dispatched |

## Modules and Endpoints

### 1. Users
```
POST    /users      - Create a new user
GET     /users      - Get all users
GET     /users/:id  - Get a specific user
PATCH   /users/:id  - Update a user
DELETE  /users/:id  - Delete a user
```

#### Example Requests
```
# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-004",
    "name": "Alice NewUser",
    "phone": "5556667777",
    "password": "newpassword123",
    "role_id": "user",
    "district": "District C"
  }'

# Get all users
curl -X GET http://localhost:3000/users

# Get a specific user
curl -X GET http://localhost:3000/users/user-001

# Update a user
curl -X PATCH http://localhost:3000/users/user-001 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Administrator"
  }'

# Delete a user
curl -X DELETE http://localhost:3000/users/user-004
```

### 2. Roles
```
POST    /roles      - Create a new role
GET     /roles      - Get all roles
GET     /roles/:id  - Get a specific role
PATCH   /roles/:id  - Update a role
DELETE  /roles/:id  - Delete a role
```

#### Example Requests
```bash
# Create a role
curl -X POST http://localhost:3000/roles \
  -H "Content-Type: application/json" \
  -d '{
    "id": "moderator",
    "name": "Moderator",
    "level": 4
  }'

# Get all roles
curl -X GET http://localhost:3000/roles

# Get a specific role
curl -X GET http://localhost:3000/roles/admin

# Update a role
curl -X PATCH http://localhost:3000/roles/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Regular User"
  }'

# Delete a role
curl -X DELETE http://localhost:3000/roles/moderator
```

### 3. Emergency Reports
```
POST    /emergency-reports      - Create a new emergency report
GET     /emergency-reports      - Get all emergency reports
GET     /emergency-reports/:id  - Get a specific emergency report
PATCH   /emergency-reports/:id  - Update an emergency report
DELETE  /emergency-reports/:id  - Delete an emergency report
```

#### Example Requests
```
# Create an emergency report
curl -X POST http://localhost:3000/emergency-reports \
  -H "Content-Type: application/json" \
  -d '{
    "id": "report-004",
    "type": "Earthquake",
    "severity": "Critical",
    "description": "Earthquake reported in District C",
    "lat": 12.987654,
    "lng": 98.123456,
    "district": "District C",
    "reported_by": "user-004",
    "status": "Pending"
  }'

# Get all emergency reports
curl -X GET http://localhost:3000/emergency-reports

# Get a specific emergency report
curl -X GET http://localhost:3000/emergency-reports/report-001

# Update an emergency report
curl -X PATCH http://localhost:3000/emergency-reports/report-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }'

# Delete an emergency report
curl -X DELETE http://localhost:3000/emergency-reports/report-004
```

### 4. Threads
```
POST    /threads      - Create a new thread
GET     /threads      - Get all threads
GET     /threads/:id  - Get a specific thread
PATCH   /threads/:id  - Update a thread
DELETE  /threads/:id  - Delete a thread
```

#### Example Requests
```bash
# Create a thread
curl -X POST http://localhost:3000/threads \
  -H "Content-Type: application/json" \
  -d '{
    "id": "thread-003",
    "report_id": "report-003",
    "organizer": "user-003"
  }'

# Get all threads
curl -X GET http://localhost:3000/threads

# Get a specific thread
curl -X GET http://localhost:3000/threads/thread-001

# Update a thread
curl -X PATCH http://localhost:3000/threads/thread-001 \
  -H "Content-Type: application/json" \
  -d '{
    "organizer": "user-002"
  }'

# Delete a thread
curl -X DELETE http://localhost:3000/threads/thread-003
```

### 5. Messages
```
POST    /messages      - Create a new message
GET     /messages      - Get all messages
GET     /messages/:id  - Get a specific message
PATCH   /messages/:id  - Update a message
DELETE  /messages/:id  - Delete a message
```

#### Example Requests
```bash
# Create a message
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{
    "id": "msg-004",
    "thread_id": "thread-002",
    "sender_id": "user-003",
    "content": "I can assist with this medical emergency"
  }'

# Get all messages
curl -X GET http://localhost:3000/messages

# Get a specific message
curl -X GET http://localhost:3000/messages/msg-001

# Update a message
curl -X PATCH http://localhost:3000/messages/msg-001 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Fire department and paramedics have been notified"
  }'

# Delete a message
curl -X DELETE http://localhost:3000/messages/msg-004
```

### 6. Community Posts
```
POST    /community-posts      - Create a new community post
GET     /community-posts      - Get all community posts
GET     /community-posts/:id  - Get a specific community post
PATCH   /community-posts/:id  - Update a community post
DELETE  /community-posts/:id  - Delete a community post
```

#### Example Requests
```bash
# Create a community post
curl -X POST http://localhost:3000/community-posts \
  -H "Content-Type: application/json" \
  -d '{
    "id": "post-001",
    "user_id": "user-001",
    "title": "Community Safety Tips",
    "content": "Here are some safety tips for our community...",
    "category": "Safety"
  }'

# Get all community posts
curl -X GET http://localhost:3000/community-posts

# Get a specific community post
curl -X GET http://localhost:3000/community-posts/post-001

# Update a community post
curl -X PATCH http://localhost:3000/community-posts/post-001 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Here are some updated safety tips for our community..."
  }'

# Delete a community post
curl -X DELETE http://localhost:3000/community-posts/post-001
```

### 7. District Services
```
POST    /district-services      - Create a new district service
GET     /district-services      - Get all district services
GET     /district-services/:id  - Get a specific district service
PATCH   /district-services/:id  - Update a district service
DELETE  /district-services/:id  - Delete a district service
```

#### Example Requests
```bash
# Create a district service
curl -X POST http://localhost:3000/district-services \
  -H "Content-Type: application/json" \
  -d '{
    "id": "service-001",
    "name": "District A Fire Department",
    "district": "District A",
    "contact": "123-456-7890"
  }'

# Get all district services
curl -X GET http://localhost:3000/district-services

# Get a specific district service
curl -X GET http://localhost:3000/district-services/service-001

# Update a district service
curl -X PATCH http://localhost:3000/district-services/service-001 \
  -H "Content-Type: application/json" \
  -d '{
    "contact": "098-765-4321"
  }'

# Delete a district service
curl -X DELETE http://localhost:3000/district-services/service-001
```

### 8. Events
```
POST    /events      - Create a new event
GET     /events      - Get all events
GET     /events/:id  - Get a specific event
PATCH   /events/:id  - Update an event
DELETE  /events/:id  - Delete an event
```

#### Example Requests
```bash
# Create an event
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "id": "event-001",
    "title": "Community Emergency Preparedness Workshop",
    "description": "Learn how to prepare for emergencies",
    "date": "2023-06-15T10:00:00Z",
    "location": "Community Center",
    "organizer_id": "user-001"
  }'

# Get all events
curl -X GET http://localhost:3000/events

# Get a specific event
curl -X GET http://localhost:3000/events/event-001

# Update an event
curl -X PATCH http://localhost:3000/events/event-001 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Learn how to prepare for emergencies - all welcome"
  }'

# Delete an event
curl -X DELETE http://localhost:3000/events/event-001
```

### 9. Feedback
```
POST    /feedback      - Create new feedback
GET     /feedback      - Get all feedback
GET     /feedback/:id  - Get specific feedback
PATCH   /feedback/:id  - Update feedback
DELETE  /feedback/:id  - Delete feedback
```

#### Example Requests
```bash
# Create feedback
curl -X POST http://localhost:3000/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "id": "feedback-001",
    "user_id": "user-002",
    "subject": "App Improvement",
    "message": "Great app, but could use some improvements in the reporting section"
  }'

# Get all feedback
curl -X GET http://localhost:3000/feedback

# Get specific feedback
curl -X GET http://localhost:3000/feedback/feedback-001

# Update feedback
curl -X PATCH http://localhost:3000/feedback/feedback-001 \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Great app, but could use some improvements in the UI and reporting section"
  }'

# Delete feedback
curl -X DELETE http://localhost:3000/feedback/feedback-001
```

### 10. Incident Logs
```
POST    /incident-logs      - Create a new incident log
GET     /incident-logs      - Get all incident logs
GET     /incident-logs/:id  - Get a specific incident log
PATCH   /incident-logs/:id  - Update an incident log
DELETE  /incident-logs/:id  - Delete an incident log
```

#### Example Requests
```bash
# Create an incident log
curl -X POST http://localhost:3000/incident-logs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "log-001",
    "report_id": "report-001",
    "resolved_by": "user-003",
    "resolution_notes": "Fire department responded and contained the fire"
  }'

# Get all incident logs
curl -X GET http://localhost:3000/incident-logs

# Get a specific incident log
curl -X GET http://localhost:3000/incident-logs/log-001

# Update an incident log
curl -X PATCH http://localhost:3000/incident-logs/log-001 \
  -H "Content-Type: application/json" \
  -d '{
    "resolution_notes": "Fire department responded and contained the fire. No injuries reported."
  }'

# Delete an incident log
curl -X DELETE http://localhost:3000/incident-logs/log-001
```

### 11. Notifications
```
POST    /notifications      - Create a new notification
GET     /notifications      - Get all notifications
GET     /notifications/:id  - Get a specific notification
PATCH   /notifications/:id  - Update a notification
DELETE  /notifications/:id  - Delete a notification
```

#### Example Requests
```bash
# Create a notification
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "notif-001",
    "title": "Emergency Alert",
    "message": "There is a fire in District A",
    "recipient_ids": ["user-001", "user-002", "user-003"]
  }'

# Get all notifications
curl -X GET http://localhost:3000/notifications

# Get a specific notification
curl -X GET http://localhost:3000/notifications/notif-001

# Update a notification
curl -X PATCH http://localhost:3000/notifications/notif-001 \
  -H "Content-Type: application/json" \
  -d '{
    "message": "There is a fire in District A - please avoid the area"
  }'

# Delete a notification
curl -X DELETE http://localhost:3000/notifications/notif-001
```

### 12. Post Comments
```
POST    /post-comments      - Create a new post comment
GET     /post-comments      - Get all post comments
GET     /post-comments/:id  - Get a specific post comment
PATCH   /post-comments/:id  - Update a post comment
DELETE  /post-comments/:id  - Delete a post comment
```

#### Example Requests
```bash
# Create a post comment
curl -X POST http://localhost:3000/post-comments \
  -H "Content-Type: application/json" \
  -d '{
    "id": "comment-001",
    "post_id": "post-001",
    "user_id": "user-002",
    "content": "Great tips! Thanks for sharing."
  }'

# Get all post comments
curl -X GET http://localhost:3000/post-comments

# Get a specific post comment
curl -X GET http://localhost:3000/post-comments/comment-001

# Update a post comment
curl -X PATCH http://localhost:3000/post-comments/comment-001 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Really great tips! Thanks for sharing with the community."
  }'

# Delete a post comment
curl -X DELETE http://localhost:3000/post-comments/comment-001
```

### 13. Post Likes
```
POST    /post-likes      - Create a new post like
GET     /post-likes      - Get all post likes
GET     /post-likes/:id  - Get a specific post like
PATCH   /post-likes/:id  - Update a post like
DELETE  /post-likes/:id  - Delete a post like
```

#### Example Requests
```bash
# Create a post like
curl -X POST http://localhost:3000/post-likes \
  -H "Content-Type: application/json" \
  -d '{
    "id": "like-001",
    "post_id": "post-001",
    "user_id": "user-002"
  }'

# Get all post likes
curl -X GET http://localhost:3000/post-likes

# Get a specific post like
curl -X GET http://localhost:3000/post-likes/like-001

# Update a post like
curl -X PATCH http://localhost:3000/post-likes/like-001 \
  -H "Content-Type: application/json" \
  -d '{
    "post_id": "post-002"
  }'

# Delete a post like
curl -X DELETE http://localhost:3000/post-likes/like-001
```

### 14. Report Status History
```
POST    /report-status-history      - Create a new report status history entry
GET     /report-status-history      - Get all report status history entries
GET     /report-status-history/:id  - Get a specific report status history entry
PATCH   /report-status-history/:id  - Update a report status history entry
DELETE  /report-status-history/:id  - Delete a report status history entry
```

#### Example Requests
```bash
# Create a report status history entry
curl -X POST http://localhost:3000/report-status-history \
  -H "Content-Type: application/json" \
  -d '{
    "id": "history-001",
    "report_id": "report-001",
    "status": "In Progress",
    "changed_by": "user-001"
  }'

# Get all report status history entries
curl -X GET http://localhost:3000/report-status-history

# Get a specific report status history entry
curl -X GET http://localhost:3000/report-status-history/history-001

# Update a report status history entry
curl -X PATCH http://localhost:3000/report-status-history/history-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved"
  }'

# Delete a report status history entry
curl -X DELETE http://localhost:3000/report-status-history/history-001
```

### 15. Resources
```
POST    /resources      - Create a new resource
GET     /resources      - Get all resources
GET     /resources/:id  - Get a specific resource
PATCH   /resources/:id  - Update a resource
DELETE  /resources/:id  - Delete a resource
```

#### Example Requests
```bash
# Create a resource
curl -X POST http://localhost:3000/resources \
  -H "Content-Type: application/json" \
  -d '{
    "id": "resource-001",
    "title": "Emergency Contact List",
    "description": "List of emergency contacts for all districts",
    "url": "http://example.com/contacts.pdf",
    "uploaded_by": "user-001"
  }'

# Get all resources
curl -X GET http://localhost:3000/resources

# Get a specific resource
curl -X GET http://localhost:3000/resources/resource-001

# Update a resource
curl -X PATCH http://localhost:3000/resources/resource-001 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated list of emergency contacts for all districts"
  }'

# Delete a resource
curl -X DELETE http://localhost:3000/resources/resource-001
```

### 16. Responder Profiles
```
POST    /responder-profiles      - Create a new responder profile
GET     /responder-profiles      - Get all responder profiles
GET     /responder-profiles/:id  - Get a specific responder profile
PATCH   /responder-profiles/:id  - Update a responder profile
DELETE  /responder-profiles/:id  - Delete a responder profile
```

#### Example Requests
```bash
# Create a responder profile
curl -X POST http://localhost:3000/responder-profiles \
  -H "Content-Type: application/json" \
  -d '{
    "id": "profile-001",
    "user_id": "user-003",
    "specialization": "Medical",
    "certification": "Advanced First Aid & CPR"
  }'

# Get all responder profiles
curl -X GET http://localhost:3000/responder-profiles

# Get a specific responder profile
curl -X GET http://localhost:3000/responder-profiles/profile-001

# Update a responder profile
curl -X PATCH http://localhost:3000/responder-profiles/profile-001 \
  -H "Content-Type: application/json" \
  -d '{
    "certification": "Advanced First Aid, CPR & Medical Response"
  }'

# Delete a responder profile
curl -X DELETE http://localhost:3000/responder-profiles/profile-001
```

### 17. Subscriptions
```
POST    /subscriptions      - Create a new subscription
GET     /subscriptions      - Get all subscriptions
GET     /subscriptions/:id  - Get a specific subscription
PATCH   /subscriptions/:id  - Update a subscription
DELETE  /subscriptions/:id  - Delete a subscription
```

#### Example Requests
```bash
# Create a subscription
curl -X POST http://localhost:3000/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "id": "sub-001",
    "user_id": "user-002",
    "type": "Emergency Alerts",
    "district": "District B"
  }'

# Get all subscriptions
curl -X GET http://localhost:3000/subscriptions

# Get a specific subscription
curl -X GET http://localhost:3000/subscriptions/sub-001

# Update a subscription
curl -X PATCH http://localhost:3000/subscriptions/sub-001 \
  -H "Content-Type: application/json" \
  -d '{
    "type": "All Alerts"
  }'

# Delete a subscription
curl -X DELETE http://localhost:3000/subscriptions/sub-001
```

### 18. System Settings
```
POST    /system-settings      - Create a new system setting
GET     /system-settings      - Get all system settings
GET     /system-settings/:id  - Get a specific system setting
PATCH   /system-settings/:id  - Update a system setting
DELETE  /system-settings/:id  - Delete a system setting
```

#### Example Requests
```bash
# Create a system setting
curl -X POST http://localhost:3000/system-settings \
  -H "Content-Type: application/json" \
  -d '{
    "id": "setting-001",
    "key": "maintenance_mode",
    "value": "false",
    "description": "System maintenance mode"
  }'

# Get all system settings
curl -X GET http://localhost:3000/system-settings

# Get a specific system setting
curl -X GET http://localhost:3000/system-settings/setting-001

# Update a system setting
curl -X PATCH http://localhost:3000/system-settings/setting-001 \
  -H "Content-Type: application/json" \
  -d '{
    "value": "true"
  }'

# Delete a system setting
curl -X DELETE http://localhost:3000/system-settings/setting-001
```

### 19. Audit Logs
```
POST    /audit-logs      - Create a new audit log
GET     /audit-logs      - Get all audit logs
GET     /audit-logs/:id  - Get a specific audit log
PATCH   /audit-logs/:id  - Update an audit log
DELETE  /audit-logs/:id  - Delete an audit log
```

#### Example Requests
```bash
# Create an audit log
curl -X POST http://localhost:3000/audit-logs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "audit-001",
    "user_id": "user-001",
    "action": "CREATE_REPORT",
    "details": "Created emergency report report-001"
  }'

# Get all audit logs
curl -X GET http://localhost:3000/audit-logs

# Get a specific audit log
curl -X GET http://localhost:3000/audit-logs/audit-001

# Update an audit log
curl -X PATCH http://localhost:3000/audit-logs/audit-001 \
  -H "Content-Type: application/json" \
  -d '{
    "details": "Created emergency report report-001 with additional details"
  }'

# Delete an audit log
curl -X DELETE http://localhost:3000/audit-logs/audit-001
```

## Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

## Notes
1. All IDs must be unique within their respective modules
2. Foreign key fields (like `user_id`, `report_id`, etc.) must correspond to existing records
3. Date fields should be in ISO 8601 format (e.g., "2023-05-15T10:30:00Z")
4. Required fields are marked with `@IsNotEmpty()` in the DTOs
5. Some modules may have additional optional fields not shown in these examples
6. The database is pre-populated with sample data that can be used for testing
