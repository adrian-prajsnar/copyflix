// SESSION/LOCAL STORAGE
if (sessionStorage.getItem('isLoggedIn')) window.location.href = 'browse.html';

if (sessionStorage.getItem('profileSelected'))
  window.location.href = 'home.html';

if (!localStorage.getItem('currentEmail')) window.location.href = 'index.html';
