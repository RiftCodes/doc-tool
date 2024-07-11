import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../../migrations/schema'
dotenv.config({ path: '.env' });
import { migrate } from 'drizzle-orm/postgres-js/migrator'; // Correct import for PostgreSQL migration



if (!process.env.DATABASE_URL) {
    console.log('No database URL');
    process.exit(1); // Exit if there is no DATABASE_URL
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });

const migrateDb = async () => {
    try {
        console.log('Migrating database');
        await migrate(db, { migrationsFolder: 'migrations' }); // Ensure migrationsFolder path is correct
        console.log('Successfully migrated');
    } catch (error) {
        console.error('Error migrating database', error); // Print the error for better debugging
    }
};

migrateDb();

export default db;
