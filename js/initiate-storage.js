(function() {


function initiateUsers() {
  if(!localStorage.users) {
    var users = Users;
    localStorage.users = JSON.stringify(users);
  }
}

function initiatePosts() {
  if(!localStorage.posts) {
  var posts = Posts;
  localStorage.posts = JSON.stringify(posts);
  }
}

initiateUsers();
initiatePosts();

})();
