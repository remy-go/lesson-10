(function() {
var content = document.querySelector('#content'),
    navButtons = document.querySelectorAll('.nav-button'),
    recentPostsButton = document.querySelector('.recent-posts'),
    usersButton = document.querySelector('.users'),
    loginButton = document.querySelector('.login'),
    logoutButton = document.querySelector('nav .logout'),
    registrationButton = document.querySelector('.registration'),
    currentUser = 'null',
    
    storage = Storage,
    blog = Blog,
    render = Render;


function listenButton(button, action, actionArg1, actionArg2, actionArg3) {
  return function() { render.pressButton(button); action(actionArg1, actionArg2, actionArg3); };
}

recentPostsButton.addEventListener('click', listenButton(recentPostsButton, render.recentPosts));
usersButton.addEventListener('click', listenButton(usersButton, render.userList));
loginButton.addEventListener('click', listenButton(loginButton, render.loginForm));
registrationButton.addEventListener('click', listenButton(registrationButton, render.registrationForm));
logoutButton.addEventListener('click', listenButton(logoutButton,
      function() { render.logoutSwitchButton(); render.recentPosts();
      blog.setCurrentUser(null); })); 

render.recentPosts();

})();
