(function() {

var InitialData = InitialDataModule;


function initiateUsers() {
  if(!localStorage.users) {
    var users = InitialData.users();
    localStorage.users = JSON.stringify(users);
  }
}

function initiatePosts() {
  if(!localStorage.posts) {
  var posts = InitialData.posts();
  localStorage.posts = JSON.stringify(posts);
  }
}

initiateUsers();
initiatePosts();

})();
