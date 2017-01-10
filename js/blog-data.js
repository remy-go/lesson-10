var BlogDataModule = (function() {
var Storage = StorageModule;



function addUser(name, password) {
  var users = Storage.getUsers();
  users[name] = {};
  users[name].name = name;
  users[name].password = password;
  Storage.updateUsers(users);
}

function removeUser(name) {
  var users = Storage.getUsers();
  delete users[name];
  Storage.updateUsers(users);
}

function addPost(user, title, content) {
  var posts = Storage.getPosts(),
      date = Date.now(),
      id = user + '-' + date;

  posts.push({ "id": id, "author": user, "date": date, "title": title, "content": content, comments: [] });
  Storage.updatePosts(posts);
}

function removePost(id) {
  var posts = Storage.getPosts();
  posts =  posts.filter(function(post) { return (post[id] !== id); });
}

function addComment(postId, user, content) {
  var date = Date.now(),
      posts = Storage.getPosts(),
      id = user + '-' + date,
      post = posts.find(function(post) {
    return (post.id === postId);
  });
  post.comments.push({ "id": id, "author": user, "date": date, "content": content });
  Storage.updatePosts(posts);
}
  

return {
  addUser: addUser,
  removeUser: removeUser,
  addPost: addPost,
  removePost: removePost,
  addComment: addComment
};

})();
