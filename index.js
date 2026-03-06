console.log("Hello world")

document.getElementById("login-btn").addEventListener("click", function(){
    const username=document.getElementById("input-username").value;
    const password=document.getElementById("input-password").value;
    if(username==="admin" && password==="admin123"){
        alert("Login successful");
        window.location.replace("dashboard.html");
    } else {
        alert("Invalid username or password");
    }
})