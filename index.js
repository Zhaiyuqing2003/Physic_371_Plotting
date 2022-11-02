const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // send the index.html file
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/date', (req, res) => {
    // send the current date
    res.send(new Date());
})

app.get('/script.js', (req, res) => {
    // send the script.js file, mime type is set to javascript
    res.sendFile(__dirname + '/script.js', { 'Content-Type': 'text/javascript' });
})

app.listen(80, () => {
    console.log('server started');
});