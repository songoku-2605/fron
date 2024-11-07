// Function to handle feedback form submission
function handleFeedbackSubmission() {
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Create an object to store feedback data
        const feedbackData = {
            type: document.getElementById('feedbackType').value,
            name: document.getElementById('feedbackName').value,
            content: document.getElementById('feedbackContent').value,
        };

        // Retrieve existing feedback data from local storage
        const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
        existingFeedback.push(feedbackData); // Add the new feedback

        // Store updated feedback data in local storage
        localStorage.setItem('feedback', JSON.stringify(existingFeedback));

        // Clear the form
        feedbackForm.reset();
        alert('Feedback has been submitted!');
    });
}

// Function to display stored feedback in table format
function displayStoredFeedback() {
    const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
    const feedbackTableBody = document.getElementById('feedbackTableBody');
    
    // Clear previous content
    feedbackTableBody.innerHTML = '';

    if (storedFeedback.length === 0) {
        const row = `<tr><td colspan="3">No feedback available.</td></tr>`;
        feedbackTableBody.insertAdjacentHTML('beforeend', row);
        return;
    }

    // Populate the table with stored feedback
    storedFeedback.forEach(feedback => {
        const row = `<tr>
                        <td>${feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}</td>
                        <td>${feedback.name}</td>
                        <td>${feedback.content}</td>
                    </tr>`;
        feedbackTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Toggle views between adding feedback and viewing feedback
document.getElementById('addFeedbackBtn').addEventListener('click', function () {
    document.getElementById('feedbackSection').style.display = 'block';
    document.getElementById('viewFeedbackSection').style.display = 'none';
});

document.getElementById('viewFeedbackBtn').addEventListener('click', function () {
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('viewFeedbackSection').style.display = 'block';
    displayStoredFeedback(); // Display feedback when viewing
});

// Initialize feedback handling
handleFeedbackSubmission();
