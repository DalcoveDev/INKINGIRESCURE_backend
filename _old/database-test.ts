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

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    await dataSource.initialize();
    console.log('Database connection successful!');
    
    // Get list of tables
    const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\nAvailable tables:');
    tables.forEach((table: any) => {
      console.log(`- ${table.table_name}`);
    });
    
    // Try to get data from a few tables if they exist
    const tableNames = tables.map((t: any) => t.table_name);
    
    // Check for users table
    if (tableNames.includes('users')) {
      console.log('\n--- Users Table ---');
      const users = await dataSource.query('SELECT * FROM users LIMIT 5');
      console.log(users);
    }
    
    // Check for roles table
    if (tableNames.includes('roles')) {
      console.log('\n--- Roles Table ---');
      const roles = await dataSource.query('SELECT * FROM roles LIMIT 5');
      console.log(roles);
    }
    
    // Check for emergency_reports table
    if (tableNames.includes('emergency_reports')) {
      console.log('\n--- Emergency Reports Table ---');
      const reports = await dataSource.query('SELECT * FROM emergency_reports LIMIT 5');
      console.log(reports);
    }
    
    await dataSource.destroy();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();