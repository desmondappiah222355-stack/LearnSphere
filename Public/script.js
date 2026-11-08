console.log("JS is up and running");
// Input from HTML
const usernameInput = document.getElementById('login-username');
const passwordInput = document.getElementById('login-password');
const loginBtnInput = document.getElementById('login-btn');

loginBtnInput.addEventListener('click', async function() {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
   try {
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const data = await response.json();
        if(response.ok) {
            sessionStorage.setItem('username', data.username);
            window.location.href = "./dashboard/dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Could not reach the server. Try again")
    }
    });

console.log("Login is operational");

