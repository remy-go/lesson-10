var Render = (function() {

var methods = {},

    navButtons = document.querySelectorAll('.nav-button'),
    loginButton = document.querySelector('.login'),
    registrationButton = document.querySelector('.registration'),
    logoutButton = document.querySelector('.logout'),
    navBar = document.querySelector('nav'),
    content = document.querySelector('#content'),
    blog = Blog,
    storage = Storage;

function printDate(date) {
  return new Date(date).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }); 
}

function pressButton(button) {
  for(var i = 0; i < navButtons.length; i++)
    { navButtons[i].classList.remove('pressed'); } 
  button.classList.add('pressed');
}

function unPressButton(button) {
  button.classList.remove('pressed');
}

function logoutSwitchButton() {
  logoutButton.style.display = 'none';
  loginButton.style.display = 'flex';
}

function loginSwitchButton() {
  logoutButton.style.display = 'flex';
  loginButton.style.display = 'none';
}


function renderRegistrationForm(title) {
var div = document.createElement('div'), form;
div.innerHTML = '<form class="login"  onsubmit="return false">' +
                '<legend><h4>' + 'Registracija' + '</h4></legend>' +
                '<label for="username">Vardas:</label>' +
                '<input type="text" id="username"><br>' +
                '<label for="password">Slaptažodis:</label>' +
                '<input type="password" id="password">' +
                '<button type="submit" id="submit">Registruotis</button>' +
                '</form>';
content.innerHTML = '';
content.appendChild(div);
form = document.querySelector('form');
form.addEventListener('submit', submitRegistrationForm(form));
return div;
}

function submitRegistrationForm(form) {
  var users = storage.getUsers();
  return function() {
    var user = form.elements.username.value;
    var password = form.elements.password.value;
    if (users.hasOwnProperty(user)) {
      var message = document.createElement('div');
      message.innerHTML = 'Yra jau toks!';
        form.appendChild(message);
    } else {
      blog.register(user, password);
      blog.setCurrentUser(user);
      content.innerHTML = '';
      renderPostsOfUser(user);
      loginSwitchButton();
      unPressButton(registrationButton);
    }
  };
}

function renderLoginForm(title) {
var div = document.createElement('div'), form, user;
div.innerHTML = '<form class="login"  onsubmit="return false">' +
                '<legend><h4>' + 'Prisijungimas' + '</h4></legend>' +
                '<label for="username">Vardas:</label>' +
                '<input type="text" id="username"><br>' +
                '<label for="password">Slaptažodis:</label>' +
                '<input type="password" id="password">' +
                '<button type="submit" id="submit">Prisijungti</button>' +
                '</form>';
content.innerHTML = '';
content.appendChild(div);
form = document.querySelector('form');
form.addEventListener('submit', submitLoginForm(form));
return div;
}

function submitLoginForm(form) {
  var users = storage.getUsers();
  return function() {
    var user = form.elements.username.value;
    var password = form.elements.password.value;
    if (users.hasOwnProperty(user) && users[user].password === password) {
      blog.setCurrentUser(user);
      content.innerHTML = '';
      renderPostsOfUser(user);
      loginSwitchButton();
    } else {
      var message = document.createElement('div');
      message.innerHTML = 'Neteisingas prisijungimas!';
      form.appendChild(message);
    }
  };
}

function renderPostForm() {
var div = document.createElement('div'), form, user;
div.innerHTML = '<form class="publish-post"  onsubmit="return false">' +
                '<legend><h4>Naujas įrašas</h4></legend>' +
                '<label for="username">Antraštė: </label>' +
                '<input type="text" id="title"><br>' +
                '<textarea id="text" rows="8"></textarea>' +
                '<button type="submit" id="submit">Skelbti</button>' +
                '</form>';
content.innerHTML = '';
content.appendChild(div);
form = document.querySelector('form');
form.addEventListener('submit', submitPost(form));
return div;
}

function submitPost(form) {
  return function() {
    var posts = storage.getPosts(),
    newPost = {};
    newPost.author = blog.getCurrentUser();
    newPost.date = Date.now();
    newPost.id = newPost.author + '-' + newPost.date;
    newPost.title = form.elements.title.value;
    newPost.content = form.elements.text.value;
    newPost.comments = [];
    posts.push(newPost);
    storage.updatePosts(posts);
    renderPostsOfUser(newPost.author);
  };
}

