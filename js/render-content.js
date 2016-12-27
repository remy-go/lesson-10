var RenderContentModule = (function() {

var navButtons = document.querySelectorAll('.nav-button'),
    content = document.querySelector('#content'),
    NavButtonStyle = NavButtonStyleModule,
    UserState = UserStateModule,
    BlogData = BlogDataModule,
    Storage = StorageModule;

function createPostFormHTML() {
var form = document.createElement('form');
form.classList.add('publish-post');
form.setAttribute('onsubmit', 'return false');
form.innerHTML = '<legend><h4>Naujas įrašas</h4></legend>' +
                 '<label for="username">Antraštė: </label>' +
                 '<input type="text" id="title"><br>' +
                 '<textarea id="text" rows="8"></textarea>' +
                 '<button type="submit" id="submit">Skelbti</button>';
return form;
}

function createPostHTML(post) {
  var div = document.createElement('div');
  div.id = post.id;
  div.classList.add('post');
  div.innerHTML = '<img src="images/user-icon.png">' +
                  '<div class="date">' + BlogData.printDate(post.date) + ' </div>' +
                  '<div class="user"> ' + post.author + '</div>' +
                  '<div class="title"> ' + post.title + '</div>' +
                  '<div class="post-content">' + post.content + '</div>' +
                  '<div class="post-comment-link"><span class="more-less link comment-post">' + ' Komentuoti' + '</span>' + '</div>' +
                  '<div></div>';
  div.appendChild(createCommentsHTML(post));
  div.children[5].children[0].addEventListener('click', renderCommentForm(div, post));
  return div;
}

function createCommentFormHTML(post) {
var form = document.createElement('form');
form.classList.add('publish-post');
form.setAttribute('onsubmit', 'return false');
form.innerHTML = '<legend><h4>Naujas komentaras</h4></legend>' +
                '<textarea id="text" rows="8"></textarea>' +
                '<button type="submit" id="submit">Skelbti</button>';
return form;
}

function renderCommentForm(div, post) {
  return function() {
  var form = createCommentFormHTML(post);
  div.insertBefore(form, div.childNodes[6]);
  form.addEventListener('submit', function() { submitComment(post, form); });
  };
}

function submitComment(post, form) {
    var author = UserState.getCurrentUser() || 'Anonymous',
        content = form.elements.text.value;
    BlogData.addComment(post.id, author, content);
    renderPostsOfUser(post.author);
}

function createCommentHTML(comment) {
  var div = document.createElement('div');
  div.classList.add('comment');
  div.innerHTML = '<div><span class="date">' + BlogData.printDate(comment.date) + '</span>' +
  '<span class="user">' + comment.author + '</span></div>' +
  '<div class="comment-content">' + comment.content + '</div';
  return div;
}

function createCommentsHTML(post) {
  var div = document.createElement('div'),
      comments = post.comments;
  div.classList.add('comments');
  for(var i = 0; i < comments.length; i++) {
    div.appendChild(createCommentHTML(comments[i]));
  }
  return div;
}

function renderPostsOfUser(user) {
  var h = document.createElement('h3');
  var posts = Storage.getPosts();
  content.innerHTML = '';
  h.innerHTML = 'Autoriaus <em>' + user + '</em> Įrašai';
  content.appendChild(h);
  if(UserState.getCurrentUser() === user) {
    var form = createPostFormHTML();
    content.appendChild(form);
    form.addEventListener('submit', function() { submitPost(form); });
  }
  posts = posts.filter(function(post) { return post.author === user; });
  for(i = posts.length - 1; i >= 0; i--) {
    content.appendChild(createPostHTML(posts[i]));
  }
}

function submitPost(form) {
    var author = UserState.getCurrentUser(),
        title = form.elements.title.value,
        content = form.elements.text.value;
    BlogData.addPost(author, title, content);
    renderPostsOfUser(author);
}

function createRecentPostHTML(post) {
  var div = document.createElement('div');
  div.classList.add('recent-post');
  div.id = post.id;
  div.innerHTML = '<img src="images/user-icon.png">' +
                  '<div class="date">' + BlogData.printDate(post.date) + '</div>' +
                  '<div><span class="author link">' + post.author + '</span></div>' +
                  '<div><span class="title link">' + post.title + '</span></div>';
  div.children[2].addEventListener('click', function() { renderPostsOfUser(post.author); });
  div.children[3].addEventListener('click', function() { renderPostsOfUser(post.author);
                                                         document.getElementById(div.id)
                                                         .scrollIntoView(); });
  return div;
}

function renderRecentPosts() {
  var posts = Storage.getPosts();
  var last = posts.length - 1;
  content.innerHTML = '';
  for(var i = 0; i <= 2; i++) {
    content.appendChild(createRecentPostHTML(posts[last - i]));
  }
}

function createUserListEntryHTML(user) {
  var div = document.createElement('div');
  div.id = user;
  div.classList.add('user-list-entry');
  div.innerHTML = '<img src="images/user-icon.png">' +
                  '<div><span class="link author">' + user + '</span></div>';
  div.children[1].addEventListener('click', function() { renderPostsOfUser(user); });
  return div;
}

function renderUserList() {
  var users = Storage.getUsers();
  content.innerHTML = '';
  for(var user in users) {
    content.appendChild(createUserListEntryHTML(user));
  }
}

return { 
  renderPostsOfUser: renderPostsOfUser,
  renderRecentPosts: renderRecentPosts,
  renderUserList: renderUserList
};

})();
