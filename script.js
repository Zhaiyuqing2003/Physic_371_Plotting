window.onload = () => {
    fetch('/api/date', {
        method: 'GET'
    }).then((response) => response.json())
    .then((text) => {
        console.log(text)
    })
}