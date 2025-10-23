import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// Database configuration
const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: parseInt(configService.get<string>('DB_PORT', '8080'), 10),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', '123'),
  database: configService.get<string>('DB_DATABASE', 'INKINGI'),
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
});

async function populateAndQuery() {
  try {
    console.log('Attempting to connect to database...');
    await dataSource.initialize();
    console.log('Database connection successful!');
    
    // Insert sample data
    console.log('\n--- Inserting Sample Data ---');
    
    // Insert roles
    await dataSource.query(`
      INSERT INTO roles (id, name, level) VALUES 
      ('admin', 'Administrator', 1),
      ('user', 'User', 2),
      ('responder', 'Responder', 3)
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('Inserted roles');
    
    // Insert users
    await dataSource.query(`
      INSERT INTO users (id, name, phone, password, role_id, district) VALUES 
      ('user-001', 'John Admin', '1234567890', 'hashed_password', 'admin', 'District A'),
      ('user-002', 'Jane User', '0987654321', 'hashed_password', 'user', 'District B'),
      ('user-003', 'Bob Responder', '1122334455', 'hashed_password', 'responder', 'District A')
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('Inserted users');
    
    // Insert emergency reports
    await dataSource.query(`
      INSERT INTO emergency_reports (id, type, severity, description, lat, lng, district, reported_by, status) VALUES 
      ('report-001', 'Fire', 'High', 'House fire in District A', 12.3456, 98.7654, 'District A', 'user-001', 'Pending'),
      ('report-002', 'Medical', 'Medium', 'Accident on Highway 1', 12.3457, 98.7655, 'District B', 'user-002', 'In Progress'),
      ('report-003', 'Flood', 'Low', 'Minor flooding in area', 12.3458, 98.7656, 'District A', 'user-003', 'Resolved')
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('Inserted emergency reports');
    
    // Insert threads
    await dataSource.query(`
      INSERT INTO threads (id, report_id, organizer) VALUES 
      ('thread-001', 'report-001', 'user-001'),
      ('thread-002', 'report-002', 'user-002')
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('Inserted threads');
    
    // Insert messages
    await dataSource.query(`
      INSERT INTO messages (id, thread_id, sender_id, content) VALUES 
      ('msg-001', 'thread-001', 'user-001', 'Fire department has been notified'),
      ('msg-002', 'thread-001', 'user-003', 'I am on my way to the location'),
      ('msg-003', 'thread-002', 'user-002', 'Ambulance dispatched')
      ON CONFLICT (id) DO NOTHING
    `);
    console.log('Inserted messages');
    
    // Query and display data
    console.log('\n--- Retrieving Data ---');
    
    // Get users with roles
    console.log('\n--- Users with Roles ---');
    const usersWithRoles = await dataSource.query(`
      SELECT u.id, u.name, u.phone, u.district, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      ORDER BY u.id
    `);
    console.log(usersWithRoles);
    
    // Get emergency reports with reporter info
    console.log('\n--- Emergency Reports ---');
    const reports = await dataSource.query(`
      SELECT er.id, er.type, er.severity, er.description, er.status, er.district, u.name as reported_by_name
      FROM emergency_reports er
      JOIN users u ON er.reported_by = u.id
      ORDER BY er.id
    `);
    console.log(reports);
    
    // Get threads with report info
    console.log('\n--- Threads ---');
    const threads = await dataSource.query(`
      SELECT t.id, t.report_id, er.type as report_type, u.name as organizer_name
      FROM threads t
      JOIN emergency_reports er ON t.report_id = er.id
      JOIN users u ON t.organizer = u.id
      ORDER BY t.id
    `);
    console.log(threads);
    
    // Get messages with thread and sender info
    console.log('\n--- Messages ---');
    const messages = await dataSource.query(`
      SELECT m.id, m.content, m.sent_at, t.id as thread_id, u.name as sender_name
      FROM messages m
      JOIN threads t ON m.thread_id = t.id
      JOIN users u ON m.sender_id = u.id
      ORDER BY m.sent_at
    `);
    console.log(messages);
    
    await dataSource.destroy();
    console.log('\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

populateAndQuery();