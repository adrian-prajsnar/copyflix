// FORM FUNCTIONALITY
const form = document.querySelector('.login-form');
const isValid = !form.checkValidity();
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const errorMsgEmail = document.querySelector('.error-msg-email');
const errorMsgPassword = document.querySelector('.error-msg-password');
const noAccInfo = document.querySelector('.no-account-info');
const rememberData = document.querySelector('.remember-checkbox');

const correctAccounts = [
  { login: 'john.roller@example.com', password: '1234' },
  { login: '568891231', password: 'PW1234' },
  { login: 'jerry.buzzer@gmail.com', password: 'repeentacja1821' },
];

form.addEventListener('submit', e => {
  e.preventDefault();

  // When user submits correct data
  if (
    correctAccounts.some(
      acc =>
        acc.login === emailInput.value && acc.password === passwordInput.value
    )
  ) {
    if (rememberData.checked) localStorage.setItem('isLoggedIn', true);
    else sessionStorage.setItem('isLoggedIn', true);
    window.location.href = '/src/pages/browse.html';

    // When user submits wrong data
  } else {
    const digitsOnly = /^\d+$/.test(emailInput.value);
    digitsOnly
      ? (noAccInfo.innerHTML =
          'Niestety, nie możemy znaleźć konta z tym numerem. Wprowadź prawidłowy kod kraju lub <strong>zaloguj się za pomocą adresu e-mail.</strong>')
      : (noAccInfo.innerHTML = `Niestety, nie możemy znaleźć konta z tym adresem     e-mail. Spróbuj ponownie lub
      <a class="no-account-info-link" href="/index.html">utwórz nowe konto</a>.`);
    noAccInfo.classList.remove('hidden');
    emailInput.classList.add('has-error');
    passwordInput.blur();
    passwordInput.value = '';
    passwordInput.classList.remove('has-error');
    errorMsgPassword.classList.add('hidden');
  }
});

// Checking email
emailInput.addEventListener('invalid', () => {
  checkEmail(emailInput, errorMsgEmail);
  checkEmailLive();
});
emailInput.addEventListener(
  'blur',
  () => {
    checkEmail(emailInput, errorMsgEmail);
    checkEmailLive();
  },
  true
);

// Checking password
passwordInput.addEventListener('invalid', () => {
  checkPassword(passwordInput, errorMsgPassword);
  checkPasswordLive();
});
passwordInput.addEventListener(
  'blur',
  () => {
    checkPassword(passwordInput, errorMsgPassword);
    checkPasswordLive();
  },
  true
);

// FORM HELPER FUNCTIONS
function checkEmail(email, error) {
  email.value
    ? email.classList.add('has-value')
    : email.classList.remove('has-value');

  if (email.value.length < 5) {
    error.classList.remove('hidden');
    email.classList.add('has-error');
  } else {
    error.classList.add('hidden');
    email.classList.remove('has-error');
  }

  email.value.length >= 1
    ? (error.textContent = 'Wprowadź prawidłowy adres e-mail.')
    : (error.textContent =
        ' Wprowadź prawidłowy adres e-mail lub numer telefonu.');

  const digitsOnly = /^\d+$/.test(email.value);
  if (digitsOnly) error.textContent = 'Wprowadź prawidłowy numer telefonu.';
}

function checkPassword(password, error) {
  password.value
    ? password.classList.add('has-value')
    : password.classList.remove('has-value');

  if (password.value.length < 4) {
    error.classList.remove('hidden');
    password.classList.add('has-error');
  } else {
    error.classList.add('hidden');
    password.classList.remove('has-error');
  }
}

function checkEmailLive() {
  emailInput.addEventListener('input', () =>
    checkEmail(emailInput, errorMsgEmail)
  );
}

function checkPasswordLive() {
  passwordInput.addEventListener('input', () =>
    checkPassword(passwordInput, errorMsgPassword)
  );
}

// TOGGLE PASSWORD FUNCTIONALITY
const togglePassword = document.querySelector('.toggle-password');
togglePassword.addEventListener('mousedown', e => {
  e.preventDefault();
  const text = togglePassword.textContent.trim();
  if (text === 'POKAŻ') {
    togglePassword.textContent = 'UKRYJ';
    togglePassword.title = 'Ukryj hasło';
    passwordInput.type = 'text';
  } else {
    togglePassword.textContent = 'POKAŻ';
    togglePassword.title = 'Pokaż hasło';
    passwordInput.type = 'password';
  }
});

// CAPTCHA FUNCTIONALITY
const btnCaptcha = document.querySelector('.btn-captcha');
const captchaDescription = document.querySelector('.captcha-description');
btnCaptcha.addEventListener('click', () => {
  btnCaptcha.classList.add('hidden-2');
  captchaDescription.classList.remove('hidden-2');
});

// SESSION/LOCAL STORAGE
if (localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn'))
  window.location.href = '/src/pages/browse.html';

if (sessionStorage.getItem('profileSelected'))
  window.location.href = '/src/pages/home.html';
