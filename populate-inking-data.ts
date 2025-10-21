/**
 * INKING Data Population Script
 * 
 * This script demonstrates how to populate the INKING database with real data
 * that would come from the actual INKING system.
 */

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

async function populateInkingData() {
  try {
    console.log('=== INKING DATA POPULATION ===\n');
    
    console.log('Connecting to INKING database...');
    await dataSource.initialize();
    console.log('Successfully connected to INKING database!\n');
    
    // First, populate roles (these would come from the real INKING system)
    console.log('--- POPULATING ROLES ---');
    const roles = [
      { id: 'admin', name: 'Administrator', level: 1 },
      { id: 'coordinator', name: 'Coordinator', level: 2 },
      { id: 'responder', name: 'Responder', level: 3 },
      { id: 'volunteer', name: 'Volunteer', level: 4 },
      { id: 'citizen', name: 'Citizen', level: 5 }
    ];
    
    for (const role of roles) {
      await dataSource.query(`
        INSERT INTO roles (id, name, level)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          level = EXCLUDED.level
      `, [role.id, role.name, role.level]);
    }
    console.log('Roles populated successfully!\n');
    
    // Populate users (these would come from the real INKING system)
    console.log('--- POPULATING USERS ---');
    const users = [
      {
        id: 'user-co-001',
        name: 'Alice Coordinator',
        phone: '1234567890',
        email: 'alice.coordinator@inkingi.rw',
        password: '$2b$10$hashedpasswordexample', // In real system, this would be properly hashed
        role_id: 'coordinator',
        district: 'Kigali City',
        lat: null,
        lng: null,
        availability: 'online'
      },
      {
        id: 'user-re-001',
        name: 'Bob Responder',
        phone: '0987654321',
        email: 'bob.responder@inkingi.rw',
        password: '$2b$10$hashedpasswordexample',
        role_id: 'responder',
        district: 'Kigali City',
        lat: -1.9441,
        lng: 30.0619,
        availability: 'available'
      },
      {
        id: 'user-re-002',
        name: 'Carol Responder',
        phone: '1122334455',
        email: 'carol.responder@inkingi.rw',
        password: '$2b$10$hashedpasswordexample',
        role_id: 'responder',
        district: 'Northern Province',
        lat: -1.6333,
        lng: 30.0666,
        availability: 'busy'
      },
      {
        id: 'user-ci-001',
        name: 'David Citizen',
        phone: '5566778899',
        email: 'david.citizen@gmail.com',
        password: '$2b$10$hashedpasswordexample',
        role_id: 'citizen',
        district: 'Kigali City',
        lat: -1.9533,
        lng: 30.0644,
        availability: 'offline'
      }
    ];
    
    for (const user of users) {
      await dataSource.query(`
        INSERT INTO users (id, name, phone, email, password, role_id, district, lat, lng, availability)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          email = EXCLUDED.email,
          password = EXCLUDED.password,
          role_id = EXCLUDED.role_id,
          district = EXCLUDED.district,
          lat = EXCLUDED.lat,
          lng = EXCLUDED.lng,
          availability = EXCLUDED.availability
      `, [
        user.id, user.name, user.phone, user.email, user.password,
        user.role_id, user.district, user.lat, user.lng, user.availability
      ]);
    }
    console.log('Users populated successfully!\n');
    
    // Populate emergency reports (these would come from the real INKING system)
    console.log('--- POPULATING EMERGENCY REPORTS ---');
    const reports = [
      {
        id: 'report-2025-001',
        type: 'Medical Emergency',
        severity: 'High',
        description: 'Car accident with multiple injuries near Kigali Convention Center',
        media: null,
        lat: -1.9536,
        lng: 30.0643,
        district: 'Kigali City',
        reported_by: 'user-ci-001',
        status: 'Pending',
        assigned_to: null
      },
      {
        id: 'report-2025-002',
        type: 'Fire',
        severity: 'Medium',
        description: 'House fire in Nyamirambo residential area',
        media: ['https://inkingi.rw/media/fire1.jpg', 'https://inkingi.rw/media/fire2.jpg'],
        lat: -1.9500,
        lng: 30.0500,
        district: 'Kigali City',
        reported_by: 'user-ci-001',
        status: 'In Progress',
        assigned_to: ['user-re-001']
      },
      {
        id: 'report-2025-003',
        type: 'Flood',
        severity: 'Low',
        description: 'Minor flooding on KK15 road after heavy rains',
        media: null,
        lat: -1.9400,
        lng: 30.0700,
        district: 'Kigali City',
        reported_by: 'user-co-001',
        status: 'Resolved',
        assigned_to: ['user-re-002']
      }
    ];
    
    for (const report of reports) {
      await dataSource.query(`
        INSERT INTO emergency_reports 
        (id, type, severity, description, media, lat, lng, district, reported_by, status, assigned_to)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET
          type = EXCLUDED.type,
          severity = EXCLUDED.severity,
          description = EXCLUDED.description,
          media = EXCLUDED.media,
          lat = EXCLUDED.lat,
          lng = EXCLUDED.lng,
          district = EXCLUDED.district,
          reported_by = EXCLUDED.reported_by,
          status = EXCLUDED.status,
          assigned_to = EXCLUDED.assigned_to
      `, [
        report.id, report.type, report.severity, report.description, report.media,
        report.lat, report.lng, report.district, report.reported_by, report.status, report.assigned_to
      ]);
    }
    console.log('Emergency reports populated successfully!\n');
    
    // Populate threads for the reports
    console.log('--- POPULATING THREADS ---');
    const threads = [
      {
        id: 'thread-2025-001',
        report_id: 'report-2025-001',
        organizer: 'user-co-001'
      },
      {
        id: 'thread-2025-002',
        report_id: 'report-2025-002',
        organizer: 'user-co-001'
      }
    ];
    
    for (const thread of threads) {
      await dataSource.query(`
        INSERT INTO threads (id, report_id, organizer)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO UPDATE SET
          report_id = EXCLUDED.report_id,
          organizer = EXCLUDED.organizer
      `, [thread.id, thread.report_id, thread.organizer]);
    }
    console.log('Threads populated successfully!\n');
    
    // Populate messages in the threads
    console.log('--- POPULATING MESSAGES ---');
    const messages = [
      {
        id: 'msg-2025-001',
        thread_id: 'thread-2025-001',
        sender_id: 'user-co-001',
        content: 'Responders dispatched to the accident site. ETA 10 minutes.',
        media: null
      },
      {
        id: 'msg-2025-002',
        thread_id: 'thread-2025-001',
        sender_id: 'user-re-001',
        content: 'Arrived at the scene. Providing first aid to injured parties.',
        media: ['https://inkingi.rw/media/aid1.jpg']
      },
      {
        id: 'msg-2025-003',
        thread_id: 'thread-2025-002',
        sender_id: 'user-re-001',
        content: 'Fire department notified. Proceeding to the location now.',
        media: null
      }
    ];
    
    for (const message of messages) {
      await dataSource.query(`
        INSERT INTO messages (id, thread_id, sender_id, content, media)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          thread_id = EXCLUDED.thread_id,
          sender_id = EXCLUDED.sender_id,
          content = EXCLUDED.content,
          media = EXCLUDED.media
      `, [message.id, message.thread_id, message.sender_id, message.content, message.media]);
    }
    console.log('Messages populated successfully!\n');
    
    // Show populated data
    console.log('--- VERIFICATION ---');
    console.log('Roles:');
    const roleResults = await dataSource.query('SELECT * FROM roles ORDER BY level');
    roleResults.forEach((role: any) => {
      console.log(`  ${role.name} (${role.id}) - Level ${role.level}`);
    });
    
    console.log('\nUsers:');
    const userResults = await dataSource.query('SELECT id, name, role_id, district, availability FROM users ORDER BY id');
    userResults.forEach((user: any) => {
      console.log(`  ${user.name} (${user.id}) - ${user.role_id} in ${user.district} (${user.availability})`);
    });
    
    console.log('\nEmergency Reports:');
    const reportResults = await dataSource.query(`
      SELECT id, type, severity, status, district, reported_by 
      FROM emergency_reports 
      ORDER BY created_at
    `);
    reportResults.forEach((report: any) => {
      console.log(`  ${report.type} (${report.id}) - ${report.severity}/${report.status} in ${report.district} by ${report.reported_by}`);
    });
    
    console.log('\nThreads:');
    const threadResults = await dataSource.query(`
      SELECT t.id, t.report_id, er.type as report_type, u.name as organizer_name
      FROM threads t
      JOIN emergency_reports er ON t.report_id = er.id
      JOIN users u ON t.organizer = u.id
      ORDER BY t.created_at
    `);
    threadResults.forEach((thread: any) => {
      console.log(`  Thread ${thread.id} for ${thread.report_type} (${thread.report_id}) organized by ${thread.organizer_name}`);
    });
    
    console.log('\nMessages:');
    const messageResults = await dataSource.query(`
      SELECT m.id, m.content, t.id as thread_id, u.name as sender_name
      FROM messages m
      JOIN threads t ON m.thread_id = t.id
      JOIN users u ON m.sender_id = u.id
      ORDER BY m.sent_at
    `);
    messageResults.forEach((message: any) => {
      console.log(`  Message ${message.id} in thread ${message.thread_id} from ${message.sender_name}: "${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}"`);
    });
    
    await dataSource.destroy();
    console.log('\n=== INKING DATA POPULATION COMPLETE ===\n');
    console.log('The database is now populated with realistic INKING data.');
    console.log('This represents the type of data that would be integrated from the real INKING system.');
    
  } catch (error) {
    console.error('Error populating INKING data:', error);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

// Run the data population
populateInkingData();