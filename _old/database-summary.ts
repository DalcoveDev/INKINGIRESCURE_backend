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

async function generateSummary() {
  try {
    console.log('Connecting to database...');
    await dataSource.initialize();
    console.log('Database connection successful!\n');
    
    // Get count of records in each table
    const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('=== DATABASE SUMMARY REPORT ===\n');
    
    for (const table of tables) {
      const tableName = table.table_name;
      try {
        const countResult = await dataSource.query(`SELECT COUNT(*) as count FROM ${tableName}`);
        const count = countResult[0].count;
        console.log(`${tableName}: ${count} records`);
        
        // Show sample data for non-empty tables
        if (count > 0 && count <= 10) {
          console.log(`  Sample data:`);
          const sampleData = await dataSource.query(`SELECT * FROM ${tableName} LIMIT 3`);
          sampleData.forEach((row: any, index: number) => {
            console.log(`    ${index + 1}. ${JSON.stringify(row)}`);
          });
        } else if (count > 10) {
          console.log(`  (Showing first 3 of ${count} records)`);
          const sampleData = await dataSource.query(`SELECT * FROM ${tableName} LIMIT 3`);
          sampleData.forEach((row: any, index: number) => {
            console.log(`    ${index + 1}. ${JSON.stringify(row)}`);
          });
        }
        console.log('');
      } catch (error) {
        console.log(`${tableName}: Error retrieving data - ${error}`);
      }
    }
    
    // Generate relationships report
    console.log('=== RELATIONSHIPS SUMMARY ===\n');
    
    console.log('Users and their roles:');
    const usersWithRoles = await dataSource.query(`
      SELECT u.id, u.name, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      ORDER BY u.id
    `);
    usersWithRoles.forEach((user: any) => {
      console.log(`  ${user.name} (${user.id}) - ${user.role_name}`);
    });
    
    console.log('\nEmergency reports and their reporters:');
    const reportsWithReporters = await dataSource.query(`
      SELECT er.id, er.type, er.status, u.name as reported_by
      FROM emergency_reports er
      JOIN users u ON er.reported_by = u.id
      ORDER BY er.id
    `);
    reportsWithReporters.forEach((report: any) => {
      console.log(`  ${report.type} (${report.id}) - ${report.status} - Reported by ${report.reported_by}`);
    });
    
    console.log('\nThreads and their reports:');
    const threadsWithReports = await dataSource.query(`
      SELECT t.id, er.type as report_type, u.name as organizer
      FROM threads t
      JOIN emergency_reports er ON t.report_id = er.id
      JOIN users u ON t.organizer = u.id
      ORDER BY t.id
    `);
    threadsWithReports.forEach((thread: any) => {
      console.log(`  Thread ${thread.id} for ${thread.report_type} - Organized by ${thread.organizer}`);
    });
    
    console.log('\nMessages in threads:');
    const messagesInThreads = await dataSource.query(`
      SELECT m.id, m.content, t.id as thread_id, u.name as sender
      FROM messages m
      JOIN threads t ON m.thread_id = t.id
      JOIN users u ON m.sender_id = u.id
      ORDER BY m.sent_at
    `);
    messagesInThreads.forEach((message: any) => {
      console.log(`  Message ${message.id} in thread ${message.thread_id} - "${message.content}" (from ${message.sender})`);
    });
    
    await dataSource.destroy();
    console.log('\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

generateSummary();