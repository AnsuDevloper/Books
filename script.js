document.addEventListener('DOMContentLoaded', function() {
    // Use an external IP service to get the user's public IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;

            // Send the IP address to the Netlify function
            fetch('/.netlify/functions/saveIp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ip: userIp, wifiName: "Not Available" })
            })
            .then(response => response.json())
            .then(data => console.log('Data sent:', data))
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('IP fetch error:', error));
});
