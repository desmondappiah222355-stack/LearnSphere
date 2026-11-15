const plannerCard = document.querySelector("#planner-card");
const goalsCard = document.querySelector("#goals-card");
const studyContainer = document.querySelector("#study-container");
const featureDisplay = document.querySelector("#feature-display");
const backButton = document.querySelector("#back");
const backBtn = document.querySelector("#back-btn");
plannerCard.addEventListener("click", () => {
    studyContainer.hidden = true;
    featureDisplay.hidden = false;
    backButton.hidden = false;
    backBtn.hidden = true;
       
    featureDisplay.innerHTML = `
    <h2>Study Planner</h2>

   <form id="planner-form" class="planner-form">
    <label class="planner-label">Subject</label>
    <input type="text" id="subject" class="planner-input" required>

    <label class="planner-label">Topic</label>
    <input type="text" id="topic" class="planner-input" required>

    <label class="planner-label">Study Date</label>
    <input type="date" id="study-date" class="planner-input" required>
    
    <label class="planner-label">Start Time</label>
    <input type="time" id="start-time" class="planner-input" required>
    
    <label class="planner-label">Duration (minutes)</label>
    <input type="number" id="duration" class="planner-input" min="1" required>
    <button type="submit" class="planner-submit">Add Session</button>
</form>

<div id="session-list" class="session-list"></div>

   `
loadSessions();
const plannerForm = document.querySelector("#planner-form");

plannerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const subject = document.querySelector("#subject").value;
    const topic = document.querySelector("#topic").value;
    const date = document.querySelector("#study-date").value;
    const time = document.querySelector("#start-time").value;
    const duration = document.querySelector("#duration").value;

const response = await fetch("/study-sessions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        subject,
        topic,
        date,
        time,
        duration
    })
})

const result = await response.json();

if(!response.ok) {
    alert(result.message || "Could not save your session");
    return;
}

const sessionList = document.querySelector("#session-list");
const session = document.createElement("div")
session.classList.add("session-card")
session.innerHTML = `
        <h3 class="session-subject">${subject}</h3>
    <p class="session-detail">Topic: ${topic}</p>
    <p class="session-detail">Date: ${date}</p>
    <p class="session-detail">Time: ${time}</p>
    <p class="session-detail">Duration: ${duration} minutes</p>
    
`;

sessionList.appendChild(session);
plannerForm.reset();
});
});

async function loadSessions() {
    const response = await fetch("/study-sessions");
    const sessions = await response.json();
    const sessionList = document.querySelector("#session-list");

    sessions.forEach(session => {
        const sessionCard = document.createElement("div");
        sessionCard.classList.add("session-card");
        sessionCard.innerHTML = `
            <h3 class="session-subject">${session.subject}</h3>
            <p class="session-detail">Topic: ${session.topic}</p>
            <p class="session-detail">Date: ${session.date}</p>
            <p class="session-detail">Time: ${session.time}</p>
            <p class="session-detail">Duration: ${session.duration} minutes</p>
            <p class="session-status">${session.completed ? "Completed" : "Not completed"}</p>        
            ${!session.completed ? `<button class="complete-btn" data-id="${session.id}">Mark as completed</button>` : ""}

        `;
        sessionList.appendChild(sessionCard);
    });
    sessionList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("complete-btn")) {
        const sessionId = event.target.dataset.id;
        const response = await fetch(`/study-sessions/${sessionId}/complete`, {
        method: "PATCH"
        });
        const result = await response.json();

    if (!response.ok) {
        alert(result.message);
    return;
        }
const sessionCard = event.target.closest(".session-card");
sessionCard.querySelector(".session-status").textContent = "Completed";
event.target.remove();
    }
});
    
}

