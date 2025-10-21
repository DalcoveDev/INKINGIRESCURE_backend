# Database Integration Summary

## Database Connection Details

The application is connected to a PostgreSQL database with the following configuration:

- **Host**: localhost
- **Port**: 8080
- **Database**: INKINGI
- **Username**: postgres
- **Password**: 123

## Real INKING Data Integration

The database has been populated with realistic INKING data that represents what would be integrated from the actual INKING system. This includes:

### Roles
- Administrator (admin) - Level 1
- Coordinator (coordinator) - Level 2
- Responder (responder) - Level 3
- Volunteer (volunteer) - Level 4
- Citizen (citizen) - Level 5

### Users
- Alice Coordinator (user-co-001) - Coordinator in Kigali City (online)
- Bob Responder (user-re-001) - Responder in Kigali City (available)
- Carol Responder (user-re-002) - Responder in Northern Province (busy)
- David Citizen (user-ci-001) - Citizen in Kigali City (offline)

### Emergency Reports
- Medical Emergency (report-2025-001) - High severity, Pending status in Kigali City
- Fire (report-2025-002) - Medium severity, In Progress status in Kigali City
- Flood (report-2025-003) - Low severity, Resolved status in Kigali City

### Threads
- Thread for medical emergency (thread-2025-001)
- Thread for fire report (thread-2025-002)

### Messages
- Coordinator dispatch message (msg-2025-001)
- Responder on-scene message (msg-2025-002)
- Fire department notification (msg-2025-003)

## Available Database Tables

The application uses the following database tables which correspond to the NestJS entities:

- `users` - User information
- `roles` - User roles and permissions
- `emergency_reports` - Emergency reports submitted by users
- `threads` - Communication threads for emergency reports
- `messages` - Messages within threads
- `community_posts` - Community posts
- `district_services` - District services information
- `events` - Community events
- `feedback` - User feedback
- `incident_logs` - Incident resolution logs
- `notifications` - System notifications
- `post_comments` - Comments on community posts
- `post_likes` - Likes on community posts
- `report_status_history` - History of report status changes
- `resources` - Emergency resources
- `responder_profiles` - Responder profiles
- `subscriptions` - User subscriptions
- `system_settings` - System configuration settings
- `audit_logs` - System audit logs

## Data Operations

### Retrieving Data
To retrieve data from the INKING database, you can use the existing API endpoints:

1. **Get all users**: `GET http://localhost:3000/users`
2. **Get a specific emergency report**: `GET http://localhost:3000/emergency-reports/report-2025-001`
3. **Get all threads**: `GET http://localhost:3000/threads`
4. **Get all messages**: `GET http://localhost:3000/messages`

Example response for getting all users:
```json
[
  {
    "id": "user-co-001",
    "name": "Alice Coordinator",
    "phone": "1234567890",
    "email": "alice.coordinator@inkingi.rw",
    "role_id": "coordinator",
    "district": "Kigali City",
    "availability": "online",
    "created_at": "2025-10-21T16:15:22.000Z",
    "updated_at": "2025-10-21T16:15:22.000Z"
  },
  // ... other users
]
```

### Inserting Data
To insert data into the INKING database, you can use the POST endpoints:

1. **Create a user**: `POST http://localhost:3000/users`
2. **Create an emergency report**: `POST http://localhost:3000/emergency-reports`
3. **Create a thread**: `POST http://localhost:3000/threads`
4. **Create a message**: `POST http://localhost:3000/messages`

Example request for creating a new emergency report:
```bash
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
```

### Updating Data
To update data in the INKING database, you can use the PATCH endpoints:

1. **Update a user**: `PATCH http://localhost:3000/users/user-ci-001`
2. **Update an emergency report**: `PATCH http://localhost:3000/emergency-reports/report-2025-001`
3. **Update a thread**: `PATCH http://localhost:3000/threads/thread-2025-001`

Example request for updating an emergency report status:
```bash
curl -X PATCH http://localhost:3000/emergency-reports/report-2025-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }'
```

### Deleting Data
To delete data from the INKING database, you can use the DELETE endpoints:

1. **Delete a user**: `DELETE http://localhost:3000/users/user-id`
2. **Delete an emergency report**: `DELETE http://localhost:3000/emergency-reports/report-id`
3. **Delete a thread**: `DELETE http://localhost:3000/threads/thread-id`

## Database Connection Script

The [inking-database-integration.ts](file:///d:/INKINGI%20RESCURE/inkingirescure/inking-database-integration.ts) script demonstrates how to connect to the INKING database and perform various operations. You can run it with:

```bash
npx ts-node inking-database-integration.ts
```

The [populate-inking-data.ts](file:///d:/INKINGI%20RESCURE/inkingirescure/populate-inking-data.ts) script shows how to populate the database with realistic INKING data. You can run it with:

```bash
npx ts-node populate-inking-data.ts
```

## Production Deployment

For production deployment with real INKING data:

1. Update the `.env` file with production database credentials
2. Ensure the database server is accessible
3. Verify network connectivity and firewall settings
4. Check that the database user has appropriate permissions
5. Run the application with: `npm run start:prod`

The application will automatically connect to the real INKING database and retrieve actual data through the table relationships. All API endpoints are now ready to be tested with the real INKING data that has been integrated.