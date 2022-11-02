const app = require('express')();

app.get('/api/process_file', (req, res) => {
    res.send("Hello World");
});

module.exports = app;