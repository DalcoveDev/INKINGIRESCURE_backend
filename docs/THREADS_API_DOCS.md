# Threads API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Create a Thread
```
POST /threads
```

#### Request Body
```json
{
  "id": "string (required)",
  "report_id": "string (required)",
  "organizer": "string (required)"
}
```

#### Example Request
```bash
curl -X POST http://localhost:3000/threads \
  -H "Content-Type: application/json" \
  -d '{
    "id": "thread-001",
    "report_id": "report-001",
    "organizer": "user-001"
  }'
```

#### Response
```json
{
  "id": "thread-001",
  "report_id": "report-001",
  "organizer": "user-001",
  "created_at": "2023-05-15T10:30:00.000Z"
}
```

### 2. Get All Threads
```
GET /threads
```

#### Example Request
```bash
curl -X GET http://localhost:3000/threads
```

#### Response
```json
[
  {
    "id": "thread-001",
    "report_id": "report-001",
    "organizer": "user-001",
    "created_at": "2023-05-15T10:30:00.000Z"
  },
  {
    "id": "thread-002",
    "report_id": "report-002",
    "organizer": "user-002",
    "created_at": "2023-05-16T14:45:00.000Z"
  }
]
```

### 3. Get a Specific Thread
```
GET /threads/:id
```

#### Example Request
```bash
curl -X GET http://localhost:3000/threads/thread-001
```

#### Response
```json
{
  "id": "thread-001",
  "report_id": "report-001",
  "organizer": "user-001",
  "created_at": "2023-05-15T10:30:00.000Z"
}
```

### 4. Update a Thread
```
PATCH /threads/:id
```

#### Request Body
```json
{
  "report_id": "string (optional)",
  "organizer": "string (optional)"
}
```

#### Example Request
```bash
curl -X PATCH http://localhost:3000/threads/thread-001 \
  -H "Content-Type: application/json" \
  -d '{
    "organizer": "user-003"
  }'
```

#### Response
```json
{
  "generatedMaps": [],
  "raw": [],
  "affected": 1
}
```

### 5. Delete a Thread
```
DELETE /threads/:id
```

#### Example Request
```bash
curl -X DELETE http://localhost:3000/threads/thread-001
```

#### Response
```json
{
  "generatedMaps": [],
  "raw": [],
  "affected": 1
}
```

## Test Data Examples

### Sample Thread IDs
- `thread-001`
- `thread-002`
- `thread-abc-123`

### Sample Report IDs (must correspond to existing reports)
- `report-001`
- `report-002`
- `report-xyz-789`

### Sample User IDs (must correspond to existing users)
- `user-001`
- `user-002`
- `user-def-456`

## Error Responses

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

## Notes
1. All thread IDs must be unique
2. The `report_id` must correspond to an existing emergency report
3. The `organizer` must correspond to an existing user
4. The `created_at` field is automatically set when creating a thread
5. The `messages` relationship is managed separately through the messages API