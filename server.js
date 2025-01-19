const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Pastikan ini ada
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware untuk melayani file statis dari folder my-web-app
app.use(express.static(path.join(__dirname, '../my-web-app')));

// Rute untuk menangani permintaan GET ke root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../my-web-app/index.html'));
});

// Endpoint untuk menyimpan nama
app.post('/send-email', (req, res) => {
    const { name } = req.body;

    console.log(`Received name: ${name}`); // Log nama yang diterima

    // Simpan nama ke file
    fs.appendFile(path.join(__dirname, 'names.txt'), name + '\n', (err) => {
        if (err) {
            console.error('Error saving name:', err);
            return res.status(500).json({ message: 'Error saving name' });
        }
        console.log(`Name saved to ${path.join(__dirname, 'names.txt')}`); // Log lokasi file
        res.json({ message: 'Name saved successfully' });
    });
});
// Endpoint untuk mengambil nama
app.get('/get-names', (req, res) => {
    fs.readFile(path.join(__dirname, 'names.txt'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading names' });
        }
        const names = data.split('\n').filter(name => name); // Memisahkan nama dan menghapus yang kosong
        res.json(names);
    });
});
// Endpoint untuk menghapus semua nama
app.delete('/reset-names', (req, res) => {
    console.log("Request to reset names received"); // Log untuk debugging
    fs.writeFile(path.join(__dirname, 'names.txt'), '', (err) => {
        if (err) {
            console.error('Error resetting names:', err); // Log kesalahan
            return res.status(500).json({ message: 'Error resetting names' });
        }
        console.log("Names reset successfully"); // Log jika berhasil
        res.json({ message: 'Names reset successfully' });
    });
});
// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});