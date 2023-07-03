// PROFILES onClick
const profilesContainer = document.querySelector('.profiles-container');
const profile = document.querySelectorAll('.profile');
const profileNames = document.querySelectorAll('.profile-name');

profilesContainer.addEventListener('click', e => {
  const click = e.target;
  if (click === profilesContainer) return;

  const profileName =
    click.closest('div').firstElementChild.children[1].textContent;

  const accountProfiles = [];
  accountProfiles.push(profileName);
  profileNames.forEach(name => {
    if (accountProfiles.includes(name.textContent)) return;
    else accountProfiles.push(name.textContent);
  });

  if (profileName) sessionStorage.setItem('profileSelected', accountProfiles);
});

// SESSION/LOCAL STORAGE
if (
  !localStorage.getItem('isLoggedIn') &&
  !sessionStorage.getItem('isLoggedIn')
)
  window.location.href = 'login.html';

if (sessionStorage.getItem('profileSelected'))
  window.location.href = 'home.html';
