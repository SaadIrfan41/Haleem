import express from 'express';
import * as themeController from '../controllers/themeController.js';

const router = express.Router();

router.get('/', themeController.getThemes);
router.get('/images', themeController.getImages);

export default router;
