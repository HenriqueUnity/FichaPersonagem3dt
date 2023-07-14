function LockUnlock() {
  let atributes = document.getElementsByClassName("atribute");
  for (let index = 0; index < atributes.length; index++) {
    atributes[index].disabled = !event.target.checked;
    console.log(atributes[index]);
  }
}
