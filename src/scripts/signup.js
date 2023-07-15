// SESSION/LOCAL STORAGE
if (localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn'))
  window.location.href = '/src/pages/browse.html';

if (sessionStorage.getItem('profileSelected'))
  window.location.href = '/src/pages/home.html';

if (!localStorage.getItem('currentEmail')) window.location.href = '/index.html';
