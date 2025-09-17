function enableBot() {

    fetch('/api/enable')
        .then(response => response.json())
        .then(data => {
            console.log('Response from /api/enable:', data);
        })
        .catch(error => {
            console.error('Error fetching /api/enable:', error);
        });

    console.log('Bot enabled')
}

function disableBot() {

    fetch('/api/disable')
        .then(response => response.json())
        .then(data => {
            console.log('Response from /api/disable:', data);
        })
        .catch(error => {
            console.error('Error fetching /api/disable:', error);
        });

    console.log('Bot disabled')
}

function getQuotes() {
    // fetch('/api/quotes')

}