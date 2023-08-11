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

function addSkill() {
  let skillName = document.querySelector(".skillName").value;
  let skillValue = document.querySelector(".skillValue").value;
  let container = document.querySelector(".skillContainer");
  let newskill = {
    name: skillName,
    value: skillValue,
  };

  skills.push(newskill);

  for (let i = 0; i < skills.length; i++) {
    container.innerHTML = `<p>${skills[i].name}</p>`;
    console.log("teste");
  }
}
