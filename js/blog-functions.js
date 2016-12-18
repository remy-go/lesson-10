var Blog = (function() {
var storage = Storage;

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
  //var users = storage.getUsers();
  //if(users.hasOwnProperty(user) && users.user.password === password) {
  currentUser().setUser(user);
  //}
}

function logout() {
  currentUser.setUser(null);
}

function register(user, password) {
  var users = storage.getUsers();
  if(!users.hasOwnProperty(user)) {
    users[user] = {};
    users[user].name = user;
    users[user].password = password;
    storage.updateUsers(users);
  }
}

function addUser(name, password) {
  var users = storage.getUsers();
  users[name] = { name: name, password: password };
  storage.updateUsers();
}

function removeUser(name) {
  var users = storage.getUsers();
  delete users[name];
  storage.updateUsers(users);
}

function addPost(user, title, content) {
  var posts = storage.getPosts(),
      date = Date.now(),
      id = user + '-' + date;

  posts.push({ "id": id, "author": user, "date": date, "title": title, "content": content, comments: [] });
  storage.updatePosts(posts);
}

function removePost(id) {
  var posts = storage.getPosts();
  posts =  posts.filter(function(post) { return (post[id] !== id); });
}

function addComment(postId, user, content) {
  var date = Date.now(),
      posts = storage.getPosts(),
      id = user + '-' + date,
      post = posts.find(function(post) {
    return (post.id === postId);
  });
  post.comments.push({ "id": id, "author": user, "date": date, "content": content });
  storage.updatePosts(posts);
}
  

var methods = {
  getCurrentUser: currentUser.getUser,
  setCurrentUser: currentUser.setUser,
  login: login,
  logout: logout,
  register: register,
  addUser: addUser,
  removeUser: removeUser,
  addPost: addPost,
  removePost: removePost,
  addComment: addComment
};

return methods;

})();
