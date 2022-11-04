import Plotly from 'plotly.js-dist'

window.onload = () => {
    const button = document.getElementById('submit');

    button.addEventListener('click', () => {
        const input = document.getElementById('input');

        // the input select a file, upload the file to the server via a POST request, to the /api/process_file endpoint, use multipart/form-data encoding
        // the server will return a JSON object
        // use CORS to allow the client to make requests to the server
        const data = new FormData();
        data.append('file', input.files[0]);

        const req = new Request('api/process_file', {
            method: 'POST',
            body: data
        });

        fetch(req).then((response) => {
            return response.json();
        }).then(({ data }) => {
            console.log(data);
            plot(...parse(data), "Acceleration");
        })
    });
}

const parse = (data) => {
    const getFrequency = (obj, start, end) => {
        const time = obj[end][0] - obj[start][0];
        return (end - start) / time * 1_000_000;
    }

    const offset = data[0];

    const lsm = {
        ax : offset[0],
        ay : offset[1],
        az : offset[2],
        axRms : offset[3],
        ayRms : offset[4],
        azRms : offset[5],
    }

    const lis = {
        ax : offset[6],
        ay : offset[7],
        az : offset[8],
        axRms : offset[9],
        ayRms : offset[10],
        azRms : offset[11],
    }

    const obj = data.slice(1);

    const freq = getFrequency(obj, 0, obj.length - 1);

    return [obj, lsm, lis, freq]
}

const plot = (obj, lsm, lis, freq, element) => {
    Plotly.newPlot(element, [{
        x: obj.map(line => line[0] / 1_000_000),
        y: obj.map(line => line[1] - lsm.ax),
        type: 'scatter',
        name: 'Accel X (LSM)'
    }, {
        x: obj.map(line => line[0] / 1_000_000),
        y: obj.map(line => line[2] - lsm.ay),
        type: 'scatter',
        name: 'Accel Y (LSM)'
    }, {
        x: obj.map(line => line[0] / 1_000_000),
        y: obj.map(line => line[3] - lsm.az),
        type: 'scatter',
        name : 'Accel Z (LSM)'
    }, {
        x: obj.map(line => line[0] / 1_000_000),
        y: obj.map(line => line[4] - lis.ax),
        type: 'scatter',
        name : 'Accel X (LIS)'
    }, {
        x: obj.map(line => line[0] / 1_000_000),
        y: obj.map(line => line[5] - lis.ay),
        type: 'scatter',
        name : 'Accel Y (LIS)'
    }, {
        x: obj.map(line => line[0] / 1_000_000),
        y: obj.map(line => line[6] - lis.az),
        type: 'scatter',
        name : 'Accel Z (LIS)'
    }], {
        xaxis : { title: 'Time (s)' },
        yaxis : { title: 'Acceleration (m/s^2)' },
        title : `Acceleration over time (average frequency: ${freq.toFixed(2)}Hz)`
    })
}
