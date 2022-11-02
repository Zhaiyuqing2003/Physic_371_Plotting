const app = require('express')();

app.get('/api/date', (req, res) => {
    res.send({ date: new Date() });
});

module.exports = app;