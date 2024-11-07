document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check if the username or email already exists in local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const storedUser = JSON.parse(localStorage.getItem(key));

            if (storedUser.username === username) {
                alert("Username already exists. Please choose a different username.");
                return;
            }

            if (storedUser.email === email) {
                alert("Email already exists. Please use a different email.");
                return;
            }
        } catch (e) {
            console.error(`Error parsing JSON for key ${key}:`, e);
            // Skip this entry if it’s not valid JSON
        }
    }

    // Store user credentials in local storage
    const user = {
        username: username,
        email: email,
        password: password,
    };

    // Store the user object in local storage under the username key
    localStorage.setItem(username, JSON.stringify(user));

    alert("Signup successful! You will be redirected to the login page.");
    window.location.href = "login.html"; // Redirect to login page after signup
});
