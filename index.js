const app = require('express')();
const path = require('path');
const upload = require('multer')({ dest : 'uploads/' });
const fs = require('fs');

app.post('/api/process_file', upload.single("file"), (req, res) => {
    // get the file path from the request
    const string = req;
    console.log(string);
});
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
