const subjectTopics = {
    Mathematics: ["Algebra", "Trigonometry", "Geometry", "Fractions, Decimals and Percentages", "Statistics", "Indices and Logarithms", "Sets and Probability"],
    Physics: ["Motion", "Forces", "Energy", "Electricity", "Waves and Sound", "Light", "Heat and Temperature"],
    Chemistry: ["Atomic Structure", "Bonding", "Acids and Bases", "The Periodic Table", "Rates of Reaction", "Introduction to Organic Chemistry"],
    Biology: ["Cells", "Nutrition", "Genetics", "Photosynthesis", "Respiration", "Ecology"],
    English: ["Grammar", "Comprehension", "Summary Writing", "Essay Writing", "Letter Writing", "Figures of Speech"],
    Geography: ["Map Reading", "Weather and Climate", "Rocks and Landforms"],
    Economics: ["Basic Economic Concepts", "Demand and Supply", "Money and Banking"],
    History: ["Pre-Colonial West Africa", "The Atlantic Slave Trade", "Colonialism and Independence"],
    Government: ["Citizenship and Rights", "Arms of Government", "Democracy and Elections"],
    Computing: ["Computer Hardware and Software", "Number Systems", "Algorithms and Programming", "Internet and Online Safety"],
    Agriculture: ["Soil Science", "Crop Production", "Animal Husbandry"]
};
const notesSection = document.querySelector("#notes");
const notesHeading = document.querySelector("#notes-heading");
const notesContent = document.querySelector("#notes-content");
const subjectCards = document.querySelectorAll(".subject-card");
const topicContainer = document.querySelector("#topic-container");
const subjectSection = document.querySelector(".subject");
const topicsSection = document.querySelector("#topics");
const topicHeading = document.querySelector("#topic-heading");
const backButton = document.querySelector("#back-button");
let studyNotes = {};
fetch("/Assets/notes.json")
    .then(response => response.json())
    .then(notes => {
        studyNotes = notes;
        console.log("Notes loaded!");
    });


subjectCards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedSubject = card.dataset.subject;
        const topics = subjectTopics[selectedSubject];
        topicContainer.innerHTML = "";

topics.forEach(topic => {
    topicContainer.innerHTML += `<div class="topic-card">${topic}</div>`;
});

const topicCards = document.querySelectorAll(".topic-card");

topicCards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedTopic = card.textContent;
        const note = studyNotes[selectedSubject][selectedTopic];

notesHeading.textContent += note.title;
notesContent.innerHTML = `
    <h3>Introduction</h3>
    <p>${note.introduction}</p>
`;
notesContent.innerHTML += `
    <h3>Key Concepts</h3>
    <ul>
        ${note.keyConcepts.map(concept => `<li>${concept}</li>`).join("")}
    </ul>
`;
notesContent.innerHTML += `
    <h3>Worked Example</h3>
    <p><strong>Question:</strong> ${note.example.question}</p>
    <p><strong>Solution:</strong> ${note.example.solution}</p>
    <p><strong>Answer:</strong> ${note.example.answer}</p>
`;
notesContent.innerHTML += `
    <h3>Lesson Summary</h3>
    <p>${note.summary}</p>
`;

subjectSection.hidden = true;
topicsSection.hidden = true;
notesSection.hidden = false;

    });

});
        subjectSection.hidden = true;
        topicsSection.hidden = false;

        topicHeading.textContent = selectedSubject + " Topics";
    });
});

backButton.addEventListener("click", () => {
    window.location.href = "../dashboard/dashboard.html";
})



