const members = [];
const responses = [];

let currentMember = 0;

const memberInput = document.getElementById("memberInput");
const memberList = document.getElementById("memberList");

const setupCard = document.getElementById("setupCard");
const meetingCard = document.getElementById("meetingCard");
const summaryCard = document.getElementById("summaryCard");

document
.getElementById("addBtn")
.addEventListener("click", addMember);

document
.getElementById("startBtn")
.addEventListener("click", startMeeting);

document
.getElementById("nextBtn")
.addEventListener("click", saveResponse);

document
.getElementById("copyBtn")
.addEventListener("click", copySummary);

document
.getElementById("downloadBtn")
.addEventListener("click", downloadSummary);

document
.getElementById("restartBtn")
.addEventListener("click", () => location.reload());

function addMember(){

const name = memberInput.value.trim();

if(!name) return;

if(members.length >= 6){
alert("Maximum 6 members allowed");
return;
}

members.push(name);

renderMembers();

memberInput.value = "";
}

function renderMembers(){

memberList.innerHTML = "";

members.forEach(member=>{

const li = document.createElement("li");

li.textContent = member;

memberList.appendChild(li);

});
}

function startMeeting(){

if(members.length < 3){
alert("At least 3 members required");
return;
}

setupCard.classList.add("hidden");
meetingCard.classList.remove("hidden");

loadCurrentMember();
}

function loadCurrentMember(){

document.getElementById("memberTitle").textContent =
members[currentMember];

document.getElementById("counter").textContent =
`${currentMember + 1} / ${members.length}`;

document.getElementById("yesterday").value = "";
document.getElementById("today").value = "";
document.getElementById("blockers").value = "";

const progress =
(currentMember / members.length) * 100;

document.getElementById("progress").style.width =
progress + "%";
}

function saveResponse(){

const yesterday =
document.getElementById("yesterday").value.trim();

const today =
document.getElementById("today").value.trim();

const blockers =
document.getElementById("blockers").value.trim();

if(!yesterday || !today){
alert("Please answer required questions");
return;
}

responses.push({
member: members[currentMember],
yesterday,
today,
blockers: blockers || "None"
});

currentMember++;

if(currentMember < members.length){
loadCurrentMember();
}else{
generateSummary();
}
}

function generateSummary(){

meetingCard.classList.add("hidden");
summaryCard.classList.remove("hidden");

document.getElementById("progress").style.width = "100%";

let summary =
`DAILY STANDUP SUMMARY
Date: ${new Date().toLocaleDateString()}

========================================

`;

responses.forEach(person=>{

summary +=
`${person.member}

Completed Yesterday:
${person.yesterday}

Working On Today:
${person.today}

Blockers:
${person.blockers}

----------------------------------------

`;

});

document.getElementById("summaryText").value =
summary;
}

function copySummary(){

navigator.clipboard.writeText(
document.getElementById("summaryText").value
);

alert("Summary copied");
}

function downloadSummary(){

const text =
document.getElementById("summaryText").value;

const blob =
new Blob([text], {type:"text/plain"});

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
`standup-summary-${Date.now()}.txt`;

link.click();
}