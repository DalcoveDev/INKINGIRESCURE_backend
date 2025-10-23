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

async function testUsersFromDatabase() {
  try {
    console.log('Connecting to database...');
    await dataSource.initialize();
    console.log('Database connection successful!');
    
    // Query users directly from database
    console.log('\n--- Users from Database ---');
    const users = await dataSource.query(`
      SELECT id, name, phone, email, role_id, district, availability
      FROM users
      ORDER BY id
    `);
    
    console.log('Found', users.length, 'users:');
    users.forEach((user: any, index: number) => {
      console.log(`${index + 1}. ${user.name} (${user.id}) - ${user.role_id} in ${user.district}`);
    });
    
    await dataSource.destroy();
  } catch (error) {
    console.error('Error:', error);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

testUsersFromDatabase();