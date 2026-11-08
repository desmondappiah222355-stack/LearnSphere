console.log("Dashboard is fully acive");

const user = sessionStorage.getItem('username');
document.getElementById('welcome').textContent = `Welcome back ${user}`;