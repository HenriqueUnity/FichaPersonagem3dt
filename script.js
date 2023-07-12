function ResPointSetter() {
  let resAtri = document.getElementById("resistanceAtri");
  let res = resAtri.value;
  SetMaxLifeMagic(res);
}

function SetMaxLifeMagic(res) {
  let life = document.getElementById("maxLife");
  let magic = document.getElementById("maxMagic");
  let defaultMultiplier = 5;
  if (res == 0) {
    life.value = 1;
    magic.value = 1;
  } else {
    life.value = res * defaultMultiplier;
    magic.value = res * defaultMultiplier;
  }
}
