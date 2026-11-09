console.log("JS is up and running");

const UsernameInput = document.getElementById('signup-username');
const PasswordInput = document.getElementById('signup-password');
const NameInput = document.getElementById('signup-name');
const BtnInput = document.getElementById('signup-btn');


BtnInput.addEventListener('click', async function() {

    const username = UsernameInput.value.trim();
    const password = PasswordInput.value;
    const Name = NameInput.value.trim();
    if(!Name || !username || password.length < 4) {
        alert("Fill in every box. Your password needs at least 4 characters");
        return;
    } 
    try {
    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: Name ,
            username: username,
            password: password
        })
    });
        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            window.location.href = "../index.html";
        }
    
    } catch (err) {
        alert('Could not reach the server. Try again');
    };
});
