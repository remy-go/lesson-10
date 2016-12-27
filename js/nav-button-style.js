var NavButtonStyleModule = (function() {

var loginButton = document.querySelector('.login'),
    registrationButton = document.querySelector('.registration'),
    navButtons = document.querySelectorAll('.nav-button'),
    logoutButton = document.querySelector('.logout');

function pressButton(button) {
  for(var i = 0; i < navButtons.length; i++)
    { navButtons[i].classList.remove('pressed'); } 
  button.classList.add('pressed');
}

function unPressButton(button) {
  button.classList.remove('pressed');
}

function logoutSwitchButton() {
  logoutButton.classList.toggle('removed');
  loginButton.classList.toggle('removed');
  registrationButton.classList.toggle('removed');
}

function loginSwitchButton() {
  logoutSwitchButton();
}

return {
  pressButton: pressButton,
  unPressButton: unPressButton,
  logoutSwitchButton: logoutSwitchButton,
  loginSwitchButton: loginSwitchButton
};


})();
