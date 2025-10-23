"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: parseInt(configService.get('DB_PORT', '8080'), 10),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', '123'),
    database: configService.get('DB_DATABASE', 'INKINGI'),
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
});
async function integrateWithInkingDatabase() {
    try {
        console.log('=== INKING DATABASE INTEGRATION ===\n');
        console.log('Connecting to INKING database...');
        await dataSource.initialize();
        console.log('Successfully connected to INKING database!\n');
        console.log('Checking database contents...\n');
        const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
        console.log('Available tables in INKING database:');
        tables.forEach((table) => {
            console.log(`- ${table.table_name}`);
        });
        console.log('\n--- DATA RETRIEVAL FROM INKING DATABASE ---\n');
        for (const table of tables) {
            const tableName = table.table_name;
            try {
                const countResult = await dataSource.query(`SELECT COUNT(*) as count FROM ${tableName}`);
                const count = parseInt(countResult[0].count);
                console.log(`${tableName.toUpperCase()}: ${count} records`);
                if (count > 0) {
                    const sampleData = await dataSource.query(`SELECT * FROM ${tableName} LIMIT 3`);
                    console.log(`  Sample records:`);
                    sampleData.forEach((record, index) => {
                        console.log(`    ${index + 1}. ${JSON.stringify(record)}`);
                    });
                }
                else {
                    console.log(`  (Table is empty)`);
                }
                console.log('');
            }
            catch (error) {
                console.log(`  Error retrieving data from ${tableName}: ${error.message}\n`);
            }
        }
        console.log('--- RELATIONAL DATA EXAMPLES ---\n');
        try {
            console.log('Users with their roles:');
            const usersWithRoles = await dataSource.query(`
        SELECT 
          u.id,
          u.name,
          u.phone,
          u.district,
          r.name as role_name,
          r.level as role_level
        FROM users u
        LEFT JOIN roles r ON u.role_id = r.id
        ORDER BY u.id
        LIMIT 10
      `);
            if (usersWithRoles.length > 0) {
                usersWithRoles.forEach((user) => {
                    console.log(`  ${user.name} (${user.id}) - ${user.role_name || 'No role'} - ${user.district}`);
                });
            }
            else {
                console.log('  No users found');
            }
            console.log('');
        }
        catch (error) {
            console.log(`  Error retrieving users with roles: ${error.message}\n`);
        }
        try {
            console.log('Emergency reports with reporter information:');
            const reportsWithReporters = await dataSource.query(`
        SELECT 
          er.id,
          er.type,
          er.severity,
          er.status,
          er.description,
          er.district,
          er.created_at,
          u.name as reported_by_name
        FROM emergency_reports er
        LEFT JOIN users u ON er.reported_by = u.id
        ORDER BY er.created_at DESC
        LIMIT 10
      `);
            if (reportsWithReporters.length > 0) {
                reportsWithReporters.forEach((report) => {
                    console.log(`  ${report.type} (${report.id}) - ${report.status} - Reported by ${report.reported_by_name || 'Unknown'}`);
                });
            }
            else {
                console.log('  No emergency reports found');
            }
            console.log('');
        }
        catch (error) {
            console.log(`  Error retrieving emergency reports: ${error.message}\n`);
        }
        try {
            console.log('Communication threads with report information:');
            const threadsWithReports = await dataSource.query(`
        SELECT 
          t.id,
          t.created_at,
          er.type as report_type,
          er.id as report_id,
          u.name as organizer_name
        FROM threads t
        LEFT JOIN emergency_reports er ON t.report_id = er.id
        LEFT JOIN users u ON t.organizer = u.id
        ORDER BY t.created_at DESC
        LIMIT 10
      `);
            if (threadsWithReports.length > 0) {
                threadsWithReports.forEach((thread) => {
                    console.log(`  Thread ${thread.id} for ${thread.report_type || 'Unknown report'} (${thread.report_id || 'No report'}) - Organized by ${thread.organizer_name || 'Unknown'}`);
                });
            }
            else {
                console.log('  No threads found');
            }
            console.log('');
        }
        catch (error) {
            console.log(`  Error retrieving threads: ${error.message}\n`);
        }
        console.log('--- DATA INSERTION EXAMPLES ---\n');
        console.log('To insert data into the INKING database, use queries like:');
        console.log('');
        console.log('1. Insert a new user:');
        console.log(`   INSERT INTO users (id, name, phone, password, role_id, district)`);
        console.log(`   VALUES ('user-123', 'John Doe', '1234567890', 'hashed_password', 'user', 'District A');`);
        console.log('');
        console.log('2. Insert a new emergency report:');
        console.log(`   INSERT INTO emergency_reports (id, type, severity, description, lat, lng, district, reported_by, status)`);
        console.log(`   VALUES ('report-123', 'Fire', 'High', 'House fire', 12.3456, 98.7654, 'District A', 'user-123', 'Pending');`);
        console.log('');
        console.log('3. Insert a new thread:');
        console.log(`   INSERT INTO threads (id, report_id, organizer)`);
        console.log(`   VALUES ('thread-123', 'report-123', 'user-123');`);
        console.log('');
        console.log('--- DATA UPDATE EXAMPLES ---\n');
        console.log('To update data in the INKING database, use queries like:');
        console.log('');
        console.log('1. Update a user:');
        console.log(`   UPDATE users SET name = 'Jane Doe', phone = '0987654321' WHERE id = 'user-123';`);
        console.log('');
        console.log('2. Update an emergency report status:');
        console.log(`   UPDATE emergency_reports SET status = 'In Progress', updated_at = NOW() WHERE id = 'report-123';`);
        console.log('');
        console.log('--- DATA DELETION EXAMPLES ---\n');
        console.log('To delete data from the INKING database, use queries like:');
        console.log('');
        console.log('1. Delete a specific user:');
        console.log(`   DELETE FROM users WHERE id = 'user-123';`);
        console.log('');
        console.log('2. Delete an emergency report:');
        console.log(`   DELETE FROM emergency_reports WHERE id = 'report-123';`);
        console.log('');
        await dataSource.destroy();
        console.log('=== INKING DATABASE INTEGRATION COMPLETE ===\n');
    }
    catch (error) {
        console.error('Error connecting to INKING database:', error);
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
}
async function connectToRealInkingDatabase() {
    console.log('=== CONNECTING TO REAL INKING DATABASE ===\n');
    const realInkingDataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: 'inking-production-server.com',
        port: 5432,
        username: 'inking_user',
        password: 'secure_password',
        database: 'inking_production',
        entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
        ssl: true,
    });
    try {
        await realInkingDataSource.initialize();
        console.log('Successfully connected to real INKING production database!');
        await realInkingDataSource.destroy();
    }
    catch (error) {
        console.error('Failed to connect to real INKING database:', error.message);
        console.log('\nTo connect to a real INKING database:');
        console.log('1. Update your .env file with real database credentials');
        console.log('2. Ensure the database server is accessible');
        console.log('3. Verify network connectivity and firewall settings');
        console.log('4. Check that the database user has appropriate permissions');
    }
}
integrateWithInkingDatabase().then(() => {
    console.log('For production use, update your .env file with real INKING database credentials.');
    console.log('Then run the application with: npm run start:prod');
});
//# sourceMappingURL=inking-database-integration.js.map