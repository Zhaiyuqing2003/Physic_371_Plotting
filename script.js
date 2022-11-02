window.onload = () => {
    const button = document.getElementById('submit');

    button.addEventListener('click', () => {
        const input = document.getElementById('input');

        // the input select a file, upload the file to the server via a POST request, to the /api/process_file endpoint, use multipart/form-data encoding
        // the server will return a JSON object
        // use CORS to allow the client to make requests to the server
        const data = new FormData();
        data.append('file', input.files[0]);

        fetch('http://localhost:3000/api/process_file', {
            method: 'POST',
            mode : 'no-cors',
            body: data,
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log(data);
        })
    });
}