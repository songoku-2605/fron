// Initialize staff data
let staffData = JSON.parse(localStorage.getItem('staffData')) || [];

// Load staff data into the table
function loadStaffData() {
    const staffTableBody = document.getElementById('staffTableBody');
    staffTableBody.innerHTML = '';  // Clear previous data

    staffData.forEach((staff, index) => {
        const row = `<tr>
                        <td>${staff.firstName}</td>
                        <td>${staff.lastName}</td>
                        <td>${staff.dob}</td>
                        <td>${staff.email}</td>
                        <td>${staff.phone}</td>
                        <td>${staff.position}</td>
                        <td>
                            <button onclick="deleteStaff(${index})">Delete</button>
                        </td>
                    </tr>`;
        staffTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Show or hide the "Delete All Staff" button based on staff data
    document.getElementById('deleteAllBtn').style.display = staffData.length > 0 ? 'block' : 'none';
}

// Add a single staff member
document.getElementById('singleStaffForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newStaff = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        position: document.getElementById('position').value,
        password: document.getElementById('password').value, // Password can be used for account management
    };

    staffData.push(newStaff);
    localStorage.setItem('staffData', JSON.stringify(staffData));

    alert('Staff member added successfully!');
    loadStaffData();
    document.getElementById('singleStaffForm').reset(); // Reset the form
});

// Add multiple staff members
document.getElementById('multipleStaffForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('staffFile');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assuming data is in the first sheet
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            jsonData.forEach(staff => {
                staffData.push({
                    firstName: staff['First Name'],
                    lastName: staff['Last Name'],
                    dob: staff['Date of Birth'],
                    email: staff['Email ID'],
                    phone: staff['Phone Number'],
                    password: staff['Password'], // Assuming you have a Password column
                    position: staff['Position'],
                });
            });

            localStorage.setItem('staffData', JSON.stringify(staffData));
            alert('Multiple staff members added successfully!');
            loadStaffData();
            document.getElementById('multipleStaffForm').reset(); // Reset the form
        };

        reader.readAsBinaryString(file);
    }
});

// Delete individual staff member
function deleteStaff(index) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        staffData.splice(index, 1);
        localStorage.setItem('staffData', JSON.stringify(staffData));
        loadStaffData();
    }
}

// Delete All Staff
document.getElementById('deleteAllBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all staff?')) {
        staffData = [];
        localStorage.setItem('staffData', JSON.stringify(staffData));
        loadStaffData();
    }
});

// Toggle views between adding and viewing staff
document.getElementById('viewStaffBtn').addEventListener('click', function() {
    document.getElementById('singleMultipleSection').style.display = 'none';
    document.getElementById('viewStaffSection').style.display = 'block';
    loadStaffData();
});

document.getElementById('addStaffBtn').addEventListener('click', function() {
    document.getElementById('singleMultipleSection').style.display = 'block';
    document.getElementById('viewStaffSection').style.display = 'none';
});

// Initially load the staff data when the page loads
loadStaffData();
