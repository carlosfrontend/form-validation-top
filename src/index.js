// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css';
import './styles/main.css';
import COUNTRY_ADDRESS_POSTALS from './Models/countriesAddressPostal';

const country = document.querySelector('#country');
const zip = document.querySelector('#zip');
const contactForm = document.querySelector('#contact-form');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');
const countryError = document.querySelector('#country + span.error');
const zipError = document.querySelector('#zip + span.error');
let myRegexp;
let myZipCode;
let myZipMessage;

window.addEventListener('DOMContentLoaded', () => {
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

  emailError.className = 'error active';
  countryError.className = 'error active';
  zipError.className = 'error active';
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
    console.log(myRegexp.test(`${zip.value}`));
    zip.setCustomValidity('');
    zipError.textContent = '';
  } else {
    zip.setCustomValidity(myRegexp);
    zipError.textContent = myZipMessage;
    showError();
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!email.validity.valid) {
    showError();
    e.preventDefault();
  }
});
