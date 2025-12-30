import db from '../database/db.js';

export const getThemes = async (req, res) => {
    try {
        const themes = await db('themes').select('*');
        res.json(themes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getImages = async (req, res) => {
    const { theme_id } = req.query;
    try {
        const query = db('images').select('*');
        if (theme_id) query.where({ theme_id });
        const images = await query;
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
