window.onload = () => {
    fetch('/api/date', {
        method: 'GET'
    }).then((response) => response.text())
    .then((text) => {
        console.log(text)
    })
}