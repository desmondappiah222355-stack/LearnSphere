const subjectTopics = {
    Mathematics: ["Algebra", "Trigonometry", "Geometry"],
    Physics: ["Motion", "Forces", "Energy"],
    Chemistry: ["Atomic Structure", "Bonding", "Acids and Bases"],
    Biology: ["Cells", "Nutrition", "Genetics"],
    English: ["Grammar", "Comprehension", "Summary Writing"]
};
const notesSection = document.querySelector("#notes");
const notesHeading = document.querySelector("#notes-heading");
const notesContent = document.querySelector("#notes-content");
const subjectCards = document.querySelectorAll(".subject-card");
const topicContainer = document.querySelector("#topic-container");
const subjectSection = document.querySelector(".subject");
const topicsSection = document.querySelector("#topics");
const topicHeading = document.querySelector("#topic-heading");
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

notesHeading.textContent = note.title;
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



