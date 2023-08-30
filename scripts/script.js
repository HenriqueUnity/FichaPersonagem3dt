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
let nameSaveToJSON;
function setName(name) {
  if (name != null) {
    divname.innerHTML = `<h2>${name}</h2> `;
    console.log(name);
    return;
  }

  if (mainName.value == "" || mainName.value == " ") {
    return;
  }
  divname.innerHTML = `<h2>${mainName.value}</h2> `;
  nameSave = localStorage.setItem("charName", mainName.value);
  nameSaveToJSON = mainName.value;
}

let lock = false;
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
const maxPoints = document.querySelector("#maxCharPoints");
const pointsDiv = document.querySelector(".totalPoints");

// add vantagens

const skillName = document.querySelector(".skillName");
const skillValue = document.querySelector(".skillValue");

function addSkill() {
  let nameSkill = skillName.value;
  let cost = skillValue.value;

  if (nameSkill == "" || nameSkill == " ") {
    return;
  }
  if (cost == "" || cost == " ") {
    cost = 0;
  }
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
  if (nameSkill == "" || nameSkill == " ") {
    return;
  }
  if (cost == "" || cost == " ") {
    cost = 0;
  }

  let newskill = {
    name: nameSkill,
    value: cost,
    bad: true,
  };
  skills.push(newskill);
  updateSkills();
  negativePointsLimit(badSkillsTotal);

  badSkillName.value = "";
  badSkillValue.value = "";
}

