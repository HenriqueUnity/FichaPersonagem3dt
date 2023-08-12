let lock = false;

//health points mana points multiplier
function ResistancePointSetter() {
  let resAtri = document.getElementById("resistanceAtri");
  let res = resAtri.value;
  SetMaxLifeMagic(res);
}

function SetMaxLifeMagic(res) {
  let life = document.getElementById("maxLife");
  let magic = document.getElementById("maxMagic");
  const defaultMultiplier = 5;
  if (res == 0) {
    life.value = 1;
    magic.value = 1;
  } else {
    life.value = res * defaultMultiplier;
    magic.value = res * defaultMultiplier;
  }
}

// lock atributes

function lockUnlock() {
  if (!lock) {
    let atributes = document.getElementsByClassName("lock");
    for (let index = 0; index < atributes.length; index++) {
      atributes[index].disabled = !event.target.checked;
      lock = true;
    }
  } else {
    let atributes = document.getElementsByClassName("lock");
    for (let index = 0; index < atributes.length; index++) {
      atributes[index].disabled = event.target.checked;
      lock = false;
    }
  }
}

//skills
let skills = [];
let container = document.querySelector(".skillContainer");

function addSkill() {
  let skillName = document.querySelector(".skillName").value;
  let skillValue = document.querySelector(".skillValue").value;
  let newskill = {
    name: skillName,
    value: skillValue,
  };

  skills.push(newskill);
  updateSkills();
}

function updateSkills() {
  let content = "";
  for (let i = 0; i < skills.length; i++) {
    content += `<p id="${i}">${skills[i].name} (${skills[i].value})</p> 
    <button onclick="deleteSkills(${i})">x</button>`;
  }
  container.innerHTML = content;
  totalPoints();
}

function deleteSkills(index) {
  console.log(index);

  skills.splice(index, 1);
  updateSkills();
}

function totalPoints() {
  let total = 0;
  const pointsDiv = document.querySelector(".totalPoints");
  for (let i = 0; i < skills.length; i++) {
    total += parseInt(skills[i].value);
  }
  total += parseInt(atributesTotalPoints());

  pointsDiv.innerHTML = `<p>pontos gastos = ${total}</p>`;
}

function atributesTotalPoints() {
  // let atr = document.querySelectorAll(".atr");
  let str = document.querySelector("#strenghtAtri").value;
  let abi = document.querySelector("#abilityAtri").value;
  let res = document.querySelector("#resistanceAtri").value;
  let arm = document.querySelector("#armorAtri").value;
  let pwr = document.querySelector("#rangedAtri").value;

  let total =
    parseInt(str) +
    parseInt(abi) +
    parseInt(res) +
    parseInt(arm) +
    parseInt(pwr);

  return total;
}
