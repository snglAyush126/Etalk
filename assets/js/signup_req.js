// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-button');
    
    const specialChar = document.getElementById('special-char');
    const number = document.getElementById('number');
    const uppercase = document.getElementById('uppercase');
    const length = document.getElementById('length');
    
    const passwordCriteria = {
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
      number: /[0-9]/,
      uppercase: /[A-Z]/,
      length: /.{6,}/
    };
  
    function validatePassword() {
      const password = passwordInput.value;
      
      let isValid = true;
  
      if (passwordCriteria.specialChar.test(password)) {
        specialChar.classList.remove('invalid');
        specialChar.classList.add('valid');
      } else {
        specialChar.classList.remove('valid');
        specialChar.classList.add('invalid');
        isValid = false;
      }
  
      if (passwordCriteria.number.test(password)) {
        number.classList.remove('invalid');
        number.classList.add('valid');
      } else {
        number.classList.remove('valid');
        number.classList.add('invalid');
        isValid = false;
      }
  
      if (passwordCriteria.uppercase.test(password)) {
        uppercase.classList.remove('invalid');
        uppercase.classList.add('valid');
      } else {
        uppercase.classList.remove('valid');
        uppercase.classList.add('invalid');
        isValid = false;
      }
  
      if (passwordCriteria.length.test(password)) {
        length.classList.remove('invalid');
        length.classList.add('valid');
      } else {
        length.classList.remove('valid');
        length.classList.add('invalid');
        isValid = false;
      }
  
      submitButton.disabled = !isValid;
    }
  
    passwordInput.addEventListener('input', validatePassword);
  });
  