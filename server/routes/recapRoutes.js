import express from 'express';
import * as recapController from '../controllers/recapController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', recapController.getPublicRecaps);
router.post('/', isAuthenticated, recapController.createRecap);
router.delete('/:id', isAuthenticated, recapController.deleteRecap);

export default router;
