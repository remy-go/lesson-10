var UserStateModule = (function() { 

var Storage = StorageModule,
    BlogData = BlogDataModule;


var currentUser = (function() {
  var user = null;
  function getCurrentUser() {
    return user;
  }
  function setCurrentUser(newUser) {
    user = newUser;
  }
  return { getUser: getCurrentUser, setUser: setCurrentUser };
})();
    
function login(user, password) {
  var users = Storage.getUsers();
  if(users.hasOwnProperty(user) && users[user].password === password) {
  currentUser.setUser(user);
  }
}

function logout() {
  currentUser.setUser(null);
}

function register(user, password) {
  var users = Storage.getUsers();
  if(!users.hasOwnProperty(user)) {
    BlogData.addUser(user, password);
    currentUser.setUser(user);
  }
}

return {
  getCurrentUser: currentUser.getUser,
  setCurrentUser: currentUser.setUser,
  login: login,
  logout: logout,
  register: register
};

})();
