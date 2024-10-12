import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { PdfReader } from 'pdfreader';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/resume');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
    }
};

export const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

export const readPdfContent = (filePath) => {
    return new Promise((resolve, reject) => {
        let content = '';
        new PdfReader().parseFileItems(filePath, (err, item) => {
            if (err) reject(err);
            else if (!item) resolve(content);
            else if (item.text) content += item.text + ' ';
        });
    });
};

export const handleFileUpload = (req, res, next) => {
    upload.single('resume')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLowerCase();

        if (fileExt === '.pdf') {
            try {
                const pdfContent = await readPdfContent(filePath);
                req.fileContent = pdfContent;
            } catch (error) {
                console.error('Error processing PDF:', error);
            }
        }

        next();
    });
};