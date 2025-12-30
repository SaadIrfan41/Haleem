import db from '../database/db.js';

export const getPublicRecaps = async (req, res) => {
    try {
        console.log('GET /recaps - User:', req.user ? req.user.username : 'Guest');

        let query = db('recaps')
            .join('users', 'recaps.author_id', '=', 'users.id')
            .join('themes', 'recaps.theme_id', '=', 'themes.id');

        if (req.isAuthenticated()) {
            console.log('User is authenticated, fetching public + own recaps');
            query = query.where(function () {
                this.where('recaps.public', 1) // SQLite uses 1 for true
                    .orWhere('recaps.author_id', req.user.id);
            });
        } else {
            console.log('User is guest, fetching only public recaps');
            query = query.where('recaps.public', 1);
        }

        const recaps = await query.select(
            'recaps.*',
            'users.username as author',
            'themes.name as theme_name'
        );

        console.log(`Found ${recaps.length} recaps`);

        for (let recap of recaps) {
            recap.pages = await db('pages')
                .join('images', 'pages.image_id', '=', 'images.id')
                .where('recap_id', recap.id)
                .orderBy('order', 'asc')
                .select('pages.*', 'images.url as image');
        }

        res.json(recaps);
    } catch (err) {
        console.error('Error getting recaps:', err);
        res.status(500).json({ error: err.message });
    }
};

export const createRecap = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Auth required' });

    console.log('CREATE /recaps - Body:', JSON.stringify(req.body, null, 2));
    const { title, theme_id, public: isPublic, pages, original_id } = req.body;

    try {
        // SQLite insert returns [id]
        const [recapId] = await db('recaps').insert({
            title,
            theme_id,
            author_id: req.user.id,
            public: isPublic ? 1 : 0, // Ensure integer for SQLite
            original_id: original_id || null
        });

        console.log('Created recap with ID:', recapId);

        if (pages && pages.length > 0) {
            console.log(`Inserting ${pages.length} pages for recap ${recapId}`);
            const pagesToInsert = pages.map((p, idx) => ({
                recap_id: recapId,
                image_id: p.image_id,
                text1: p.text1,
                text2: p.text2,
                text3: p.text3,
                order: idx
            }));
            await db('pages').insert(pagesToInsert);
            console.log('Pages inserted successfully');
        } else {
            console.warn('No pages provided for recap creation');
        }

        res.status(201).json({ id: recapId, message: 'Recap created' });
    } catch (err) {
        console.error('Error creating recap:', err);
        res.status(500).json({ error: err.message });
    }
};

export const deleteRecap = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Auth required' });

    const { id } = req.params;
    try {
        const recap = await db('recaps').where({ id }).first();
        if (!recap) return res.status(404).json({ error: 'Not found' });
        if (recap.author_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

        await db('recaps').where({ id }).del();
        res.json({ message: 'Recap deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
