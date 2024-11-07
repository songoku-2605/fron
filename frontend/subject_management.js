// Initialize subjects and staff data
let subjectData = JSON.parse(localStorage.getItem('subjectData')) || [];
let staffData = JSON.parse(localStorage.getItem('staffData')) || [];

// Load subjects into the table
function loadSubjectData() {
    const subjectTableBody = document.getElementById('subjectTableBody');
    subjectTableBody.innerHTML = '';  // Clear previous data

    subjectData.forEach((subject, index) => {
        const row = `<tr>
                        <td>${subject.subjectName}</td>
                        <td>${subject.subjectCode}</td>
                        <td>${subject.credits}</td>
                        <td>
                            <button onclick="deleteSubject(${index})">Delete</button>
                        </td>
                    </tr>`;
        subjectTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Show or hide the "Delete All" button
    document.getElementById('deleteAllSubjectsBtn').style.display = subjectData.length > 0 ? 'inline-block' : 'none';
}

// Add new subject
document.getElementById('subjectForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const subjectName = document.getElementById('subjectName').value;
    const subjectCode = document.getElementById('subjectCode').value;
    const credits = document.getElementById('credits').value;

    subjectData.push({ subjectName, subjectCode, credits });
    localStorage.setItem('subjectData', JSON.stringify(subjectData));
    loadSubjectData();

    // Clear form fields
    this.reset();
});

// Delete a subject
function deleteSubject(index) {
    subjectData.splice(index, 1);
    localStorage.setItem('subjectData', JSON.stringify(subjectData));
    loadSubjectData();
}

// Delete all subjects
document.getElementById('deleteAllSubjectsBtn').addEventListener('click', function () {
    if (confirm('Are you sure you want to delete all subjects?')) {
        subjectData = [];
        localStorage.setItem('subjectData', JSON.stringify(subjectData));
        loadSubjectData();
    }
});

// Show/hide sections based on button clicks
document.getElementById('addSubjectBtn').addEventListener('click', function () {
    document.getElementById('addSubjectSection').style.display = 'block';
    document.getElementById('manageSubjectSection').style.display = 'none';
    document.getElementById('assignSubjectSection').style.display = 'none';
});

document.getElementById('manageSubjectBtn').addEventListener('click', function () {
    document.getElementById('addSubjectSection').style.display = 'none';
    document.getElementById('manageSubjectSection').style.display = 'block';
    document.getElementById('assignSubjectSection').style.display = 'none';
    loadSubjectData();  // Refresh subject data
});

document.getElementById('assignSubjectBtn').addEventListener('click', function () {
    document.getElementById('addSubjectSection').style.display = 'none';
    document.getElementById('manageSubjectSection').style.display = 'none';
    document.getElementById('assignSubjectSection').style.display = 'block';
    loadStaffOptions(); // Load staff options
});

// Load staff options for assignment
function loadStaffOptions() {
    const staffSelect = document.getElementById('staffSelect');
    staffSelect.innerHTML = ''; // Clear previous options

    staffData.forEach((staff) => {
        const option = `<option value="${staff.name}">${staff.name}</option>`;
        staffSelect.insertAdjacentHTML('beforeend', option);
    });
}

// Assign subject to staff
document.getElementById('assignSubjectForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const staffName = document.getElementById('staffSelect').value;
    const subjectName = document.getElementById('assignSubject').value;

    alert(`Assigned ${subjectName} to ${staffName}`);
    // You can implement additional logic here for actual assignment
});

// Initialize data on page load
window.onload = loadSubjectData;
