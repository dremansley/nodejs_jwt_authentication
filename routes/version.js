const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const versionNumber = '1.0.0';
    res.json({ version: versionNumber });
});

module.exports = app;
