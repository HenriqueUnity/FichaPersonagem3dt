const skillSlot = "skillSlot";
let numberOfSkills = 0;
let numberDiv = 0;
let skillString = "skillSlot" + numberOfSkills;

function NewSkill() {
  skillString = "skillSlot" + numberOfSkills;
  numberDiv++;

  let nextDiv = skillSlot + numberDiv;
  document.getElementById(skillString).innerHTML =
    `<input class="mt-2" type="text" />
    <input type="number" />
    <button id="skill` +
    numberDiv +
    `" value="1" onclick="DeleteSkill()">-</button>
    <br />
    <div id="` +
    nextDiv +
    `"></div>`;

  numberOfSkills++;
}
//TODO função deletar vantagens
function DeleteSkill() {
  console.log(this.value);
  let skillToDelete = skillSlot + this.value;
  document.getElementById(skillToDelete).innerHTML = "";
}
