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
let nameSave;
function setName(name) {
  if (name != null) {
    divname.innerHTML = `<h2>${name}</h2> `;
    console.log(name);
    return;
  }
  divname.innerHTML = `<h2>${mainName.value}</h2> `;
  nameSave = localStorage.setItem("charName", mainName.value);
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

function updateSkills(skillsLoaded) {
  let content = "";
  let content2 = "";
  badSkillsTotal = 0;

  if (skillsLoaded && skillsLoaded.length > 0) {
    skills = skillsLoaded;
  }
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
  let skillSave = localStorage.setItem("skills", JSON.stringify(skills));
  container.innerHTML = content;
  container2.innerHTML = content2;
  totalPoints();
}

function deleteSkills(index) {
  skills.splice(index, 1);
  updateSkills();
}
///Vantagem unica  Unique Skill  \\\\\\\\\\\\\\\\\

const uniqueSkillName = document.querySelector(".uniqueName");
const uniqueSkillInput = document.querySelector(".uniqueSkillValue");
const uniqueSkilldiv = document.querySelector(".uniqueSkillContainer");
const uniqueTotalMod = document.querySelector(".uniqueSkillPoints");

function uniqueSkillValue() {
  return uniqueTotalMod.value;
}

function uniqueSkill(uniqueSkillLoaded) {
  let uniqueObject = {
    name: "",
    cost: "",
  };

  uniqueObject.name = uniqueSkillName.value;
  uniqueObject.cost = uniqueSkillInput.value;
  if (uniqueSkillLoaded) {
    uniqueObject.name = uniqueSkillLoaded.name;
    uniqueObject.cost = uniqueSkillLoaded.cost;
  }
  if (uniqueObject.name == "") {
    uniqueObject.name = "Humano";
  }
  let saveUniqueSkill = localStorage.setItem(
    "uniqueSkill",
    JSON.stringify(uniqueObject)
  );
  uniqueSkilldiv.innerHTML = `<p class="underLine">${uniqueObject.name} (${uniqueObject.cost})</p>`;

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
let atrSave;
const str = document.querySelector("#strenghtAtri");
const abi = document.querySelector("#abilityAtri");
const res = document.querySelector("#resistanceAtri");
const arm = document.querySelector("#armorAtri");
const pwr = document.querySelector("#rangedAtri");

function atributesLoad() {
  let atributes = JSON.parse(localStorage.getItem("atributes"));

  str.value = atributes[0];
  abi.value = atributes[1];
  res.value = atributes[2];
  arm.value = atributes[3];
  pwr.value = atributes[4];
}
function atributesTotalPoints() {
  let strAtr = str.value;
  let abiAtr = abi.value;
  let resAtr = res.value;
  let armAtr = arm.value;
  let pwrAtr = pwr.value;
  let allAtr = [strAtr, abiAtr, resAtr, armAtr, pwrAtr];
  let allAtrJson = JSON.stringify(allAtr);
  atrSave = localStorage.setItem("atributes", allAtrJson);
  console.log(JSON.parse(allAtrJson));

  let total =
    parseInt(strAtr) +
    parseInt(abiAtr) +
    parseInt(resAtr) +
    parseInt(armAtr) +
    parseInt(pwrAtr);

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

// magias iniciais // default
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
    updateMagics(null);
  } else {
    initialMagicsContent = "";
    showInitial = false;
    updateMagics(null);
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
  updateMagics(null);
  magicName.value = " ";
  magicCost.value = 0;
}

function updateMagics(magicsLoad) {
  magicContent = "";
  if (magicsLoad) {
    let load = JSON.parse(magicsLoad);
    if (magicsLoad || load.length > 0) {
      magics = load;
    }
  }

  if (magics.length > 0) {
    for (let i = 0; i < magics.length; i++) {
      magicContent += `<p class="underLine">${magics[i].name}  / Custo ${magics[i].cost} Pm(s)</p> <button class="hide" onclick="deleteMagic(${i})">-</button>`;
    }
  } else {
    magicContent = " ";
  }

  let magicsSave = localStorage.setItem("magics", JSON.stringify(magics));
  magicContent += initialMagicsContent;
  magicContainer.innerHTML = magicContent;
}

function deleteMagic(index) {
  magics.splice(index, 1);
  updateMagics(null);
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
  itemName.value = "";
  itemAmount.value = "";
  localStorage.setItem("items", JSON.stringify(items));
  updateItems(items);
}
function updateItems(load) {
  if (load) {
    items = load;
  }
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
let kitSave;

function addKit() {
  kitN = kitName.value;
  kitContent = `<div class="row underLine"><p>${kitN} <p><button  class="hide" onclick="deleteKit()">-</button></div>`;
  updateKit(null);
  kitName.value = " ";
}

function updateKit(kit) {
  if (kit) {
    kitDiv.innerHTML = `<div class="row underLine"><p>${kit} <p><button  class="hide" onclick="deleteKit()">-</button></div>`;
    return;
  }
  kitDiv.innerHTML = kitContent;
  kitSave = localStorage.setItem("kit", kitName.value);
}
function deleteKit() {
  kitDiv.innerHTML = "";
  kitSave = localStorage.removeItem("kit");
}
//damage type /// damage type///
const damageSelect = document.querySelector(".strType");
const damageRangedSelect = document.querySelector(".pdfType");
function saveTypeDamage() {
  let damageValue = damageSelect.value;
  localStorage.setItem("damageType1", damageValue);
}

function saveTypeDamage2() {
  let damageRangedValue = damageRangedSelect.value;
  localStorage.setItem("damageType2", damageRangedValue);
}

function loadTypeDamage() {
  damageSelect.value = localStorage.getItem("damageType1");
  damageRangedSelect.value = localStorage.getItem("damageType2");
}
//Add loreBG
const textAreaInput = document.querySelector(".loreBg");

function saveLore() {
  const saveLore = localStorage.setItem("loreLoad", textAreaInput.value);
  console.log(textAreaInput.value);
}

function loadLore() {
  const loadContent = localStorage.getItem("loreLoad");
  textAreaInput.value = loadContent;
}

//mana health
const liveHP = document.querySelector("#lifeP");
const liveMP = document.querySelector("#magicP");

function saveMPHP() {
  let hpSave = localStorage.setItem("hp", liveHP.value);
  let mpSave = localStorage.setItem("mp", liveMP.value);
}

function loadMPHP() {
  liveHP.value = localStorage.getItem("hp");
  liveMP.value = localStorage.getItem("mp");
}

liveHP.addEventListener("input", function () {
  saveMPHP();
});
liveMP.addEventListener("input", function () {
  saveMPHP();
});
//localStorage

const charNameLoad = localStorage.getItem("charName");
const kitLoad = localStorage.getItem("kit");
const magicsLoad = localStorage.getItem("magics");
const skillsLoad = localStorage.getItem("skills");
const uniqueSkillLoad = localStorage.getItem("uniqueSkill");
const loreLoad = localStorage.getItem("loreLoad");
const itemLoad = localStorage.getItem("items");
let skillParse;
let uniqueSkillParse;
let itemsParse;
function parseSave() {
  skillParse = JSON.parse(skillsLoad);
  uniqueSkillParse = JSON.parse(uniqueSkillLoad);
  itemsParse = JSON.parse(itemLoad);
}

function loadStorage() {
  parseSave();
  setName(charNameLoad);
  updateKit(kitLoad);
  atributesLoad();
  ResistancePointSetter();
  updateMagics(magicsLoad);
  updateSkills(skillParse);
  uniqueSkill(uniqueSkillParse);
  loadLore();
  updateItems(itemsParse);
  loadTypeDamage();
  loadMPHP();
}
//clear storage
function clearStorage() {
  localStorage.clear();
}

// eventos
//damage type change
damageSelect.addEventListener("change", function () {
  saveTypeDamage();
  console.log(damageSelect.value);
});
damageRangedSelect.addEventListener("change", function () {
  saveTypeDamage2();
  console.log(damageRangedSelect.value);
});

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
