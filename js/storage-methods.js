var Storage = (function() {

  
function getUsers() { 
  return JSON.parse(localStorage.users);
}

function getPosts() {
  return JSON.parse(localStorage.posts);
}

function updateUsers(users) { 
  localStorage.users = JSON.stringify(users);
}

function updatePosts(posts) { 
  localStorage.posts = JSON.stringify(posts);
}

return {
  getUsers: getUsers,
  getPosts: getPosts,
  updateUsers: updateUsers,
  updatePosts: updatePosts
};

})();
