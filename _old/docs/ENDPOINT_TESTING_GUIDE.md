# Endpoint Testing Guide

This guide provides comprehensive instructions and examples for testing all API endpoints in the INKINGI RESCUE application.

## Base URL
```
http://localhost:3000
```

## Available Test Data

### Users
| ID | Name | Role | District |
|----|------|------|----------|
| user-ci-001 | David Citizen | citizen | Kigali City |
| user-co-001 | Alice Coordinator | coordinator | Kigali City |
| user-re-001 | Bob Responder | responder | Kigali City |
| user-re-002 | Carol Responder | responder | Northern Province |

### Roles
| ID | Name |
|----|------|
| admin | Administrator |
| coordinator | Coordinator |
| responder | Responder |
| volunteer | Volunteer |
| citizen | Citizen |

### Emergency Reports
| ID | Type | Severity | Status | Reported By |
|----|------|----------|--------|-------------|
| report-2025-001 | Medical Emergency | High | Pending | user-ci-001 |
| report-2025-002 | Fire | Medium | In Progress | user-ci-001 |
| report-2025-003 | Flood | Low | Resolved | user-co-001 |

### Threads
| ID | Report ID | Report Type |
|----|-----------|-------------|
| thread-2025-001 | report-2025-001 | Medical Emergency |
| thread-2025-002 | report-2025-002 | Fire |

### Messages
| ID | Thread ID | Sender ID | Sender Name |
|----|-----------|-----------|-------------|
| msg-2025-001 | thread-2025-001 | user-co-001 | Alice Coordinator |
| msg-2025-002 | thread-2025-001 | user-re-001 | Bob Responder |
| msg-2025-003 | thread-2025-002 | user-re-001 | Bob Responder |

## Module Endpoints

### 1. Users Module
```
POST    /users      - Create a new user
GET     /users      - Get all users
GET     /users/:id  - Get a specific user
PATCH   /users/:id  - Update a user
DELETE  /users/:id  - Delete a user
```

#### Test Commands
```bash
# Get all users
curl -X GET http://localhost:3000/users

# Get a specific user
curl -X GET http://localhost:3000/users/user-ci-001

# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "phone": "9998887777",
    "password": "securepassword",
    "role_id": "citizen",
    "district": "Southern Province"
  }'

# Update a user
curl -X PATCH http://localhost:3000/users/user-ci-001 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated David Citizen",
    "availability": "online"
  }'

# Delete a user
curl -X DELETE http://localhost:3000/users/temp-user-001
```

### 2. Roles Module
```
POST    /roles      - Create a new role
GET     /roles      - Get all roles
GET     /roles/:id  - Get a specific role
PATCH   /roles/:id  - Update a role
DELETE  /roles/:id  - Delete a role
```

#### Test Commands
```bash
# Get all roles
curl -X GET http://localhost:3000/roles

# Get a specific role
curl -X GET http://localhost:3000/roles/coordinator

# Create a new role
curl -X POST http://localhost:3000/roles \
  -H "Content-Type: application/json" \
  -d '{
    "id": "temp-role",
    "name": "Temporary Role",
    "level": 6
  }'

# Update a role
curl -X PATCH http://localhost:3000/roles/citizen \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Community Citizen"
  }'

# Delete a role
curl -X DELETE http://localhost:3000/roles/temp-role
```

### 3. Emergency Reports Module
```
POST    /emergency-reports      - Create a new emergency report
GET     /emergency-reports      - Get all emergency reports
GET     /emergency-reports/:id  - Get a specific emergency report
PATCH   /emergency-reports/:id  - Update an emergency report
DELETE  /emergency-reports/:id  - Delete an emergency report
```

#### Test Commands
```bash
# Get all emergency reports
curl -X GET http://localhost:3000/emergency-reports

# Get a specific emergency report
curl -X GET http://localhost:3000/emergency-reports/report-2025-001

# Create a new emergency report
curl -X POST http://localhost:3000/emergency-reports \
  -H "Content-Type: application/json" \
  -d '{
    "id": "report-2025-004",
    "type": "Earthquake",
    "severity": "Critical",
    "description": "Earthquake reported in Northern Province",
    "lat": -1.6333,
    "lng": 30.0666,
    "district": "Northern Province",
    "reported_by": "user-ci-001",
    "status": "Pending"
  }'

# Update an emergency report
curl -X PATCH http://localhost:3000/emergency-reports/report-2025-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress",
    "assigned_to": ["user-re-001"]
  }'

# Delete an emergency report
curl -X DELETE http://localhost:3000/emergency-reports/report-2025-004
```

