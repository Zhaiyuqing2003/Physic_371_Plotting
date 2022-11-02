const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // send the index.html file
    res.sendFile(__dirname + '/index.html');
})

app.listen(80, () => {
    console.log('server started');
});