function renderPost(post) {
  var div = document.createElement('div');
  div.id = post.id;
  div.classList.add('post');
  div.innerHTML = '<img src="images/user-icon.png">' +
                  '<div class="date">' + printDate(post.date) + ' </div>' +
                  '<div class="user"> ' + post.author + '</div>' +
                  '<div class="title"> ' + post.title + '</div>' +
                  '<div class="post-content">' + post.content + '</div>' +
                  '<div class="post-comment-link"><span class="more-less link comment-post">' + ' Komentuoti' + '</span>' + '</div>' +
                  '<div></div>';
  div.appendChild(listComments(post));
  div.children[5].children[0].addEventListener('click', showCommentForm(div, post.id));
  return div;
}

function renderCommentForm(post) {
var form = document.createElement('form');
form.classList.add('publish-post');
form.setAttribute('onsubmit', 'return false');
form.innerHTML = '<legend><h4>Naujas komentaras</h4></legend>' +
                '<textarea id="text" rows="8"></textarea>' +
                '<button type="submit" id="submit">Skelbti</button>';
return form;
}

function showCommentForm(div, post) {
  return function() {
  var form = renderCommentForm();
  div.insertBefore(form, div.childNodes[6]);
  form.addEventListener('submit', submitComment(post, form));
  };
}

function submitComment(postId, form) {
  return function(m) {
    var posts = storage.getPosts(),
        post = posts.find(function(el) { return el.id === postId; }),
        postAuthor = post.author,
        comments = post.comments;
    newComment = {};
    newComment.author = blog.getCurrentUser() || 'Anonymous';
    newComment.date = Date.now();
    newComment.id = newComment.author + '-' + newComment.date;
    newComment.content = form.elements.text.value;
    comments.push(newComment);
    storage.updatePosts(posts);
    renderPostsOfUser(postAuthor);
  };
}

function renderComment(comment) {
  var div = document.createElement('div');
  div.classList.add('comment');
  div.innerHTML = '<div><span class="date">' + printDate(comment.date) + '</span>' +
  '<span class="user">' + comment.author + '</span></div>' +
  '<div class="comment-content">' + comment.content + '</div';
  return div;
}

function listComments(post) {
  var div = document.createElement('div'),
      comments = post.comments;
  div.classList.add('comments');
  for(var i = 0; i < comments.length; i++) {
    div.appendChild(renderComment(comments[i]));
  }
  return div;
}

function renderPostsOfUser(user) {
  var h = document.createElement('h3');
  var posts = storage.getPosts();
  content.innerHTML = '';
  h.innerHTML = 'Autoriaus <em>' + user + '</em> Įrašai';
  content.appendChild(h);
  if(blog.getCurrentUser() === user) 
    { content.appendChild(renderPostForm()); }
  posts = posts.filter(function(post) { return post.author === user; });
  for(i = posts.length - 1; i >= 0; i--) {
    content.appendChild(renderPost(posts[i]));
  }
}


function renderRecentPost(post) {
  var div = document.createElement('div');
  div.classList.add('recent-post');
  div.id = post.id;
  div.innerHTML = '<img src="images/user-icon.png">' +
                  '<div class="date">' + printDate(post.date) + '</div>' +
                  '<div><span class="author link">' + post.author + '</span></div>' +
                  '<div><span class="title link">' + post.title + '</span></div>';
  div.children[2].addEventListener('click', function() { renderPostsOfUser(post.author); });
  div.children[3].addEventListener('click', function() { renderPostsOfUser(post.author);
                                                         document.getElementById(div.id)
                                                         .scrollIntoView(); });
  return div;
}

function listRecentPosts() {
  var posts = storage.getPosts();
  var last = posts.length - 1;
  content.innerHTML = '';
  for(var i = 0; i <= 2; i++) {
    content.appendChild(renderRecentPost(posts[last - i]));
  }
}

function renderUserListEntry(user) {
  var div = document.createElement('div');
  div.id = user;
  div.classList.add('user-list-entry');
  div.innerHTML = '<img src="images/user-icon.png">' +
                  '<div><span class="link author">' + user + '</span></div>';
  div.children[1].addEventListener('click', function() { renderPostsOfUser(user); });
  return div;
}

function listUsers() {
  var users = storage.getUsers();
  content.innerHTML = '';
  for(var user in users) {
    content.appendChild(renderUserListEntry(user));
  }
}

function getLogoutButton() { return logoutButton; }

methods = { 
  date: printDate,
  pressButton: pressButton,
  unPressButton: unPressButton,
  logoutSwitchButton: logoutSwitchButton,
  loginSwitchButton: loginSwitchButton,
  registrationForm: renderRegistrationForm,
  loginForm: renderLoginForm,
  postForm: renderPostForm,
  post: renderPost,
  commentForm: showCommentForm,
  comment: renderComment,
  commentsList: listComments,
  postsOfUser: renderPostsOfUser,
  recentPosts: listRecentPosts,
  userList: listUsers,
  getLogoutButton: getLogoutButton
};

return methods;
})();
