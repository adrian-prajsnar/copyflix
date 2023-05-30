// PROFILES onClick
const profilesContainer = document.querySelector('.profiles-container');
const profile = document.querySelectorAll('.profile');

profilesContainer.addEventListener('click', e => {
  const click = e.target;
  if (click === profilesContainer) return;

  const profileName =
    click.closest('div').firstElementChild.children[1].textContent;

  if (profileName) sessionStorage.setItem('profileSelected', true);
});

//
//
///

// SESSION/LOCAL STORAGE
if (!sessionStorage.getItem('isLoggedIn')) window.location.href = 'login.html';

if (sessionStorage.getItem('profileSelected'))
  window.location.href = 'home.html';
