export function Navigation() {
  // STICKY NAVIGATION
  const header = document.querySelector('.header');

  function sitckyNav() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 68) header.classList.add('sticky');
    else header.classList.remove('sticky');
  }

  window.document.addEventListener('DOMContentLoaded', sitckyNav);
  window.document.addEventListener('scroll', sitckyNav);

  // PRIMARY NAV - CURRENT ACTIVE LINK
  const primaryNavItems = document.querySelector('.primary-nav-items');
  const primaryNavLink = document.querySelectorAll('.primary-nav-link');

  primaryNavItems.addEventListener('click', e => {
    const click = e.target;
    if (!click.classList.contains('primary-nav-link')) return;
    if (click.classList.contains('current-active')) return;
    else {
      primaryNavLink.forEach(link => link.classList.remove('current-active'));
      click.classList.add('current-active');
    }
  });

  // PRIMARY NAV - MENU BAR ACTIVATION
  const primaryNavContainer = document.querySelector('.primary-nav-container');
  let navItemsTimeout;

  function setTabIndexPrimaryNav() {
    window.innerWidth <= 1200
      ? (primaryNavContainer.tabIndex = '0')
      : (primaryNavContainer.tabIndex = '-1');
  }
  window.addEventListener('resize', setTabIndexPrimaryNav);

  function closePrimaryNavItems() {
    primaryNavItems.classList.remove('active');
  }

  primaryNavContainer.addEventListener('mouseenter', () => {
    closeNotifNav();
    closeProfileNav();
    clearTimeout(navItemsTimeout);
    primaryNavItems.classList.add('active');
  });

  primaryNavContainer.addEventListener('mouseleave', () => {
    navItemsTimeout = setTimeout(() => closePrimaryNavItems(), 300);
  });

  // SECONDARY NAV - SEARCH ACTIVATION
  const searchOpen = document.querySelector('.search-btn');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.querySelector('#search-input');
  const searchLabel = document.querySelector('.search-label');
  const searchClose = document.querySelector('.search-close');
  const searchNav = document.querySelector('#secondary-nav-item-search');

  searchOpen.addEventListener('click', () => {
    searchNav.classList.add('search');
    searchContainer.classList.remove('hidden');
    searchOpen.classList.add('hidden');
    searchInput.focus();
    searchInput.classList.add('expanded');
  });

  searchInput.addEventListener('focusout', () => {
    if (searchInput.classList.contains('has-value')) return;
    else {
      searchNav.classList.remove('search');
      searchContainer.classList.add('hidden');
      searchOpen.classList.remove('hidden');
      searchInput.value = '';
      searchLabel.classList.remove('hidden');
      searchClose.classList.add('hidden');
      searchInput.classList.remove('expanded');
      searchInput.classList.remove('has-value');
    }
  });

  searchInput.addEventListener('input', e => {
    const text = e.target.value;
    searchInput.setAttribute('value', text);
    text
      ? searchLabel.classList.add('hidden')
      : searchLabel.classList.remove('hidden');
    text
      ? searchClose.classList.remove('hidden')
      : searchClose.classList.add('hidden');
    text
      ? searchInput.classList.add('has-value')
      : searchInput.classList.remove('has-value');
  });

  searchClose.addEventListener('mouseup', e => {
    e.preventDefault();
    searchInput.setAttribute('value', '');
    searchInput.value = '';
    searchInput.focus();
    searchLabel.classList.remove('hidden');
    searchClose.classList.add('hidden');
    searchInput.classList.remove('has-value');
  });

  // SECONDARY NAV - NOTIFICATIONS ACTIVATION
  const notifNav = document.querySelector('#secondary-nav-item-notifications');
  const notifContainer = document.querySelector('.notifications-container');
  const notifArrowUp = document.querySelector('.profile-arrow-up-notification');
  let notifTimeout;

  function closeNotifNav() {
    notifContainer.classList.remove('active');
    notifArrowUp.classList.remove('active');
  }

  notifNav.addEventListener('mouseenter', () => {
    closeProfileNav();
    closePrimaryNavItems();
    clearTimeout(notifTimeout);
    notifContainer.classList.add('active');
    notifArrowUp.classList.add('active');
  });

  notifNav.addEventListener('mouseleave', () => {
    notifTimeout = setTimeout(() => closeNotifNav(), 300);
  });

  // SECONDARY NAV - PROFILE ACTIVATION
  const profileNav = document.querySelector('#secondary-nav-item-profile');
  const profileArrowDown = document.querySelector('.profile-arrow-down');
  const profileArrowUp = document.querySelector('.profile-arrow-up');
  const profileDropDown = document.querySelector('.profile-drop-down');
  let profileTimeout;

  function closeProfileNav() {
    profileDropDown.classList.remove('active');
    profileArrowUp.classList.remove('active');
    profileArrowDown.style.transform = 'rotate(0deg)';
  }

  profileNav.addEventListener('mouseenter', () => {
    closeNotifNav();
    closePrimaryNavItems();
    clearTimeout(profileTimeout);
    profileDropDown.classList.add('active');
    profileArrowUp.classList.add('active');
    profileArrowDown.style.transform = 'rotate(180deg)';
  });

  profileNav.addEventListener('mouseleave', () => {
    profileTimeout = setTimeout(() => closeProfileNav(), 300);
  });

  // SECONDARY NAV - ADDING PROFILE NAMES
  const savedNames = sessionStorage.getItem('profileSelected');
  const namesArray = savedNames?.split(',');
  const currentProfile = namesArray?.[0];
  const otherProfiles = namesArray?.splice(1);
  const profileLogos = document.querySelectorAll('.profile-logo');
  const profileNames = document.querySelectorAll('.profile-name');

  function addProfileNames() {
    profileNames.forEach((name, index) => {
      name.textContent = otherProfiles[index];
    });
  }

  function setUpCurrentProfile() {
    profileLogos[0].src = `/src/images/page-browse/profiles-${currentProfile.toLowerCase()}.png`;
    profileLogos[0].alt = `Awatar użytkownika ${currentProfile}`;
  }

  function setUpOtherProfiles() {
    profileLogos.forEach((profile, index) => {
      if (index === 0) return;
      else {
        profile.src = `/src/images/page-browse/profiles-${otherProfiles[
          index - 1
        ].toLowerCase()}.png`;
        profile.alt = `Awatar użytkownika ${otherProfiles[index]}`;
      }
    });
  }

  if (savedNames) {
    addProfileNames();
    setUpCurrentProfile();
    setUpOtherProfiles();
  }

  // SECONDARY NAV - LOGOUT
  const btnLogout = document.querySelector('.profile-logout-link');
  btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('profileSelected');
  });
}
