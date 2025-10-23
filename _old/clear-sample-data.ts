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

async function clearSampleData() {
  try {
    console.log('Attempting to connect to database...');
    await dataSource.initialize();
    console.log('Database connection successful!');
    
    // Clear data from all tables in the correct order to avoid foreign key constraints
    console.log('\n--- Clearing Sample Data ---');
    
    // Delete from tables with foreign key dependencies first
    await dataSource.query('DELETE FROM messages');
    console.log('Cleared messages');
    
    await dataSource.query('DELETE FROM threads');
    console.log('Cleared threads');
    
    await dataSource.query('DELETE FROM report_status_history');
    console.log('Cleared report_status_history');
    
    await dataSource.query('DELETE FROM incident_logs');
    console.log('Cleared incident_logs');
    
    await dataSource.query('DELETE FROM notifications');
    console.log('Cleared notifications');
    
    await dataSource.query('DELETE FROM post_comments');
    console.log('Cleared post_comments');
    
    await dataSource.query('DELETE FROM post_likes');
    console.log('Cleared post_likes');
    
    await dataSource.query('DELETE FROM community_posts');
    console.log('Cleared community_posts');
    
    await dataSource.query('DELETE FROM feedback');
    console.log('Cleared feedback');
    
    await dataSource.query('DELETE FROM audit_logs');
    console.log('Cleared audit_logs');
    
    await dataSource.query('DELETE FROM responder_profiles');
    console.log('Cleared responder_profiles');
    
    await dataSource.query('DELETE FROM subscriptions');
    console.log('Cleared subscriptions');
    
    await dataSource.query('DELETE FROM resources');
    console.log('Cleared resources');
    
    await dataSource.query('DELETE FROM events');
    console.log('Cleared events');
    
    await dataSource.query('DELETE FROM district_services');
    console.log('Cleared district_services');
    
    await dataSource.query('DELETE FROM system_settings');
    console.log('Cleared system_settings');
    
    // Delete from main tables
    await dataSource.query('DELETE FROM emergency_reports');
    console.log('Cleared emergency_reports');
    
    await dataSource.query('DELETE FROM users');
    console.log('Cleared users');
    
    await dataSource.query('DELETE FROM roles');
    console.log('Cleared roles');
    
    console.log('\n--- Verification ---');
    // Verify tables are empty
    const tables = [
      'users', 'roles', 'emergency_reports', 'threads', 'messages',
      'community_posts', 'district_services', 'events', 'feedback',
      'incident_logs', 'notifications', 'post_comments', 'post_likes',
      'report_status_history', 'resources', 'responder_profiles',
      'subscriptions', 'system_settings'
    ];
    
    for (const table of tables) {
      const countResult = await dataSource.query(`SELECT COUNT(*) as count FROM ${table}`);
      const count = parseInt(countResult[0].count);
      console.log(`${table}: ${count} records`);
    }
    
    await dataSource.destroy();
    console.log('\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

clearSampleData();