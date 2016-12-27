var RenderLoginRegisterModule = (function() {

var registrationButton = document.querySelector('.registration'),
    content = document.querySelector('#content'),
    NavButtonStyle = NavButtonStyleModule,
    RenderContent = RenderContentModule,
    UserState = UserStateModule,
    BlogData = BlogDataModule,
    Storage = StorageModule;

function renderRegistrationForm() {
var form = document.createElement('form');
form.classList.add('login');
form.setAttribute('onsubmit', 'return false');
form.innerHTML = '<legend><h4>' + 'Registracija' + '</h4></legend>' +
                 '<label for="username">Vardas:</label>' +
                 '<input type="text" id="username"><br>' +
                 '<label for="password">Slaptažodis:</label>' +
                 '<input type="password" id="password">' +
                 '<button type="submit" id="submit">Registruotis</button>';
content.innerHTML = '';
content.appendChild(form);
form.addEventListener('submit', function() { submitRegistrationForm(form); });
}

function submitRegistrationForm(form) {
  var users = Storage.getUsers();
    var user = form.elements.username.value;
    var password = form.elements.password.value;
    if (users.hasOwnProperty(user)) {
      var message = document.createElement('div');
      message.innerHTML = 'Yra jau toks!';
        form.appendChild(message);
    } else {
      UserState.register(user, password);
      content.innerHTML = '';
      RenderContent.renderPostsOfUser(user);
      NavButtonStyle.loginSwitchButton();
      NavButtonStyle.unPressButton(registrationButton);
    }
}

function renderLoginForm() {
var form = document.createElement('form');
form.classList.add('login');
form.setAttribute('onsubmit', 'return false');
form.innerHTML = '<legend><h4>' + 'Prisijungimas' + '</h4></legend>' +
                 '<label for="username">Vardas:</label>' +
                 '<input type="text" id="username"><br>' +
                 '<label for="password">Slaptažodis:</label>' +
                 '<input type="password" id="password">' +
                 '<button type="submit" id="submit">Prisijungti</button>';
content.innerHTML = '';
content.appendChild(form);
form.addEventListener('submit', function() { submitLoginForm(form); });
}

function submitLoginForm(form) {
  var users = Storage.getUsers();
    var user = form.elements.username.value;
    var password = form.elements.password.value;
    if (users.hasOwnProperty(user) && users[user].password === password) {
      UserState.login(user, password);
      content.innerHTML = '';
      RenderContent.renderPostsOfUser(user);
      NavButtonStyle.loginSwitchButton();
    } else {
      var message = document.createElement('div');
      message.innerHTML = 'Neteisingas prisijungimas!';
      form.appendChild(message);
    }
}

return { 
  renderRegistrationForm: renderRegistrationForm,
  renderLoginForm: renderLoginForm
};

})();
