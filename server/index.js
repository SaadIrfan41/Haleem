import app from './app.js';
import db, { initDb } from './database/db.js';
import { seedData } from './database/seeds.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Initialize DB Schema
        await initDb();

        // Run Seeding
        await seedData();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
