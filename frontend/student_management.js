// Initialize student data
let studentData = JSON.parse(localStorage.getItem('studentData')) || [];

// Load student data into the table
function loadStudentData() {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';  // Clear previous data

    studentData.forEach((student, index) => {
        const row = `<tr>
                        <td>${student.firstName}</td>
                        <td>${student.lastName}</td>
                        <td>${student.dob}</td>
                        <td>${student.email}</td>
                        <td>${student.phone}</td>
                        <td>${student.parentPhone}</td>
                        <td>
                            <button onclick="deleteStudent(${index})">Delete</button>
                        </td>
                    </tr>`;
        studentTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Show or hide the "Delete All Students" button based on student data
    document.getElementById('deleteAllStudentsBtn').style.display = studentData.length > 0 ? 'block' : 'none';
}

// Add a single student
document.getElementById('singleStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newStudent = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        parentPhone: document.getElementById('parentPhone').value,
    };

    studentData.push(newStudent);
    localStorage.setItem('studentData', JSON.stringify(studentData));

    alert('Student added successfully!');
    loadStudentData();
    document.getElementById('singleStudentForm').reset(); // Reset the form
});

// Add multiple students
document.getElementById('multipleStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('studentFile');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assuming data is in the first sheet
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            jsonData.forEach(student => {
                studentData.push({
                    firstName: student['First Name'],
                    lastName: student['Last Name'],
                    dob: student['Date of Birth'],
                    email: student['Email ID'],
                    phone: student['Phone Number'],
                    parentPhone: student['Parent Phone Number'], // Make sure this matches your column
                });
            });

            localStorage.setItem('studentData', JSON.stringify(studentData));
            alert('Multiple students added successfully!');
            loadStudentData();
            document.getElementById('multipleStudentForm').reset(); // Reset the form
        };

        reader.readAsBinaryString(file);
    }
});

// Delete individual student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        studentData.splice(index, 1);
        localStorage.setItem('studentData', JSON.stringify(studentData));
        loadStudentData();
    }
}

// Delete All Students
document.getElementById('deleteAllStudentsBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all students?')) {
        studentData = [];
        localStorage.setItem('studentData', JSON.stringify(studentData));
        loadStudentData();
    }
});

// Toggle views between adding and viewing students
document.getElementById('viewStudentBtn').addEventListener('click', function() {
    document.getElementById('singleMultipleSection').style.display = 'none';
    document.getElementById('viewStudentSection').style.display = 'block';
    loadStudentData();
});

document.getElementById('addStudentBtn').addEventListener('click', function() {
    document.getElementById('singleMultipleSection').style.display = 'block';
    document.getElementById('viewStudentSection').style.display = 'none';
});

// Initially load the student data when the page loads
loadStudentData();
