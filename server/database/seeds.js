import bcrypt from 'bcrypt';
import db from './db.js';

export const seedData = async () => {
    const usersCount = await db('users').count('id as count').first();
    if (usersCount.count === 0) {
        console.log('Starting database seed...');

        const hashedPwd = await bcrypt.hash('password123', 10);
        await db('users').insert([
            { username: 'hal_dev', password: hashedPwd },
            { username: 'coffee_lover', password: hashedPwd },
            { username: 'retro_fan', password: hashedPwd }
        ]);

        // Insert themes one by one to avoid ambiguity with returned IDs in SQLite
        await db('themes').insert({
            name: 'Neon Night',
            primary_color: '#ED0677',
            secondary_color: '#FFDF2B',
            accent_color: '#20CF5C',
            background_color: '#121212',
            font: 'Outfit'
        });
        await db('themes').insert({
            name: 'Cyberpunk',
            primary_color: '#6C4AB6',
            secondary_color: '#FF8B13',
            accent_color: '#1A4AD2',
            background_color: '#0D0D0D',
            font: 'Inter'
        });

        const themes = await db('themes').select('*');
        const neonId = themes.find(t => t.name === 'Neon Night').id;
        const cyberId = themes.find(t => t.name === 'Cyberpunk').id;

        const neonImages = [
            // 4 images with 1 field
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1548317202-26d94742e8d8?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            // 4 images with 2 fields
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            // 4 images with 3 fields
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80', fields: 3 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=1200&q=80', fields: 3 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?auto=format&fit=crop&w=1200&q=80', fields: 3 },
            { theme_id: neonId, url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80', fields: 3 }
        ];

        const cyberImages = [
            // 4 images with 1 field
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?auto=format&fit=crop&w=1200&q=80', fields: 1 },
            // 4 images with 2 fields
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1575365717666-1a84be3fd104?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80', fields: 2 },
            // 4 images with 3 fields
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1533972751724-9135a8410a4c?auto=format&fit=crop&w=1200&q=80', fields: 3 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1607419726991-5fc7e74cda67?auto=format&fit=crop&w=1200&q=80', fields: 3 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80', fields: 3 },
            { theme_id: cyberId, url: 'https://images.unsplash.com/photo-1520032484190-e5ef81d87978?auto=format&fit=crop&w=1200&q=80', fields: 3 }
        ];

        for (const img of [...neonImages, ...cyberImages]) {
            await db('images').insert(img);
        }

        const users = await db('users').select('id', 'username');
        const halId = users.find(u => u.username === 'hal_dev').id;
        const coffeeId = users.find(u => u.username === 'coffee_lover').id;
        const retroId = users.find(u => u.username === 'retro_fan').id;

        const allImages = await db('images').select('id', 'theme_id', 'fields');
        const neonImgs = allImages.filter(i => i.theme_id === neonId);
        const cyberImgs = allImages.filter(i => i.theme_id === cyberId);

        // Helper to create a recap with pages
        const createRecap = async (title, authorId, themeId, isPublic = true, originalId = null) => {
            const [recapId] = await db('recaps').insert({
                title,
                author_id: authorId,
                theme_id: themeId,
                public: isPublic,
                original_id: originalId
            });

            const themeSet = themeId === neonId ? neonImgs : cyberImgs;
            const pageCount = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < pageCount; i++) {
                const img = themeSet[Math.floor(Math.random() * themeSet.length)];
                await db('pages').insert({
                    recap_id: recapId,
                    image_id: img.id,
                    text1: `Memorable Moment ${i + 1}`,
                    text2: img.fields > 1 ? `Subtext for page ${i + 1}` : null,
                    text3: img.fields > 2 ? `Extra detail here!` : null,
                    order: i
                });
            }
            return recapId;
        };

        const recap1 = await createRecap('My Neon Year', halId, neonId);
        await createRecap('Neon Reflections', halId, neonId);
        await createRecap('Cyber Diary', halId, cyberId);
        await createRecap('Code & Vibes', coffeeId, cyberId);
        await createRecap('Coffee & Cyber', coffeeId, cyberId);
        await createRecap('Hal\'s Neon Remix', coffeeId, neonId, true, recap1);
        await createRecap('Retro Rewind', retroId, neonId);
        await createRecap('Synthwave Dreams', retroId, neonId);
        await createRecap('Grid Runner 2024', retroId, cyberId);

        console.log('Database seeded successfully.');
    }
};