goalsCard.addEventListener("click", () => {
    studyContainer.hidden = true;
    featureDisplay.hidden = false;
    backButton.hidden = false;
    backBtn.hidden = true;

   
featureDisplay.innerHTML = `
    <h2>Study Goals</h2>

    <form id="goals-form" class="goals-form">

        <label>Goal Name</label>
        <input type="text" id="goal-name" required>

        <label>Subject</label>
        <input type="text" id="goal-subject" required>

        <label>Description</label>
        <textarea id="goal-description"></textarea>


<label>Target Amount</label>
<input type="number" id="goal-target" min="1" required>

<label>Unit</label>
<select id="goal-unit" required>
    <option value="">Select a unit</option>
    <option value="Questions">Questions</option>
    <option value="Chapters">Chapters</option>
    <option value="Topics">Topics</option>
    <option value="Hours">Hours</option>
    <option value="Other">Other</option>
</select>

<label>Deadline</label>
<input type="date" id="goal-deadline" required>

<button type="submit" class="goals-submit">Create Goal</button>
    </form>

    <div id="goals-list" class="goals-list"></div>
`;
loadGoals();
const goalsForm = document.querySelector("#goals-form");

goalsForm.addEventListener("submit", async (event) =>{
    event.preventDefault();
    const goalName = document.querySelector("#goal-name").value;
    const goalSubject = document.querySelector("#goal-subject").value;
    const goalDescription = document.querySelector("#goal-description").value;
    const GoalTarget = document.querySelector("#goal-target").value;
    const goalTarget = Number(GoalTarget);
    const goalUnit = document.querySelector("#goal-unit").value;
    const goalDeadline = document.querySelector("#goal-deadline").value;

    const response = await fetch("/study-goals", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: goalName,
        subject: goalSubject,
        description: goalDescription,
        target: goalTarget,
        unit: goalUnit,
        deadline: goalDeadline

    })
})

const result = await response.json();

if(!response.ok) {
    alert(result.message || "Could not save your goal");
    return;
}
alert(result.message);
goalsForm.reset();
const goalsList = document.querySelector("#goals-list");
const goalCard = document.createElement("div")
goalCard.classList.add("goal-card")
goalCard.innerHTML = `
        <h3 class="goal-name">${goalName}</h3>
    <p class="goal-detail">Subject: ${goalSubject}</p>
    <p class="goal-detail">Description: ${goalDescription}</p>
    <p class="goal-detail">Target: ${goalTarget}</p>
    <p class="goal-detail">Unit: ${goalUnit} </p>
    <p class="goal-detail">Deadline: ${goalDeadline}</p>
    
`;
goalsList.appendChild(goalCard);

});
});

async function loadGoals() {
    const response = await fetch("/study-goals");
    const goals = await response.json();
    const goalsList = document.querySelector("#goals-list");

    goals.forEach(goal => {
        const goalCard = document.createElement("div");
        goalCard.classList.add("goal-card");
        goalCard.innerHTML = `
            <h3 class="goal-name">${goal.name}</h3>
            <p class="goal-detail">Subject: ${goal.subject}</p>
            <p class="goal-detail">Description: ${goal.description}</p>
            <p class="goal-detail">Target: ${goal.target}</p>
            <p class="goal-detail">Unit: ${goal.unit} </p>
            <p class="goal-detail">Deadline: ${goal.deadline}</p>
            <p class="goal-status">${goal.completed ? "Completed" : "Not completed"}</p>        
            ${!goal.completed ? `<button class="complete-btn" data-id="${goal.id}">Mark as completed</button>` : ""}

        `;
        goalsList.appendChild(goalCard);
    });
    goalsList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("complete-btn")) {
        const goalId = event.target.dataset.id;
        const response = await fetch(`/study-goals/${goalId}/complete`, {
        method: "PATCH"
        });
        const result = await response.json();

    if (!response.ok) {
        alert(result.message);
    return;
        }
const goalCard = event.target.closest(".goal-card");
goalCard.querySelector(".goal-status").textContent = "Completed";
event.target.remove();
    }

});
}


backButton.addEventListener("click",() => {
    studyContainer.hidden = false;
    featureDisplay.hidden = true;
    backButton.hidden = true;
    backBtn.hidden = false;
});

backBtn.addEventListener("click", () =>{
    window.location.href ="../dashboard/dashboard.html";
});