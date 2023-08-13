let lock = false;

//health points mana points multiplier
const resAtri = document.querySelector("#resistanceAtri");
resAtri.addEventListener("input", function () {
  ResistancePointSetter();
});
function ResistancePointSetter() {
  let res = resAtri.value;
  SetMaxLifeMagic(res);
}

function SetMaxLifeMagic(res) {
  const life = document.getElementById("maxLife");
  const magic = document.getElementById("maxMagic");
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
let container2 = document.querySelector(".badskillContainer");
let badSkillsTotal;
let maxPoints = document.querySelector("#maxCharPoints").value;
const pointsDiv = document.querySelector(".totalPoints");

// add vantagens
function addSkill() {
  let skillName = document.querySelector(".skillName").value;
  let skillValue = document.querySelector(".skillValue").value;
  let newskill = {
    name: skillName,
    value: skillValue,
    bad: false,
  };

  skills.push(newskill);
  updateSkills();
}
//add desvantages
function addSkillNegative() {
  let skillName = document.querySelector(".badskillName").value;
  let skillValue = document.querySelector(".badskillValue").value;
  let newskill = {
    name: skillName,
    value: skillValue,
    bad: true,
  };
  skills.push(newskill);
  updateSkills();
  console.log(badSkillsTotal);
  negativePointsLimit(badSkillsTotal);
}
//limite de desvantagens
function negativePointsLimit(badTotal) {
  let maxNegative;
  maxPoints = document.querySelector("#maxCharPoints").value;
  switch (parseInt(maxPoints)) {
    case 5:
      maxNegative = -3;
      break;
    case 7:
      maxNegative = -4;
      break;
    case 10:
      maxNegative = -5;
      break;
    case 12:
      maxNegative = -6;
      break;
    case 999:
      maxNegative = -999;
      break;
    default:
      console.error("switch error");
  }
  console.log(maxNegative);
  if (badTotal < maxNegative) {
    pointsDiv.innerHTML = `<p class="off-Limits">Excedeu o número de desvantagens permitidas!</p>`;
  } else return;
}

function updateSkills() {
  let content = "";
  let content2 = "";
  badSkillsTotal = 0;
  for (let i = 0; i < skills.length; i++) {
    if (!skills[i].bad) {
      content += `<p id="${i}">${skills[i].name} (${skills[i].value})</p> 
      <button onclick="deleteSkills(${i})">x</button>`;
    } else {
      content2 += `<p id="${i}">${skills[i].name} (${skills[i].value})</p> 
      <button onclick="deleteSkills(${i})">x</button>`;
      badSkillsTotal += parseInt(skills[i].value);
    }
  }
  container.innerHTML = content;
  container2.innerHTML = content2;
  totalPoints();
}

function deleteSkills(index) {
  skills.splice(index, 1);
  updateSkills();
}

/// contador de pontos totais

function totalPoints() {
  let total = 0;
  maxPoints = document.querySelector("#maxCharPoints").value;
  for (let i = 0; i < skills.length; i++) {
    total += parseInt(skills[i].value);
  }
  total += parseInt(atributesTotalPoints());

  if (total > maxPoints) {
    pointsDiv.innerHTML = `<p class="off-Limits">pontos excedentes = ${
      (maxPoints - total) * -1
    }</p>`;
  } else pointsDiv.innerHTML = `<p>pontos gastos = ${total}</p>`;

  if (total === parseInt(maxPoints)) {
    pointsDiv.innerHTML = `<p>Todos pontos já distribuidos!</p>`;
    console.log("teste");
  }
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

/// container das magias

let magics = [];
const magicContainer = document.querySelector(".magicContainer");
let magicName = document.querySelector(".magicName");
let magicCost = document.querySelector(".magicCost");
let magicContent = " ";

function addMagic() {
  magicContent = " ";
  magicNameString = magicName.value;
  magicCostValue = magicCost.value;
  let newMagic = {
    name: magicNameString,
    cost: magicCostValue,
  };
  magics.push(newMagic);
  for (let i = 0; i < magics.length; i++) {
    magicContent += `<p>${magics[i].name}  / Custo ${magics[i].cost} Pm(s)</p>`;
  }
  magicContainer.innerHTML = magicContent;
}

// eventos

// faz o calculo quando cade input tem valor alterado
const inputsNumber = document.querySelectorAll(".atr");

for (let i = 0; i < inputsNumber.length; i++) {
  inputsNumber[i].addEventListener("input", function () {
    totalPoints();
  });
}

//evento para calcular pontos assim q seleciona o select

const maxPointsEvent = document.querySelector("#maxCharPoints");

maxPointsEvent.addEventListener("input", function () {
  totalPoints();
});
