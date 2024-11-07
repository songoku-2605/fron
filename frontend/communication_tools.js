// Function to handle form submissions and store data in local storage
 // Toggle sections based on button clicks
 document.getElementById('addMeetingBtn').addEventListener('click', function() {
    $('#addMeetingSection').show();
    $('#scheduleClassSection').hide();
    $('#planSubjectSection').hide();
});

document.getElementById('scheduleClassBtn').addEventListener('click', function() {
    $('#addMeetingSection').hide();
    $('#scheduleClassSection').show();
    $('#planSubjectSection').hide();
});

document.getElementById('planSubjectBtn').addEventListener('click', function() {
    $('#addMeetingSection').hide();
    $('#scheduleClassSection').hide();
    $('#planSubjectSection').show();
});
function handleFormSubmission(formId, storageKey) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Create an object to store form data
        const formData = {};
        const formElements = form.elements;

        for (let element of formElements) {
            if (element.name) {
                formData[element.name] = element.value;
            }
        }

        // Retrieve existing data from local storage
        const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];
        existingData.push(formData); // Add the new data

        // Store updated data in local storage
        localStorage.setItem(storageKey, JSON.stringify(existingData));

        // Clear the form
        form.reset();
        alert(`${storageKey.replace(/_/g, ' ')} has been added!`);
    });
}

// Function to display stored data
function displayStoredData(storageKey, displayElementId) {
    const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
    const displayElement = document.getElementById(displayElementId);
    
    // Clear previous content
    displayElement.innerHTML = '';

    if (storedData.length === 0) {
        displayElement.innerHTML = '<p>No data available.</p>';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Create table headers based on the first object keys
    Object.keys(storedData[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Populate the table with stored data
    storedData.forEach(data => {
        const row = document.createElement('tr');
        Object.values(data).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    displayElement.appendChild(table);
}

// Handle form submissions for each section
handleFormSubmission('meetingForm', 'meetings');
handleFormSubmission('classForm', 'classes');
handleFormSubmission('subjectForm', 'subjects'); // Uncomment if using subjects

// Display the stored data (optional, if you want to show the data on page load)
window.onload = function () {
    displayStoredData('meetings', 'meetingDisplay');
    displayStoredData('classes', 'classDisplay');
    // displayStoredData('subjects', 'subjectDisplay'); // Uncomment if using subjects
};
