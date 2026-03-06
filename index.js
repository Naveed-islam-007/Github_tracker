

document.getElementById("login-btn").addEventListener("click", function(){
    const username=document.getElementById("input-username").value;
    const password=document.getElementById("input-password").value;
    if(username==="admin" && password==="admin123"){
        alert("Login successful");
        window.location.assign("dashboard.html");
    } else {
        alert("Invalid username or password");
    }
})