const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT_DIR = __dirname;
const UPLOAD_DIR = path.join(ROOT_DIR, 'uploads', 'books');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

function cleanFileName(name) {
  const ext = path.extname(name).toLowerCase() || '.pdf';
  const base = path
    .basename(name, ext)
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'book';
  return `${Date.now()}-${base}${ext}`;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, cleanFileName(file.originalname))
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isPdf = file.mimetype === 'application/pdf' || path.extname(file.originalname).toLowerCase() === '.pdf';
    if (!isPdf) return cb(new Error('Only PDF files are allowed'));
    cb(null, true);
  }
});

app.use(express.json());
app.use('/uploads', express.static(path.join(ROOT_DIR, 'uploads')));
app.use(express.static(ROOT_DIR));

app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No PDF uploaded' });
  res.json({
    url: `/uploads/books/${req.file.filename}`,
    storedName: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ error: err.message || 'Upload failed' });
});

app.listen(PORT, () => {
  console.log(`BiblioHub running at http://localhost:${PORT}`);
  console.log(`PDF uploads will be saved in: ${UPLOAD_DIR}`);
});
