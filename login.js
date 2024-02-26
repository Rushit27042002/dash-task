function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "admin" && password == "123456") {
        location.replace("dashboard/dashboard.html"); // Redirect to dashboard.html
        let loginData={
            username:username,
            password:password,
        }
        localStorage.setItem("loginData", JSON.stringify(loginData));
        history.replaceState(null, null,"dashboard/dashboard.html")//optional 
    } else {
        alert("Invalid username or password"); // Show alert for invalid credentials
    }
}