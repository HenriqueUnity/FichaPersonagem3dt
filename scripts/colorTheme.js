const themeMain = document.querySelector(".theme");
// const colorTheme1 = "colorTheme1";
// const colorTheme2 = "colorTheme2";
// const colorTheme3 = "colorTheme3";
// const colorTheme4 = "colorTheme4";
let themeActive = "colorTheme1";

function changeTheme(theme) {
  themeMain.classList.remove(themeActive);

  themeActive = theme;
  themeMain.classList.add(theme);
}
