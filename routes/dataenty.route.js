

import express from 'express'
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Upload_task, get_user_results } from '../controllers/DataEntryCourse.controller.js'

const router = express.Router()
// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads');
        // Create the uploads directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({ storage });
router.route('/')
    .get( get_user_results)
    .post(upload.single('csv_file'), Upload_task)
router.route('/:id')
    // .get(isAuth, get_courses)
    // .get(isAuth,get_user_results )

export default router 