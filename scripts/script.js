/// lock atributes  unlock atributes ///
const atributes = document.getElementsByClassName("lock");
let lock = false;

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

//setar nome  ///set Name
const mainName = document.querySelector(".mainName");
const divname = document.querySelector(".nameDiv");
let nameSaveToJSON;

function setName(name) {
  console.log(name);
  if (name != null) {
    divname.innerHTML = `<h2>${name}</h2> `;
    nameSaveToJSON = name;
    mainName.value = "";
    return;
  }
  if (mainName.value == "" || mainName.value == " ") {
    return;
  }

  divname.innerHTML = `<h2>${mainName.value}</h2> `;
  nameSaveToJSON = mainName.value;
  mainName.value = "";
}

function saveName() {
  if (!nameSaveToJSON) {
    nameSaveToJSON = mainName.value;
    return;
  } else {
    return;
  }
}
function loadName() {
  charName = loadSlot[0];
  console.log(`load ${charName}`);
  setName(charName);
  nameSaveToJSON = charName;
}

///atributes elements setup ///

const str = document.querySelector("#strenghtAtri");
const abi = document.querySelector("#abilityAtri");
const res = document.querySelector("#resistanceAtri");
const arm = document.querySelector("#armorAtri");
const pwr = document.querySelector("#rangedAtri");

function atributesLoad(load) {
  let atributes = load;

  str.value = atributes[0];
  abi.value = atributes[1];
  res.value = atributes[2];
  arm.value = atributes[3];
  pwr.value = atributes[4];
}
let atributesToJSON;
let allAtr;

function allAtributesSet() {
  let strAtr = str.value;
  let abiAtr = abi.value;
  let resAtr = res.value;
  let armAtr = arm.value;
  let pwrAtr = pwr.value;
  allAtr = [strAtr, abiAtr, resAtr, armAtr, pwrAtr];
}
function atributesTotalPoints() {
  allAtributesSet();
  let total =
    parseInt(allAtr[0]) +
    parseInt(allAtr[1]) +
    parseInt(allAtr[2]) +
    parseInt(allAtr[3]) +
    parseInt(allAtr[4]);
  return total;
}

function saveAtributes() {
  allAtributesSet();
  atributesToJSON = allAtr;
}

/// zerar atributos  default atributes ///
function atributesToZero() {
  str.value = 0;
  abi.value = 0;
  res.value = 0;
  arm.value = 0;
  pwr.value = 0;
}

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
///skills   /// vantagens /// skills

let skills = [];
let container = document.querySelector(".skillContainer");
let container2 = document.querySelector(".badskillContainer");
let badSkillsTotal;
const maxPoints = document.querySelector("#maxCharPoints");
const pointsDiv = document.querySelector(".totalPoints");

///  add vantagens /// add skills

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
/// add desvantages /// bad skills
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

/// limite de desvantagens /// bad skills limit ///

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
/// update html skills /// save let to JSON file ///

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
  skillsToJSON = skills;
  container.innerHTML = content;
  container2.innerHTML = content2;
  totalPoints();
}

function deleteSkills(index) {
  skills.splice(index, 1);
  updateSkills();
}
/// Vantagem unica /// Unique Skill  ///

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

/// container das magias
let showInitial = false;
let magics = [];
const magicContainer = document.querySelector(".magicContainer");
const magicName = document.querySelector(".magicName");
const magicCost = document.querySelector(".magicCost");
let magicContent = " ";
let initialMagicsContent = "";
let initialMagics = [];

/// magias iniciais /// default magics ///
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

/// adicionar magias  /// add magics ///

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

/// update magics html and save JSON file ///

let magicsToJSON;

function updateMagics(magicsLoad) {
  magicContent = "";
  if (magicsLoad) {
    if (magicsLoad.length > 0) {
      magics = magicsLoad;
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
  magicContent += initialMagicsContent;
  magicContainer.innerHTML = magicContent;
}

function deleteMagic(index) {
  magics.splice(index, 1);
  updateMagics(null);
}

/// add itens /// adicionar items ///

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
  itemsToJSON = items;
}

function deleteItem(index) {
  items.splice(index, 1);
  updateItems();
}
/// add adventurer kit  ///  adicionar  kit de aventureiro  ///

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
    kitToJSON = kit;
    kitCount(kit.length);
    return;
  }
  kitContent = "";
  for (let i = 0; i < kitList.length; i++) {
    kitContent += `<div class="row underLine"><p>${kitList[i]} <p><button class="hide plus-button" onclick="deleteKit(${i})"><i class="bi bi-trash"></i></button></div>`;
  }
  kitDiv.innerHTML = kitContent;
  kitToJSON = kitList;
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
/// save damage type /// salvar tipos de danos ///
const damageSelect = document.querySelector(".strType");
const damageRangedSelect = document.querySelector(".pdfType");
let damageType1;
let damageType2;
let damageTypeJSON;

function saveTypeDamage() {
  damageType1 = damageSelect.value;
  damageType2 = damageRangedSelect.value;
  damageTypeJSON = { type1: damageType1, type2: damageType2 };
}
function loadTypeDamage(load) {
  damageSelect.value = load.type1;
  damageRangedSelect.value = load.type2;
}