### 4. Threads Module
```
POST    /threads      - Create a new thread
GET     /threads      - Get all threads
GET     /threads/:id  - Get a specific thread
PATCH   /threads/:id  - Update a thread
DELETE  /threads/:id  - Delete a thread
```

#### Test Commands
```bash
# Get all threads
curl -X GET http://localhost:3000/threads

# Get a specific thread
curl -X GET http://localhost:3000/threads/thread-2025-001

# Create a new thread
curl -X POST http://localhost:3000/threads \
  -H "Content-Type: application/json" \
  -d '{
    "id": "thread-2025-003",
    "report_id": "report-2025-003",
    "organizer": "user-co-001"
  }'

# Update a thread
curl -X PATCH http://localhost:3000/threads/thread-2025-001 \
  -H "Content-Type: application/json" \
  -d '{
    "organizer": "user-re-002"
  }'

# Delete a thread
curl -X DELETE http://localhost:3000/threads/thread-2025-003
```

### 5. Messages Module
```
POST    /messages      - Create a new message
GET     /messages      - Get all messages
GET     /messages/:id  - Get a specific message
PATCH   /messages/:id  - Update a message
DELETE  /messages/:id  - Delete a message
```

#### Test Commands
```bash
# Get all messages
curl -X GET http://localhost:3000/messages

# Get a specific message
curl -X GET http://localhost:3000/messages/msg-2025-001

# Create a new message
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{
    "id": "msg-2025-004",
    "thread_id": "thread-2025-002",
    "sender_id": "user-co-001",
    "content": "Additional support has been dispatched"
  }'

# Update a message
curl -X PATCH http://localhost:3000/messages/msg-2025-001 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Responders dispatched to the accident site. ETA 5 minutes."
  }'

# Delete a message
curl -X DELETE http://localhost:3000/messages/msg-2025-004
```

### 6. Community Posts Module
```
POST    /community-posts      - Create a new community post
GET     /community-posts      - Get all community posts
GET     /community-posts/:id  - Get a specific community post
PATCH   /community-posts/:id  - Update a community post
DELETE  /community-posts/:id  - Delete a community post
```

#### Test Commands
```bash
# Get all community posts
curl -X GET http://localhost:3000/community-posts

# Get a specific community post
curl -X GET http://localhost:3000/community-posts/post-id

# Create a new community post
curl -X POST http://localhost:3000/community-posts \
  -H "Content-Type: application/json" \
  -d '{
    "id": "post-001",
    "user_id": "user-ci-001",
    "title": "Community Safety Tips",
    "content": "Here are some safety tips for our community...",
    "category": "Safety"
  }'

# Update a community post
curl -X PATCH http://localhost:3000/community-posts/post-001 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Here are some updated safety tips for our community..."
  }'

# Delete a community post
curl -X DELETE http://localhost:3000/community-posts/post-001
```

### 7. District Services Module
```
POST    /district-services      - Create a new district service
GET     /district-services      - Get all district services
GET     /district-services/:id  - Get a specific district service
PATCH   /district-services/:id  - Update a district service
DELETE  /district-services/:id  - Delete a district service
```

#### Test Commands
```bash
# Get all district services
curl -X GET http://localhost:3000/district-services

# Get a specific district service
curl -X GET http://localhost:3000/district-services/service-id

# Create a new district service
curl -X POST http://localhost:3000/district-services \
  -H "Content-Type: application/json" \
  -d '{
    "id": "service-001",
    "name": "Kigali Fire Department",
    "district": "Kigali City",
    "contact": "112"
  }'

# Update a district service
curl -X PATCH http://localhost:3000/district-services/service-001 \
  -H "Content-Type: application/json" \
  -d '{
    "contact": "112, 0788xxxxxx"
  }'

# Delete a district service
curl -X DELETE http://localhost:3000/district-services/service-001
```

### 8. Events Module
```
POST    /events      - Create a new event
GET     /events      - Get all events
GET     /events/:id  - Get a specific event
PATCH   /events/:id  - Update an event
DELETE  /events/:id  - Delete an event
```

