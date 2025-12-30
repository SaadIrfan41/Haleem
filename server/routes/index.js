import express from 'express';
import authRoutes from './authRoutes.js';
import themeRoutes from './themeRoutes.js';
import recapRoutes from './recapRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/themes', themeRoutes);
router.use('/recaps', recapRoutes);

// Keep the old paths working if needed, or redirect them
router.get('/images', (req, res) => res.redirect('/api/themes/images' + (req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '')));

export default router;