/// save lore save background /// salvar historia do personagem ///

const textAreaInput = document.querySelector(".loreBg");
let loreToJSON;

function saveLore() {
  loreToJSON = textAreaInput.value;
}

function loadLore(loadContent) {
  textAreaInput.value = loadContent;
  loreToJSON = loadContent;
}

//mana health
const liveHP = document.querySelector("#lifeP");
const liveMP = document.querySelector("#magicP");

let HpToJSON;
let MpToJSON;

function saveMPHP() {
  HpToJSON = liveHP.value;
  MpToJSON = liveMP.value;
}

function loadMPHP(loadHP, loadMP) {
  liveHP.value = loadHP;
  liveMP.value = loadMP;
  HpToJSON = liveHP.value;
  MpToJSON = liveMP.value;
}

liveHP.addEventListener("input", function () {
  saveMPHP();
});
liveMP.addEventListener("input", function () {
  saveMPHP();
});

/// save experience points /// salvar o precioso xp ///
const exp = document.querySelector("#exp");
let expJSON;

function saveExp() {
  expJSON = exp.value;
}

function loadExp(load) {
  exp.value = load;
}

//new save system slot

const slot = document.querySelectorAll(".slot");
let slotActive;
function setSlot(value) {
  slotActive = value;
  console.log(value);
  if (lock) {
    lockUnlockHidden();
    loadJSON();
    lockUnlockHidden();
  }
  loadJSON();
}
function saveJSON() {
  alert("Salvou sua ficha parabéns!");
  saveAll();
  let newSave = [
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
    maxPointsJSON,
    damageTypeJSON,
    expJSON,
    doneStatusJSON,
  ];
  localStorage.setItem(`slot${slotActive}`, JSON.stringify(newSave));
  console.log(`save slot${slotActive}`);
}

function saveAll() {
  saveLore();
  saveMaxpointsToJSON();
  saveTypeDamage();
  saveExp();
  saveAtributes();
  saveMPHP();
  saveName();
  saveDoneStatus();
}

let loadSlot;
function acessJSON() {
  loadSlot = JSON.parse(localStorage.getItem(`slot${slotActive}`));
  if (loadSlot) {
    return loadSlot;
  }
}
function loadJSON() {
  if (lock) {
    return;
  }

  loadSlot = JSON.parse(localStorage.getItem(`slot${slotActive}`));
  if (!loadSlot) {
    return;
  }
  console.log(`load slot${slotActive}`);
  loadName();
  atributesLoad(loadSlot[1]);
  updateSkills(loadSlot[2]);
  updateMagics(loadSlot[3]);
  loadMPHP(loadSlot[4], loadSlot[5]);
  uniqueSkill(loadSlot[6]);
  updateKit(loadSlot[7]);
  updateItems(loadSlot[8]);
  loadLore(loadSlot[9]);
  maxPointsLoad(loadSlot[10]);
  loadTypeDamage(loadSlot[11]);
  loadExp(loadSlot[12]);
  ResistancePointSetter();
  loadDoneStatus(loadSlot[13]);
}

/// load maxpoints select /// carrega o seletor de pontos maximos ///
let maxPointsJSON;
function saveMaxpointsToJSON() {
  maxPointsJSON = parseInt(maxPoints.value);
  console.log(maxPointsJSON);
}

function maxPointsLoad(load) {
  maxPoints.value = load;
  totalPoints();
}

/// clear storage
function clearStorage() {
  clearArrays();
  localStorage.clear();
  location.reload();
  atributesToZero();
  ResistancePointSetter();
}
function clearArrays() {
  magics.length = 0;
  skills.length = 0;
  items.length = 0;
  kitList.length = 0;
  damageRangedSelect.value = "";
  damageSelect.value = "";
}
///done sheet /// ficha pronta

let doneStatusJSON;
const inputCheckbox = document.querySelector("#done");
const pointsTotaldiv = document.querySelector(".totalPoints");
function saveDoneStatus() {
  if (inputCheckbox.checked) {
    doneStatusJSON = true;
  } else {
    doneStatusJSON = false;
  }
}
function loadDoneStatus(done) {
  if (done) {
    inputCheckbox.checked = true;
  } else {
    inputCheckbox.checked = false;
  }
  checkboxCheck();
}
function checkboxCheck() {
  if (inputCheckbox.checked) {
    pointsTotaldiv.classList.add("alwayshidden");
  } else {
    pointsTotaldiv.classList.remove("alwayshidden");
  }
}
inputCheckbox.addEventListener("input", function () {
  checkboxCheck();
});

// eventos
// faz o calculo quando cade input tem valor alterado
const inputsNumber = document.querySelectorAll(".atr");

for (let i = 0; i < inputsNumber.length; i++) {
  inputsNumber[i].addEventListener("input", function () {
    totalPoints();
  });
}

//evento para calcular pontos assim q seleciona o select

maxPoints.addEventListener("input", function () {
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