#### Test Commands
```bash
# Get all events
curl -X GET http://localhost:3000/events

# Get a specific event
curl -X GET http://localhost:3000/events/event-id

# Create a new event
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "id": "event-001",
    "title": "Community Emergency Preparedness Workshop",
    "description": "Learn how to prepare for emergencies",
    "date": "2025-11-15T10:00:00Z",
    "location": "Community Center",
    "organizer_id": "user-co-001"
  }'

# Update an event
curl -X PATCH http://localhost:3000/events/event-001 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Learn how to prepare for emergencies - all welcome"
  }'

# Delete an event
curl -X DELETE http://localhost:3000/events/event-001
```

### 9. Feedback Module
```
POST    /feedback      - Create new feedback
GET     /feedback      - Get all feedback
GET     /feedback/:id  - Get specific feedback
PATCH   /feedback/:id  - Update feedback
DELETE  /feedback/:id  - Delete feedback
```

#### Test Commands
```bash
# Get all feedback
curl -X GET http://localhost:3000/feedback

# Get specific feedback
curl -X GET http://localhost:3000/feedback/feedback-id

# Create feedback
curl -X POST http://localhost:3000/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "id": "feedback-001",
    "user_id": "user-ci-001",
    "subject": "App Improvement",
    "message": "Great app, but could use some improvements in the reporting section"
  }'

# Update feedback
curl -X PATCH http://localhost:3000/feedback/feedback-001 \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Great app, but could use some improvements in the UI and reporting section"
  }'

# Delete feedback
curl -X DELETE http://localhost:3000/feedback/feedback-001
```

### 10. Incident Logs Module
```
POST    /incident-logs      - Create a new incident log
GET     /incident-logs      - Get all incident logs
GET     /incident-logs/:id  - Get a specific incident log
PATCH   /incident-logs/:id  - Update an incident log
DELETE  /incident-logs/:id  - Delete an incident log
```

#### Test Commands
```bash
# Get all incident logs
curl -X GET http://localhost:3000/incident-logs

# Get a specific incident log
curl -X GET http://localhost:3000/incident-logs/log-id

# Create an incident log
curl -X POST http://localhost:3000/incident-logs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "log-001",
    "report_id": "report-2025-001",
    "resolved_by": "user-re-001",
    "resolution_notes": "Fire department responded and contained the fire"
  }'

# Update an incident log
curl -X PATCH http://localhost:3000/incident-logs/log-001 \
  -H "Content-Type: application/json" \
  -d '{
    "resolution_notes": "Fire department responded and contained the fire. No injuries reported."
  }'

# Delete an incident log
curl -X DELETE http://localhost:3000/incident-logs/log-001
```

### 11. Notifications Module
```
POST    /notifications      - Create a new notification
GET     /notifications      - Get all notifications
GET     /notifications/:id  - Get a specific notification
PATCH   /notifications/:id  - Update a notification
DELETE  /notifications/:id  - Delete a notification
```

#### Test Commands
```bash
# Get all notifications
curl -X GET http://localhost:3000/notifications

# Get a specific notification
curl -X GET http://localhost:3000/notifications/notif-id

# Create a notification
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "notif-001",
    "title": "Emergency Alert",
    "message": "There is a fire in District A",
    "recipient_ids": ["user-ci-001", "user-re-001"]
  }'

# Update a notification
curl -X PATCH http://localhost:3000/notifications/notif-001 \
  -H "Content-Type: application/json" \
  -d '{
    "message": "There is a fire in District A - please avoid the area"
  }'

# Delete a notification
curl -X DELETE http://localhost:3000/notifications/notif-001
```

### 12. Post Comments Module
```
POST    /post-comments      - Create a new post comment
GET     /post-comments      - Get all post comments
GET     /post-comments/:id  - Get a specific post comment
PATCH   /post-comments/:id  - Update a post comment
DELETE  /post-comments/:id  - Delete a post comment
```

#### Test Commands
```bash
# Get all post comments
curl -X GET http://localhost:3000/post-comments

# Get a specific post comment
curl -X GET http://localhost:3000/post-comments/comment-id

# Create a post comment
curl -X POST http://localhost:3000/post-comments \
  -H "Content-Type: application/json" \
  -d '{
    "id": "comment-001",
    "post_id": "post-001",
    "user_id": "user-ci-001",
    "content": "Great tips! Thanks for sharing."
  }'

# Update a post comment
curl -X PATCH http://localhost:3000/post-comments/comment-001 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Really great tips! Thanks for sharing with the community."
  }'

# Delete a post comment
curl -X DELETE http://localhost:3000/post-comments/comment-001
```

