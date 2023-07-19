import { Navigation } from './HomeNavigation.js';
import { UserAgent } from './HomeSlider.js';
import { ApiCall } from './HomeApiCall.js';

function init() {
  Navigation();
  UserAgent();
  ApiCall();

  // FOOTER SERVICE-CODE
  const serviceCode = document.querySelector('.footer-service-code');
  const dedicatedServiceCode = '997-666';
  serviceCode.addEventListener('click', () => {
    serviceCode.textContent = dedicatedServiceCode;
  });

  // SESSION/LOCAL STORAGE
  if (
    !localStorage.getItem('isLoggedIn') &&
    !sessionStorage.getItem('isLoggedIn')
  )
    window.location.href = '/src/pages/login.html';
}

init();
