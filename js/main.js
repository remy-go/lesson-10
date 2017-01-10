(function() {
var recentPostsButton = document.querySelector('.recent-posts'),
    usersButton = document.querySelector('.users'),
    loginButton = document.querySelector('.login'),
    logoutButton = document.querySelector('nav .logout'),
    registrationButton = document.querySelector('.registration'),
    
    InitialData = InitialDataModule,
    NavButtonStyle = NavButtonStyleModule,
    UserState = UserStateModule,
    RenderLoginRegister = RenderLoginRegisterModule,
    RenderContent = RenderContentModule;


function listenButton(button, action, actionArg1, actionArg2, actionArg3) {
  return function() { NavButtonStyle.pressButton(button); action(actionArg1, actionArg2, actionArg3); };
}

recentPostsButton.addEventListener('click', listenButton(recentPostsButton, RenderContent.renderRecentPosts));
usersButton.addEventListener('click', listenButton(usersButton, RenderContent.renderUserList));
loginButton.addEventListener('click', listenButton(loginButton, RenderLoginRegister.renderLoginForm));
registrationButton.addEventListener('click', listenButton(registrationButton, RenderLoginRegister.renderRegistrationForm));
logoutButton.addEventListener('click', listenButton(logoutButton,
      function() { NavButtonStyle.logoutSwitchButton(); NavButtonStyle.pressButton(recentPostsButton);
        RenderContent.renderRecentPosts();
        UserState.logout();
      })); 

InitialData.initializeStorage();
RenderContent.renderRecentPosts();

})();