//limite de desvantagens
function negativePointsLimit(badTotal) {
  let maxNegative;
  switch (parseInt(maxPoints.value)) {
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
let skillsToJSON;
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
      <button class="hide plus-button" onclick="deleteSkills(${i})"><i class="bi bi-trash"></i></button>`;
    } else {
      content2 += `<p class="underLine" id="${i}">${skills[i].name} (${skills[i].value})</p> 
      <button class="hide plus-button" onclick="deleteSkills(${i})"><i class="bi bi-trash"></i></button>`;
      badSkillsTotal += parseInt(skills[i].value);
    }
  }
  localStorage.setItem("skills", JSON.stringify(skills));
  skillsToJSON = skills;
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
let uniqueSkillToJSon;
function uniqueSkillValue() {
  return uniqueTotalMod.value;
}

let uniqueObject = {
  name: "",
  cost: "",
};
function uniqueSkill(uniqueSkillLoaded) {
  uniqueObject.name = uniqueSkillName.value;
  uniqueObject.cost = uniqueSkillInput.value;
  if (uniqueSkillLoaded) {
    uniqueObject.name = uniqueSkillLoaded.name;
    uniqueObject.cost = uniqueSkillLoaded.cost;
  }
  if (uniqueObject.name == "" || uniqueObject.name == " ") {
    return;
  }
  if (uniqueObject) console.log(uniqueSkillLoaded);
  localStorage.setItem("uniqueSkill", JSON.stringify(uniqueObject));
  uniqueSkillToJSon = uniqueObject;
  uniqueSkilldiv.innerHTML = `<p class="underLine">${uniqueObject.name} (${uniqueObject.cost})</p>`;

  uniqueSkillName.value = "";
  uniqueSkillInput.value = 0;
}

/// contador de pontos totais

function totalPoints() {
  let total = 0;

  for (let i = 0; i < skills.length; i++) {
    total += parseInt(skills[i].value);
  }
  let uniqueSkill = uniqueSkillInput.value;
  total += parseInt(atributesTotalPoints());
  total += parseInt(uniqueSkill);
  total += parseInt(counter);
  total -= parseInt(uniqueSkillValue());

  if (total > maxPoints.value) {
    pointsDiv.innerHTML = `<p class="off-Limits">Pontos excedentes = ${
      (maxPoints.value - total) * -1
    }</p>`;
  } else pointsDiv.innerHTML = `<p>Pontos gastos = ${total}</p>`;

  if (total === parseInt(maxPoints.value)) {
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
let atributesToJSON;
function atributesTotalPoints() {
  let strAtr = str.value;
  let abiAtr = abi.value;
  let resAtr = res.value;
  let armAtr = arm.value;
  let pwrAtr = pwr.value;
  let allAtr = [strAtr, abiAtr, resAtr, armAtr, pwrAtr];
  let allAtrJson = JSON.stringify(allAtr);
  atributesToJSON = allAtr;
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

/// zerar atributos
function atributesToZero() {
  str.value = 0;
  abi.value = 0;
  res.value = 0;
  arm.value = 0;
  pwr.value = 0;
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
  if (magicName.value == "" || magicName.value == " ") {
    return;
  }
  if (magicCost.value == " " || magicCost.value == "") {
    magicCost.value = 0;
  }
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

let magicsToJSON;
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
      magicContent += `<p class="underLine">${magics[i].name}  / Custo ${magics[i].cost} Pm(s)</p> <button class="hide plus-button" onclick="deleteMagic(${i})"><i class="bi bi-trash"></i></button>`;
    }
  } else {
    magicContent = " ";
  }
  magicsToJSON = magics;
  localStorage.setItem("magics", JSON.stringify(magics));
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
let itemsToJSON;
const itemName = document.querySelector("#itemName");
const itemAmount = document.querySelector("#itemAmount");
const itemsDiv = document.querySelector("#itemsContainer");

function addItem() {
  if (itemName.value == "" || itemName.value == " ") {
    return;
  }
  let newItem = {
    name: itemName.value,
    amount: itemAmount.value,
  };
  items.push(newItem);
  itemName.value = "";
  itemAmount.value = "";
  itemsToJSON = items;
  localStorage.setItem("items", JSON.stringify(items));
  updateItems(items);
}
function updateItems(load) {
  if (load) {
    items = load;
  }
  itemsContent = " ";
  for (let i = 0; i < items.length; i++) {
    itemsContent += `<div class="row underLine"><p>${items[i].name}</p> <input class="inputNumber" type="number" min="0" value="${items[i].amount}"> <button onclick="deleteItem(${i})" class="plus-button"><i class="bi bi-trash"></i></button></div>`;
  }
  itemsDiv.innerHTML = itemsContent;
}

function deleteItem(index) {
  items.splice(index, 1);
  updateItems();
}
//add kit  //     kit    //
const kitDiv = document.querySelector(".kitContainer");
const kitName = document.querySelector(".kitName");
const kitPoints = document.querySelector(".kitPointsdiv");
let kitContent = " ";
let kitSave;
let kitList = [];
let kitTotalCost = 0;

function addKit() {
  kitN = kitName.value;
  if (kitN == "" || kitN == " ") {
    return;
  }
  kitList.push(kitN);
  updateKit(null);
  kitName.value = "";
}
let kitToJSON;
function updateKit(kit) {
  if (kit) {
    kitContent = "";
    for (let i = 0; i < kit.length; i++) {
      kitContent += `<div class="row underLine"><p>${kit[i]} <p><button  class="hide plus-button" onclick="deleteKit(${i})"><i class="bi bi-trash"></i></button></div>`;
      kitDiv.innerHTML = kitContent;
    }
    kitCount(kit.length);
    return;
  }
  kitContent = "";
  for (let i = 0; i < kitList.length; i++) {
    kitContent += `<div class="row underLine"><p>${kitList[i]} <p><button class="hide plus-button" onclick="deleteKit(${i})"><i class="bi bi-trash"></i></button></div>`;
  }
  kitDiv.innerHTML = kitContent;
  kitToJSON = kitList;
  kitSave = localStorage.setItem("kit", JSON.stringify(kitList));
  kitCount(kitList.length);
}
function deleteKit(index) {
  kitList.splice(index, 1);
  updateKit(null);
}
let counter = 0;

function kitCount(lenghtCount) {
  if (lenghtCount <= 1) {
    kitPoints.classList.add("infoTemp");
    counter = 0;
    totalPoints();
  } else {
    counter = 0;
    kitPoints.classList.remove("infoTemp");
    console.log(counter);
    for (let i = 1; i < lenghtCount; i++) {
      counter += i;

      kitPoints.innerHTML = `<p>
          Pontos gastos com kits extras = ${counter} </p>`;
    }
    totalPoints();
  }
}
//damage type /// damage type///
const damageSelect = document.querySelector(".strType");
const damageRangedSelect = document.querySelector(".pdfType");
let damageType1;
let damageType2;
function saveTypeDamage() {
  let damageValue = damageSelect.value;
  damageType1 = damageValue;
  localStorage.setItem("damageType1", damageValue);
}

function saveTypeDamage2() {
  let damageRangedValue = damageRangedSelect.value;
  damageType2 = damageRangedValue;
  localStorage.setItem("damageType2", damageRangedValue);
}

function loadTypeDamage() {
  damageSelect.value = localStorage.getItem("damageType1");
  damageRangedSelect.value = localStorage.getItem("damageType2");
}
//Add loreBG
const textAreaInput = document.querySelector(".loreBg");

let loreToJSON;
function saveLore() {
  loreToJSON = textAreaInput.value;
  localStorage.setItem("loreLoad", textAreaInput.value);
  console.log(textAreaInput.value);
}

function loadLore() {
  const loadContent = localStorage.getItem("loreLoad");
  textAreaInput.value = loadContent;
}

//mana health
const liveHP = document.querySelector("#lifeP");
const liveMP = document.querySelector("#magicP");

let HpToJSON;
let MpToJSON;

function saveMPHP() {
  HpToJSON = liveHP.value;
  MpToJSON = liveMP.value;
  localStorage.setItem("hp", liveHP.value);
  localStorage.setItem("mp", liveMP.value);
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
//new save system slot

//TODO continuar sistema melhorado de save
let slot1;
function saveJSON() {
  for (let i = 0; i < slot1.length; i++) {
    const element = array[i];
  }
  slot1 = [
    nameSaveToJSON,
    atributesToJSON,
    skillsToJSON,
    magicsToJSON,
    HpToJSON,
    MpToJSON,
    uniqueSkillToJSon,
    kitToJSON,
    itemsToJSON,
    loreToJSON,
  ];
  localStorage.setItem("slot1", JSON.stringify(slot1));
}

function loadJSON() {
  let loadSlot = JSON.parse(localStorage.getItem("slot1"));
  console.log(loadSlot);
}

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
  kitListParse = JSON.parse(kitLoad);
}

function loadStorage() {
  if (lock) {
    return;
  }
  parseSave();
  setName(charNameLoad);
  updateKit(kitListParse);
  atributesLoad();
  ResistancePointSetter();
  updateMagics(magicsLoad);
  updateSkills(skillParse);
  uniqueSkill(uniqueSkillParse);
  loadLore();
  updateItems(itemsParse);
  loadTypeDamage();
  loadMPHP();
  maxPointsLoad();
  exp.value = localStorage.getItem("exp");
}
function maxPointsLoad() {
  maxPoints.value = localStorage.getItem("maxCharP");
  totalPoints();
}

//clear storage
function clearStorage() {
  clearArrays();
  localStorage.clear();
  location.reload();
  atributesToZero();
}
function clearArrays() {
  magics.length = 0;
  skills.length = 0;
  items.length = 0;
  kitList.length = 0;
  damageRangedSelect.value = "";
  damageSelect.value = "";
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

maxPoints.addEventListener("input", function () {
  localStorage.setItem("maxCharP", maxPoints.value);
  totalPoints();
});

const lockButton = document.querySelector("#lockButton");
const lockImg = document.querySelector("#lockImg");

lockButton.addEventListener("click", function () {
  if (lockImg.classList.contains("bi-lock")) {
    lockImg.classList.remove("bi-lock");
    lockImg.classList.add("bi-lock-fill");
  } else {
    lockImg.classList.remove("bi-lock-fill");
    lockImg.classList.add("bi-lock");
  }
});

const exp = document.querySelector("#exp");

exp.addEventListener("input", function () {
  localStorage.setItem("exp", exp.value);
});