### 13. Post Likes Module
```
POST    /post-likes      - Create a new post like
GET     /post-likes      - Get all post likes
GET     /post-likes/:id  - Get a specific post like
PATCH   /post-likes/:id  - Update a post like
DELETE  /post-likes/:id  - Delete a post like
```

#### Test Commands
```bash
# Get all post likes
curl -X GET http://localhost:3000/post-likes

# Get a specific post like
curl -X GET http://localhost:3000/post-likes/like-id

# Create a post like
curl -X POST http://localhost:3000/post-likes \
  -H "Content-Type: application/json" \
  -d '{
    "id": "like-001",
    "post_id": "post-001",
    "user_id": "user-ci-001"
  }'

# Update a post like
curl -X PATCH http://localhost:3000/post-likes/like-001 \
  -H "Content-Type: application/json" \
  -d '{
    "post_id": "post-002"
  }'

# Delete a post like
curl -X DELETE http://localhost:3000/post-likes/like-001
```

### 14. Report Status History Module
```
POST    /report-status-history      - Create a new report status history entry
GET     /report-status-history      - Get all report status history entries
GET     /report-status-history/:id  - Get a specific report status history entry
PATCH   /report-status-history/:id  - Update a report status history entry
DELETE  /report-status-history/:id  - Delete a report status history entry
```

#### Test Commands
```bash
# Get all report status history entries
curl -X GET http://localhost:3000/report-status-history

# Get a specific report status history entry
curl -X GET http://localhost:3000/report-status-history/history-id

# Create a report status history entry
curl -X POST http://localhost:3000/report-status-history \
  -H "Content-Type: application/json" \
  -d '{
    "id": "history-001",
    "report_id": "report-2025-001",
    "status": "In Progress",
    "changed_by": "user-co-001"
  }'

# Update a report status history entry
curl -X PATCH http://localhost:3000/report-status-history/history-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved"
  }'

# Delete a report status history entry
curl -X DELETE http://localhost:3000/report-status-history/history-001
```

### 15. Resources Module
```
POST    /resources      - Create a new resource
GET     /resources      - Get all resources
GET     /resources/:id  - Get a specific resource
PATCH   /resources/:id  - Update a resource
DELETE  /resources/:id  - Delete a resource
```

#### Test Commands
```bash
# Get all resources
curl -X GET http://localhost:3000/resources

# Get a specific resource
curl -X GET http://localhost:3000/resources/resource-id

# Create a resource
curl -X POST http://localhost:3000/resources \
  -H "Content-Type: application/json" \
  -d '{
    "id": "resource-001",
    "title": "Emergency Contact List",
    "description": "List of emergency contacts for all districts",
    "url": "http://example.com/contacts.pdf",
    "uploaded_by": "user-co-001"
  }'

# Update a resource
curl -X PATCH http://localhost:3000/resources/resource-001 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated list of emergency contacts for all districts"
  }'

# Delete a resource
curl -X DELETE http://localhost:3000/resources/resource-001
```

### 16. Responder Profiles Module
```
POST    /responder-profiles      - Create a new responder profile
GET     /responder-profiles      - Get all responder profiles
GET     /responder-profiles/:id  - Get a specific responder profile
PATCH   /responder-profiles/:id  - Update a responder profile
DELETE  /responder-profiles/:id  - Delete a responder profile
```

#### Test Commands
```bash
# Get all responder profiles
curl -X GET http://localhost:3000/responder-profiles

# Get a specific responder profile
curl -X GET http://localhost:3000/responder-profiles/profile-id

# Create a responder profile
curl -X POST http://localhost:3000/responder-profiles \
  -H "Content-Type: application/json" \
  -d '{
    "id": "profile-001",
    "user_id": "user-re-001",
    "specialization": "Medical",
    "certification": "Advanced First Aid & CPR"
  }'

# Update a responder profile
curl -X PATCH http://localhost:3000/responder-profiles/profile-001 \
  -H "Content-Type: application/json" \
  -d '{
    "certification": "Advanced First Aid, CPR & Medical Response"
  }'

# Delete a responder profile
curl -X DELETE http://localhost:3000/responder-profiles/profile-001
```

