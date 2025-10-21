# Inkingi Rescue - Mega Expanded Database Backend

This is a comprehensive backend implementation for the Inkingi Rescue system using NestJS with TypeScript and PostgreSQL.

## Project Overview

This backend implements a complete emergency response and community engagement system with the following features:

### Core Modules
1. **Users Management** - User registration, authentication, and profile management
2. **Roles & Permissions** - Role-based access control system
3. **Responder Profiles** - Specialized profiles for emergency responders
4. **Emergency Reports** - Reporting and tracking of emergency incidents
5. **Report Status History** - Tracking status changes of emergency reports
6. **Notifications** - Alert system for users and responders
7. **Messaging** - Communication system through threads and messages
8. **Incident Logs** - Detailed logging of incident resolutions
9. **District Services** - Contact information for district-level services
10. **Audit Logs** - System activity tracking for security and compliance
11. **Feedback System** - User feedback on emergency responses
12. **System Settings** - Configuration management
13. **Community Features** - Posts, comments, and likes for community engagement
14. **Events** - Community event management
15. **Resources** - Educational and training resource sharing
16. **Subscriptions** - User subscription to topics and districts

## Database Schema

The system implements the following database tables:

- `users` - User information and authentication
- `roles` - User roles and permissions levels
- `responder_profiles` - Specialized responder information
- `emergency_reports` - Emergency incident reports
- `report_status_history` - Status change history for reports
- `notifications` - System notifications
- `messages` - User-to-user messaging
- `threads` - Conversation threads
- `incident_logs` - Incident resolution details
- `district_services` - District-level service contacts
- `audit_logs` - System activity logs
- `feedback` - User feedback on services
- `system_settings` - Application configuration
- `community_posts` - Community discussion posts
- `post_comments` - Comments on community posts
- `post_likes` - Likes on community posts
- `events` - Community events
- `resources` - Educational resources
- `subscriptions` - User topic subscriptions

## Technology Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT
- **Validation**: class-validator
- **Testing**: Jest

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd inkingirescure

# Install dependencies
npm install
```

## Database Setup

The project includes a Docker Compose file for easy database setup:

```bash
# Start the PostgreSQL database
docker-compose up -d
```

This will start a PostgreSQL database with the following configuration:
- Host: localhost
- Port: 5432
- Username: postgres
- Password: 123
- Database: INKINGI

## Configuration

Create a `.env` file based on `.env.example`:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123
DB_DATABASE=INKINGI

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=3600s

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Build the application
npm run build
```

## API Endpoints

All modules follow RESTful conventions with the following endpoints:

- `POST /{module}` - Create a new record
- `GET /{module}` - Retrieve all records
- `GET /{module}/:id` - Retrieve a specific record
- `PATCH /{module}/:id` - Update a specific record
- `DELETE /{module}/:id` - Delete a specific record

Example modules include:
- `/users`
- `/roles`
- `/responder-profiles`
- `/emergency-reports`
- `/notifications`
- `/messages`
- `/community-posts`
- `/events`
- And more...

## Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Generate test coverage
npm run test:cov
```

## Project Structure

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── roles/
│   ├── dto/
│   ├── entities/
│   ├── roles.controller.ts
│   ├── roles.module.ts
│   └── roles.service.ts
├── responder-profiles/
│   ├── dto/
│   ├── entities/
│   ├── responder-profiles.controller.ts
│   ├── responder-profiles.module.ts
│   └── responder-profiles.service.ts
└── ... (all other modules)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. All rights reserved.