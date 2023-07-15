// CTA FORM
const ctaForm = document.querySelectorAll('.cta-form');
const input = document.querySelectorAll('.cta-input');

ctaForm.forEach(form => {
  // Checking when submitting form
  form.addEventListener('submit', event => {
    event.preventDefault();

    const {
      inputCon,
      input,
      errorMsgCon,
      errorMsg,
      btnCTA,
      email,
      validEmail,
    } = getFormElements(form);

    if (!email) return;

    if (validEmail) {
      displayValid(errorMsg, errorMsgCon, inputCon, btnCTA);
      window.location.href = '/src/pages/signup.html';
      localStorage.setItem(
        'currentEmail',
        JSON.stringify({
          email: input.value,
        })
      );
    }

    if (!validEmail) {
      displayInvalid(email, errorMsg, errorMsgCon, inputCon, btnCTA);
      input.focus();
    }

    checkInputLive();
  });

  // If user submit form by enter and there is wrong email
  form.addEventListener('keydown', event => {
    const { inputCon, errorMsgCon, errorMsg, btnCTA, email, validEmail } =
      getFormElements(form);

    if (!email) return;

    if (event.key === 'Enter' && !validEmail) {
      displayInvalid(email, errorMsg, errorMsgCon, inputCon, btnCTA);
      checkInputLive();
    }
  });

  // Checking when form loses focus
  form.addEventListener(
    'blur',
    () => {
      const { inputCon, errorMsgCon, errorMsg, btnCTA, email, validEmail } =
        getFormElements(form);

      if (!email) return;

      if (validEmail) displayValid(errorMsg, errorMsgCon, inputCon, btnCTA);

      if (!validEmail)
        displayInvalid(email, errorMsg, errorMsgCon, inputCon, btnCTA);

      checkInputLive();
    },
    true
  );
});

// Chcecking if valid email was already submitted
window.addEventListener('load', () => {
  ctaForm.forEach(form => {
    const { inputCon, input, errorMsgCon, errorMsg, btnCTA } =
      getFormElements(form);

    const savedEmail = JSON.parse(localStorage.getItem('currentEmail'));

    if (savedEmail) {
      input.value = savedEmail.email;
      displayValid(errorMsg, errorMsgCon, inputCon, btnCTA);
      checkInputLive();
    }
  });
});

function checkInputLive() {
  input.forEach(input => {
    // Checking the first state of input
    const email = input.value;
    email && input.classList.add('has-value');

    // Checking for every inputted letter
    input.addEventListener('input', () => {
      const email = input.value;
      const inputCon = input.parentElement;
      const errorMsgCon = input.parentElement.lastElementChild;
      const errorMsg = errorMsgCon.lastElementChild;
      const btnCTA = inputCon.parentElement.lastElementChild;
      const validation = validateEmail(email);
      const validEmail = validation?.[0];

      email
        ? input.classList.add('has-value')
        : input.classList.remove('has-value');

      if (validEmail) displayValid(errorMsg, errorMsgCon, inputCon, btnCTA);

      if (!validEmail)
        displayInvalid(email, errorMsg, errorMsgCon, inputCon, btnCTA);
    });
  });
}

// CTA FORM - HELPER FUNCTIONS
function displayValid(msg, msgCon, inpCon, btn) {
  msg.textContent = '';
  msgCon.classList.add('hidden');
  inpCon.classList.add('valid');
  inpCon.classList.remove('invalid');
  btn.classList.remove('add-margin');
  btn.classList.remove('add-margin2');
}

function displayInvalid(email, msg, msgCon, inpCon, btn) {
  if (email.length < 5) {
    msg.textContent = 'Adres e-mail jest wymagany.';
    btn.classList.remove('add-margin2');
  } else {
    msg.textContent = 'Wprowadź prawidłowy adres e-mail.';
    btn.classList.add('add-margin2');
  }
  msgCon.classList.remove('hidden');
  inpCon.classList.remove('valid');
  inpCon.classList.add('invalid');
  btn.classList.add('add-margin');
}

function getFormElements(form) {
  const inputCon = form.firstElementChild;
  const input = inputCon.firstElementChild;
  const errorMsgCon = input.parentElement.lastElementChild;
  const errorMsg = errorMsgCon.lastElementChild;
  const btnCTA = form.lastElementChild;
  const data = new FormData(form);
  const email = data.get('email');
  const validation = validateEmail(email);
  const validEmail = validation?.[0];

  return {
    inputCon,
    input,
    errorMsgCon,
    errorMsg,
    btnCTA,
    email,
    validEmail,
  };
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function clearCurrentEmail() {
  localStorage.removeItem('currentEmail');
}
// clearCurrentEmail();

// ACCORDION FUNCTIONALITY
const accItem = document.querySelectorAll('.accordion-item');
const accDescription = document.querySelectorAll('.accordion-item-description');
const accIconOpen = document.querySelectorAll('.accordion-icon-open');
const accIconClose = document.querySelectorAll('.accordion-icon-close');

accItem.forEach((acc, i, arr) => {
  acc.addEventListener('click', () => {
    arr.forEach((_, i2) => {
      if (i === i2) {
        accDescription[i2].classList.toggle('active');
        accIconOpen[i2].classList.toggle('hidden');
        accIconClose[i2].classList.toggle('hidden');
      } else {
        accDescription[i2].classList.remove('active');
        accIconOpen[i2].classList.remove('hidden');
        accIconClose[i2].classList.add('hidden');
      }
    });
  });
});

// COPYRIGHTS POP-UP
const popUpMarkup = `
    <aside>
      <div class="overlay hidden-2" aria-hidden="true"></div>
      <div class="copyrights-pop-up hidden-2">
        <p class="copyrights-info">
          This page has nothing to do with original Netflix website! It has been
          created just for learning purposes with all rights reserved to Netflix
          Polska. <br />
          <br />
          If you want to visit the original website, please go to
          <a class="copyrights-link" href="https://www.netflix.com"
            >netflix.com</a
          >. <br />
          If you want to see more of my projects, please visit my
          <a
            class="copyrights-link"
            target="_blank"
            href="https://github.com/adrian-prajsnar"
            >GitHub</a
          >
          profile.
        </p>
        <ion-icon class="copyrights-icon-close" name="close-outline"></ion-icon>
      </div>
    </aside>
`;

function togglePopUp() {
  document.body.insertAdjacentHTML('afterbegin', popUpMarkup);
  const overlay = document.querySelector('.overlay');
  const copyrightsPopUp = document.querySelector('.copyrights-pop-up');
  const copyrightsIconClose = document.querySelector('.copyrights-icon-close');

  setTimeout(() => {
    overlay.classList.remove('hidden-2');
    copyrightsPopUp.classList.remove('hidden-2');
    [copyrightsIconClose, overlay].forEach(element =>
      element.addEventListener('click', () => {
        overlay.classList.add('hidden-2');
        copyrightsPopUp.classList.add('hidden-2');
        setTimeout(() => document.body.firstElementChild.remove(), 500);
      })
    );
  }, 500);
}

// SESSION/LOCAL STORAGE
if (!sessionStorage.getItem('isFirstTimeLoaded')) {
  setTimeout(() => togglePopUp(), 5000);
  sessionStorage.setItem('isFirstTimeLoaded', true);
}

if (localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn'))
  window.location.href = '/src/pages/browse.html';

if (sessionStorage.getItem('profileSelected'))
  window.location.href = '/src/pages/home.html';
