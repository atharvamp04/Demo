// Initialize variables to store user behavior data
let mouseMovements = [];
let typingData = [];

// Track mouse movement
document.addEventListener('mousemove', function(event) {
    let timestamp = Date.now();
    mouseMovements.push({
        x: event.clientX,
        y: event.clientY,
        time: timestamp
    });
});

// Track typing speed
document.addEventListener('keydown', function(event) {
    let timestamp = Date.now();
    typingData.push({
        key: event.key,
        time: timestamp
    });
});

// Handle form submission
document.getElementById('captchaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the usual way

    // Prepare data to send to the server
    let behaviorData = {
        mouseMovements: mouseMovements,
        typingData: typingData
    };

    console.log('Behavior Data:', behaviorData); // Log behavior data

    // Send the data to the server
    fetch('http://localhost:5000/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(behaviorData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server Response:', data); // Log server response

        if (data.verified) {
            // CAPTCHA passed
            alert('CAPTCHA passed! You are a human.');
        } else {
            // CAPTCHA failed
            alert('CAPTCHA failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
