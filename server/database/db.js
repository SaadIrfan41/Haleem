import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'yearly_recap.sqlite'),
    },
    useNullAsDefault: true,
});

export const initDb = async () => {
    // Users Table
    if (!await db.schema.hasTable('users')) {
        await db.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
        });
    }

    // Themes Table - Create or migrate
    if (!await db.schema.hasTable('themes')) {
        await db.schema.createTable('themes', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('primary_color').notNullable();
            table.string('secondary_color').notNullable();
            table.string('accent_color').notNullable();
            table.string('background_color').notNullable();
            table.string('font').notNullable();
        });
    } else {
        // Migrate existing table by adding missing columns
        const hasColorColumns = await db.schema.hasColumn('themes', 'primary_color');
        if (!hasColorColumns) {
            await db.schema.alterTable('themes', (table) => {
                table.string('primary_color').notNullable().defaultTo('#ED0677');
                table.string('secondary_color').notNullable().defaultTo('#FFDF2B');
                table.string('accent_color').notNullable().defaultTo('#20CF5C');
                table.string('background_color').notNullable().defaultTo('#121212');
                table.string('font').notNullable().defaultTo('Outfit');
            });
        }
    }

    // Images Table
    if (!await db.schema.hasTable('images')) {
        await db.schema.createTable('images', (table) => {
            table.increments('id').primary();
            table.integer('theme_id').references('id').inTable('themes');
            table.string('url').notNullable();
            table.integer('fields').notNullable();
        });
    }

    // Recaps Table
    if (!await db.schema.hasTable('recaps')) {
        await db.schema.createTable('recaps', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.integer('author_id').references('id').inTable('users');
            table.integer('theme_id').references('id').inTable('themes');
            table.boolean('public').defaultTo(true);
            table.integer('original_id').references('id').inTable('recaps').nullable();
        });
    }

    // RecapPages Table
    if (!await db.schema.hasTable('pages')) {
        await db.schema.createTable('pages', (table) => {
            table.increments('id').primary();
            table.integer('recap_id').references('id').inTable('recaps').onDelete('CASCADE');
            table.integer('image_id').references('id').inTable('images');
            table.string('text1').nullable();
            table.string('text2').nullable();
            table.string('text3').nullable();
            table.integer('order').notNullable();
        });
    }
};

export default db;
