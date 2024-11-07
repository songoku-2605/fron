document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve the user object from local storage using the username as the key
    const storedUser = JSON.parse(localStorage.getItem(username));

    // Check if the user exists and the password matches
    if (storedUser && password === storedUser.password) {
        // Redirect based on the user's role
        switch (storedUser.role) {
            case "student":
                window.location.href = "student-portal.html"; // Redirect to student portal
                break;
            case "staff":
                window.location.href = "staff-portal.html"; // Redirect to staff portal
                break;
            case "hod":
                window.location.href = "hod-portal.html"; // Redirect to HOD portal
                break;
            default:
                alert("Role not recognized. Please contact support.");
        }
    } else {
        alert("Incorrect username or password.");
    }
});