### 17. Subscriptions Module
```
POST    /subscriptions      - Create a new subscription
GET     /subscriptions      - Get all subscriptions
GET     /subscriptions/:id  - Get a specific subscription
PATCH   /subscriptions/:id  - Update a subscription
DELETE  /subscriptions/:id  - Delete a subscription
```

#### Test Commands
```bash
# Get all subscriptions
curl -X GET http://localhost:3000/subscriptions

# Get a specific subscription
curl -X GET http://localhost:3000/subscriptions/sub-id

# Create a subscription
curl -X POST http://localhost:3000/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "id": "sub-001",
    "user_id": "user-ci-001",
    "type": "Emergency Alerts",
    "district": "Kigali City"
  }'

# Update a subscription
curl -X PATCH http://localhost:3000/subscriptions/sub-001 \
  -H "Content-Type: application/json" \
  -d '{
    "type": "All Alerts"
  }'

# Delete a subscription
curl -X DELETE http://localhost:3000/subscriptions/sub-001
```

### 18. System Settings Module
```
POST    /system-settings      - Create a new system setting
GET     /system-settings      - Get all system settings
GET     /system-settings/:id  - Get a specific system setting
PATCH   /system-settings/:id  - Update a system setting
DELETE  /system-settings/:id  - Delete a system setting
```

#### Test Commands
```bash
# Get all system settings
curl -X GET http://localhost:3000/system-settings

# Get a specific system setting
curl -X GET http://localhost:3000/system-settings/setting-id

# Create a system setting
curl -X POST http://localhost:3000/system-settings \
  -H "Content-Type: application/json" \
  -d '{
    "id": "setting-001",
    "key": "maintenance_mode",
    "value": "false",
    "description": "System maintenance mode"
  }'

# Update a system setting
curl -X PATCH http://localhost:3000/system-settings/setting-001 \
  -H "Content-Type: application/json" \
  -d '{
    "value": "true"
  }'

# Delete a system setting
curl -X DELETE http://localhost:3000/system-settings/setting-001
```

### 19. Audit Logs Module
```
POST    /audit-logs      - Create a new audit log
GET     /audit-logs      - Get all audit logs
GET     /audit-logs/:id  - Get a specific audit log
PATCH   /audit-logs/:id  - Update an audit log
DELETE  /audit-logs/:id  - Delete an audit log
```

#### Test Commands
```bash
# Get all audit logs
curl -X GET http://localhost:3000/audit-logs

# Get a specific audit log
curl -X GET http://localhost:3000/audit-logs/audit-id

# Create an audit log
curl -X POST http://localhost:3000/audit-logs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "audit-001",
    "user_id": "user-co-001",
    "action": "CREATE_REPORT",
    "details": "Created emergency report report-2025-001"
  }'

# Update an audit log
curl -X PATCH http://localhost:3000/audit-logs/audit-001 \
  -H "Content-Type: application/json" \
  -d '{
    "details": "Created emergency report report-2025-001 with additional details"
  }'

# Delete an audit log
curl -X DELETE http://localhost:3000/audit-logs/audit-001
```

## Testing Tips

1. **Order of Testing**: Test modules in dependency order (roles → users → emergency reports → threads → messages)

2. **Required Fields**: Pay attention to required fields in DTOs. Missing required fields will result in validation errors.

3. **Foreign Key Constraints**: When creating related entities, ensure referenced entities exist.

4. **Response Validation**: Check HTTP status codes:
   - 200: Success
   - 201: Created
   - 400: Bad Request (validation error)
   - 404: Not Found
   - 500: Internal Server Error

5. **Data Consistency**: After making changes, verify them by retrieving the updated entities.

6. **Clean Up**: Delete test data you've created to keep the database clean.

## Common Test Scenarios

1. **Create → Read → Update → Delete (CRUD) Flow**:
   - Create a new entity
   - Retrieve it to verify creation
   - Update it with new values
   - Delete it to clean up

2. **Relationship Testing**:
   - Create related entities (e.g., a user and their emergency reports)
   - Verify relationships work correctly

3. **Error Handling**:
   - Try to create entities with missing required fields
   - Try to access non-existent entities
   - Try to violate unique constraints

This guide should help you thoroughly test all endpoints in the INKINGI RESCUE application.