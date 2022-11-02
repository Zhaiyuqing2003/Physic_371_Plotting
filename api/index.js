const app = require('express')();

app.get('/api/date', (req, res) => {
    res.send("Hello World");
});

module.exports = app;