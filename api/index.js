const app = require('express')();
const path = require('path');
const upload = require('multer')({ dest : './' });
const fs = require('fs');

app.post('/api/process_file', upload.single("file"), (req, res) => {
    // get the file path from the request
    // const filePath = path.join(__dirname, req.file.path);
    // console.log(filePath);
    // console.log(req.file);
    // // transform the file
    const transformBinaryFile = (name) => {
        // read file "FALL.TXT", into a buffer
        const buffer = fs.readFileSync(path.join(__dirname, name));
        // the file is a binary file, its format is long, float, float, float, repeatedly
        // so we need to read the buffer 4 bytes at a time, and convert it to a long
        const array = [];
    
        array.push(Array(96 / 8).fill(0).map((_, i) => buffer.readDoubleLE(i * 8)));
    
        // one block is unsigned long + float * 6 = 28 bytes
        for (let i = 96; i < buffer.length; i += 28) {
            const time = buffer.readUInt32LE(i);
            const data = Array(6).fill(0).map((_, j) => buffer.readFloatLE(i + 4 + j * 4));
            array.push([time, ...data]);
        }
    
        return array;
    }

    let data;
    try {
        data = transformBinaryFile(req.file.path);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error processing file");
    }

    // console.log(data);
    console.log("Data Sent")

    // make it CORS friendly
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // send the data back to the client
    res.send({ data });
});