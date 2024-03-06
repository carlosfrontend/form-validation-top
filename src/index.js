// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css';
import './styles/main.css';
import WinkIcon from './images/wink.png';
import COUNTRY_ADDRESS_POSTALS from './Models/countriesAddressPostal';

const smileContainer = document.querySelector('.smile-container');
const country = document.querySelector('#country');
const zip = document.querySelector('#zip');
const passwordA = document.querySelector('#passwordA');
const passwordB = document.querySelector('#passwordB');
const contactForm = document.querySelector('#contact-form');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');
const countryError = document.querySelector('#country + span.error');
const zipError = document.querySelector('#zip + span.error');
const passwordAErrror = document.querySelector('#passwordA + span.error');
const passwordBErrror = document.querySelector('#passwordB + span.error');
let myRegexp;
let myZipCode;
let myZipMessage;

window.addEventListener('DOMContentLoaded', () => {
  const myIcon = new Image();
  myIcon.src = WinkIcon;
  smileContainer.appendChild(myIcon);
  myIcon.alt = 'A wwink smile';
  myIcon.className = 'icon';
  smileContainer.className = 'smile-container';
  zip.disabled = true;
});

const showError = () => {
  if (email.validity.valueMissing) {
    emailError.textContent = 'You must enter an email';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Email format please: E.g. username@email.com';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email must be at least ${email.minLength} characters. You entered ${email.value.length}`;
  }

  if (zip.validity.valueMissing) {
    zipError.textContent = 'You must enter a ZIP Code';
  }

  if (country.validity.valueMissing) {
    countryError.textContent = 'You must select a country';
  }

  if (passwordA.validity.valueMissing) {
    passwordAErrror.textContent = 'You must enter a passwword';
  } else if (passwordA.validity.patternMismatch) {
    passwordAErrror.textContent =
      'It must contain at least one uppercase letter, one lowercase letter, one number, no spaces and one of the following symbols # $ @ ! % & * . The length must be between 8 and 12 characters';
  } else {
    passwordAErrror.textContent = '';
  }

  if (passwordB.validity.valueMissing) {
    passwordBErrror.textContent = 'You must confirm the passwword';
  } else if (passwordB.validity.patternMismatch) {
    passwordBErrror.textContent =
    'It must contain at least one uppercase letter, one lowercase letter, one number, no spaces and one of the following symbols # $ @ ! % & * . The length must be between 8 and 12 characters';
    if (passwordA.value === passwordB.value && !passwordB.validity.patternMismatch) {
      passwordBErrror.classList.remove('error active');
     
    }
  }

  emailError.className = 'error active';
  countryError.className = 'error active';
  zipError.className = 'error active';
  passwordAErrror.className = 'error active';
  
};

email.addEventListener('input', () => {
  if (email.validity.valid) {
    emailError.textContent = '';
  } else {
    showError();
  }
});

country.addEventListener('change', () => {
  myZipCode = COUNTRY_ADDRESS_POSTALS.find(
    (obj) => obj.abbrev === country.value
  ).postal;

  myZipMessage = COUNTRY_ADDRESS_POSTALS.find(
    (obj) => obj.abbrev === country.value
  ).message;

  if (country.value === '') {
    zip.disabled = true;
  } else {
    countryError.textContent = '';
    zip.disabled = false;
    zipError.textContent = 'You must enter a ZIP Code';
  }
});

zip.addEventListener('input', () => {
  myRegexp = new RegExp(myZipCode);
  if (myRegexp.test(`${zip.value}`)) {
    zip.setCustomValidity('');
    zipError.textContent = '';
  } else {
    zip.setCustomValidity(myRegexp);
    zipError.textContent = myZipMessage;
    showError();
  }
});

passwordA.addEventListener('input', () => {
  if (passwordA.validity.valid) {
    passwordAErrror.textContent = '';
  } else {
    showError();
  }
});

passwordB.addEventListener('input', () => {
  if (passwordB.validity.valid &&
    passwordB.value === passwordA.value &&
    passwordB.value !== '' &&
    passwordA.value !== '' &&
    !passwordB.validity.patternMismatch
  ) {
    passwordBErrror.textContent = 'Passwords match!';
    passwordBErrror.className = 'success active';
  } else {
    passwordBErrror.textContent = 'Passwords do not match!';
    passwordBErrror.className = 'error active';
    // showError();
  }
});
contactForm.addEventListener('submit', (e) => {
  if (!email.validity.valid) {
    showError();
    e.preventDefault();
  } else if (!country.validity.valid) {
    showError();
    e.preventDefault();
  } else if (!zip.validity.valid) {
    showError();
    e.preventDefault();
  } else if (!passwordA.validity.valid) {
    showError();
    e.preventDefault();
  }
  if (
    passwordB.value !== passwordA.value &&
    passwordB.value !== '' &&
    passwordA !== ''
  ) {
    showError();
    e.preventDefault();
  }else if(passwordB.value === passwordA.value && passwordB.value !== '' && passwordA.value !== '' && !passwordB.validity.patternMismatch && !passwordA.validity.patternMismatch){
    e.preventDefault();
    setTimeout(() => {
      contactForm.remove();
      smileContainer.className = 'smile-container move';
    },600);
  }
});
