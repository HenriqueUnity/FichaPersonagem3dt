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

//setar nome
const mainName = document.querySelector(".mainName");
const divname = document.querySelector(".nameDiv");
function setName() {
  divname.innerHTML = `<h2>${mainName.value}</h2> `;
}

// lock atributes

const atributes = document.getElementsByClassName("lock");

function lockUnlockHidden() {
  let hide = document.querySelectorAll(".hide");
  if (!lock) {
    for (let i = 0; i < atributes.length; i++) {
      atributes[i].disabled = !event.target.checked;
      lock = true;
    }
    for (let i = 0; i < hide.length; i++) {
      hide[i].classList.toggle("hidden");
    }
  } else {
    for (let i = 0; i < atributes.length; i++) {
      atributes[i].disabled = event.target.checked;
      lock = false;
    }
    for (let i = 0; i < hide.length; i++) {
      hide[i].classList.toggle("hidden");
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

const skillName = document.querySelector(".skillName");
const skillValue = document.querySelector(".skillValue");

function addSkill() {
  let nameSkill = skillName.value;
  let cost = skillValue.value;
  let newskill = {
    name: nameSkill,
    value: cost,
    bad: false,
  };

  skills.push(newskill);
  updateSkills();

  skillName.value = "";
  skillValue.value = "";
}
//add desvantages
const badSkillName = document.querySelector(".badskillName");
const badSkillValue = document.querySelector(".badskillValue");

function addSkillNegative() {
  nameSkill = badSkillName.value;
  cost = badSkillValue.value;
  let newskill = {
    name: nameSkill,
    value: cost,
    bad: true,
  };
  skills.push(newskill);
  updateSkills();
  console.log(badSkillsTotal);
  negativePointsLimit(badSkillsTotal);

  badSkillName.value = "";
  badSkillValue.value = 0;
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
      content += `<p class="underLine" id="${i}">${skills[i].name} (${skills[i].value})</p> 
      <button class="hide" onclick="deleteSkills(${i})">x</button>`;
    } else {
      content2 += `<p class="underLine" id="${i}">${skills[i].name} (${skills[i].value})</p> 
      <button class="hide" onclick="deleteSkills(${i})">x</button>`;
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
///Vantagem unica

const uniqueSkillName = document.querySelector(".uniqueName");
const uniqueSkillInput = document.querySelector(".uniqueSkillValue");
const uniqueSkilldiv = document.querySelector(".uniqueSkillContainer");
const uniqueTotalMod = document.querySelector(".uniqueSkillPoints");

function uniqueSkillValue() {
  return uniqueTotalMod.value;
}

function uniqueSkill() {
  let name = uniqueSkillName.value;
  let cost = uniqueSkillInput.value;
  if (name.value == "") {
    console.log(name);
    name = "Humano";
  }
  uniqueSkilldiv.innerHTML = `<p class="underLine">${name} (${cost})</p>`;

  uniqueSkillName.value = "";
  uniqueSkillInput.value = 0;
}

/// contador de pontos totais

function totalPoints() {
  let total = 0;
  maxPoints = document.querySelector("#maxCharPoints").value;
  for (let i = 0; i < skills.length; i++) {
    total += parseInt(skills[i].value);
  }
  let uniqueSkill = uniqueSkillInput.value;
  total += parseInt(atributesTotalPoints());
  total += parseInt(uniqueSkill);

  total -= parseInt(uniqueSkillValue());

  if (total > maxPoints) {
    pointsDiv.innerHTML = `<p class="off-Limits">Pontos excedentes = ${
      (maxPoints - total) * -1
    }</p>`;
  } else pointsDiv.innerHTML = `<p>Pontos gastos = ${total}</p>`;

  if (total === parseInt(maxPoints)) {
    pointsDiv.innerHTML = `<p>Todos pontos já distribuidos!</p>`;
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
let showInitial = false;
let magics = [];
const magicContainer = document.querySelector(".magicContainer");
const magicName = document.querySelector(".magicName");
const magicCost = document.querySelector(".magicCost");
let magicContent = " ";
let initialMagicsContent = "";
let initialMagics = [];

fetch("json/magics.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      initialMagics.push(data[i]);
    }
  });
function defaultMagics() {
  if (!showInitial) {
    for (let i = 0; i < initialMagics.length; i++) {
      initialMagicsContent += `<p class="underLine">${
        initialMagics[i].name + " / " + initialMagics[i].cost
      }</p>`;
    }
    showInitial = true;
    updateMagics();
  } else {
    initialMagicsContent = "";
    showInitial = false;
    updateMagics();
  }
}

function addMagic() {
  magicContent = " ";
  magicNameString = magicName.value;
  magicCostValue = magicCost.value;
  let newMagic = {
    name: magicNameString,
    cost: magicCostValue,
  };
  magics.push(newMagic);
  updateMagics();
  magicName.value = " ";
  magicCost.value = 0;
}

function updateMagics() {
  magicContent = "";
  if (magics.length > 0) {
    for (let i = 0; i < magics.length; i++) {
      magicContent += `<p class="underLine">${magics[i].name}  / Custo ${magics[i].cost} Pm(s)</p> <button class="hide" onclick="deleteMagic(${i})">-</button>`;
    }
  } else {
    magicContent = " ";
  }
  magicContent += initialMagicsContent;
  magicContainer.innerHTML = magicContent;
}

function deleteMagic(index) {
  magics.splice(index, 1);
  updateMagics();
}

// itens
let items = [];
let itemsContent = " ";
const itemName = document.querySelector("#itemName");
const itemAmount = document.querySelector("#itemAmount");
const itemsDiv = document.querySelector("#itemsContainer");

function addItem() {
  let newItem = {
    name: itemName.value,
    amount: itemAmount.value,
  };
  items.push(newItem);
  updateItems();
  itemName.value = "";
  itemAmount.value = "";
}
function updateItems() {
  console.log("teste");
  itemsContent = " ";
  for (let i = 0; i < items.length; i++) {
    itemsContent += `<div class="row underLine"><p>${items[i].name}</p> <input class="inputNumber" type="number" min="0" value="${items[i].amount}"> <button onclick="deleteItem(${i})">-</button></div>`;
  }
  itemsDiv.innerHTML = itemsContent;
}

function deleteItem(index) {
  items.splice(index, 1);
  updateItems();
}
//add kit
const kitDiv = document.querySelector(".kitContainer");
const kitName = document.querySelector(".kitName");
let kitContent = " ";

function addKit() {
  kitN = kitName.value;
  kitContent = `<div class="row underLine"><p>${kitN} <p><button  class="hide" onclick="deleteKit()">-</button></div>`;
  updateKit();
  kitName.value = " ";
}

function updateKit() {
  kitDiv.innerHTML = kitContent;
}
function deleteKit() {
  kitDiv.innerHTML = " ";
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
