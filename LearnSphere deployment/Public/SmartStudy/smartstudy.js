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
        let studyNotes = {};

fetch("/Assets/notes.json")
    .then(response => response.json())
    .then(notes => {
        studyNotes = notes;
        console.log(studyNotes);
    });
    });

});
        subjectSection.hidden = true;
        topicsSection.hidden = false;

        topicHeading.textContent = selectedSubject + " Topics";
    });
});



