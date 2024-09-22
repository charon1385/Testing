const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// می‌توانید پوشه‌ای برای فایل‌های ایجاد شده تعیین کنید
const outputDir = path.join(__dirname, 'output');

// ایجاد دایرکتوری 'output' در صورت عدم وجود
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

app.use(express.static('public'));

app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); // جایگزینی : با -
    const fileName = `output/file_${timestamp}.txt`;
    
    fs.writeFile(fileName, `این یک فایل جدید است: ${timestamp}`, (err) => {
        if (err) {
            return res.status(500).json({ message: 'خطا در ساخت فایل' });
        }
        res.json({ message: 'فایل جدید ساخته شد' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
