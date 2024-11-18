import express from 'express';
import { createRecording, getRecordings } from '../controllers/recording.js';

const router = express.Router();


router.get('/', getRecordings);
router.post('/', createRecording);

export default router;
