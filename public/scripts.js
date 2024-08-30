document.getElementById('aadhaarStatusForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Collect form data
    const data = {
        idType: formData.get('idType'),
        enrolmentId: formData.get('enrolmentId'),
        enrolmentDate: formData.get('enrolmentDate'),
        enrolmentTime: formData.get('enrolmentTime')
    };

    console.log('Data being sent to the server:', data); // Log data to check values

    fetch('/api/status/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convert data to JSON format
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result); // Log success response
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
    });
});
