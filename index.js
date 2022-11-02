const app = require('express')();
const path = require('path');

app.get('/api/date', (req, res) => {
    res.send({ date: new Date() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
