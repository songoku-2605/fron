$(document).ready(function () {
    // Toggle between add and view sections
    $('#addEventBtn').click(function () {
        $('#singleMultipleSection').show();
        $('#viewEventSection').hide();
    });

    $('#viewEventBtn').click(function () {
        $('#singleMultipleSection').hide();
        $('#viewEventSection').show();
        loadEvents(); // Load existing events from local storage
    });

    // Handle single event form submission
    $('#singleEventForm').submit(function (e) {
        e.preventDefault();
        const eventData = {
            eventName: $('#eventName').val(),
            coordinator: $('#coordinator').val(),
            lead: $('#lead').val(),
            fromDate: $('#fromDate').val(),
            toDate: $('#toDate').val(),
            timings: $('#timings').val(),
            price: $('#price').val(),
            venue: $('#venue').val(),
        };
        addEvent(eventData); // Add event data to local storage
        $(this).trigger("reset"); // Reset form
    });

    // Handle multiple event upload
    $('#multipleEventForm').submit(function (e) {
        e.preventDefault();
        const file = $('#eventFile')[0].files[0];
        uploadEvents(file); // Handle file upload and process events
    });

    // Function to load and display events in the table
    function loadEvents() {
        const eventTableBody = $('#eventTableBody');
        eventTableBody.empty(); // Clear table before populating

        const events = JSON.parse(localStorage.getItem('events')) || []; // Retrieve events from localStorage
        if (events.length === 0) {
            eventTableBody.append('<tr><td colspan="9">No events found</td></tr>');
            return;
        }

        // Loop through events and append to table
        events.forEach((event, index) => {
            eventTableBody.append(`
                <tr>
                    <td>${event.eventName}</td>
                    <td>${event.coordinator}</td>
                    <td>${event.lead}</td>
                    <td>${event.fromDate}</td>
                    <td>${event.toDate}</td>
                    <td>${event.timings}</td>
                    <td>${event.price || 'Free'}</td>
                    <td>${event.venue}</td>
                    <td><button onclick="deleteEvent(${index})">Delete</button></td>
                </tr>
            `);
        });
    }

    // Function to add a single event to localStorage
    function addEvent(eventData) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(eventData);
        localStorage.setItem('events', JSON.stringify(events)); // Save updated events array to localStorage
        alert('Event added successfully');
    }

    // Function to handle multiple events upload (simplified)
    function uploadEvents(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
            const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const events = JSON.parse(localStorage.getItem('events')) || [];

            sheet.forEach(row => {
                const eventData = {
                    eventName: row['Event Name'],
                    coordinator: row['Coordinator'],
                    lead: row['Lead'],
                    fromDate: row['From Date'],
                    toDate: row['To Date'],
                    timings: row['Timings'],
                    price: row['Price'],
                    venue: row['Venue'],
                };
                events.push(eventData);
            });

            localStorage.setItem('events', JSON.stringify(events)); // Save events to localStorage
            alert('Events uploaded successfully');
        };
        reader.readAsArrayBuffer(file);
    }

    // Function to delete a single event
    window.deleteEvent = function (index) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.splice(index, 1); // Remove event at index
        localStorage.setItem('events', JSON.stringify(events)); // Save updated events to localStorage
        loadEvents(); // Reload events after deletion
    };

    // Clear all events (example functionality)
    $('#deleteAllEventsBtn').click(function () {
        if (confirm('Are you sure you want to delete all events?')) {
            localStorage.removeItem('events');
            loadEvents(); // Reload empty table
        }
    });
});
