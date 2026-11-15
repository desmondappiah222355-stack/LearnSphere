console.log("Dashboard is fully active");

const user = sessionStorage.getItem('username');
document.getElementById('welcome').textContent = `Welcome back ${user}`;
console.log(`User ${user} is signed in`)