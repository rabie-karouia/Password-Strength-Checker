function Strength(password) {
  let i = 0;

  if (password.length >= 12) {
      i++;
  }

  if (password.length > 16) {
      i++;
  }

  if (/[A-Z]/.test(password)) {
      i++;
  }

  if (/[0-9]/.test(password)) {
      i++;
  }

  if (/[A-Za-z0-9]/.test(password)) {
      i++;
  }

  return i;
}

let container = document.querySelector(".container");
let password = document.querySelector("#YourPassword");
let show = document.querySelector(".show");
let toggler = document.getElementById('toggler');

document.addEventListener("keyup", function (e) {
  let strength = Strength(password.value);
  if (strength <= 2) {
      container.classList.add("weak");
      container.classList.remove("moderate");
      container.classList.remove("strong");
  } else if (strength >= 2 && strength <= 4) {
      container.classList.remove("weak");
      container.classList.add("moderate");
      container.classList.remove("strong");
  } else {
      container.classList.remove("weak");
      container.classList.remove("moderate");
      container.classList.add("strong");
  }
});

showHidePassword = () => {
  if (password.type == 'password') {
      password.setAttribute('type', 'text');
      toggler.classList.add('fa-eye-slash');
  } else {
      toggler.classList.remove('fa-eye-slash');
      password.setAttribute('type', 'password');
  }
};

toggler.addEventListener('click', showHidePassword);
show.onclick = function () {
  console.log('show button clicked'); // Add this line
  if (password.type === "password") {
      password.setAttribute("type", "text");
      show.classList.add("hide");
  } else {
      password.setAttribute("type", "password");
      show.classList.remove("hide");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  let validatorText = document.getElementById("YourPassword");
  let passwordConditions = document.querySelectorAll(".password-condition");

  validatorText.addEventListener("input", function () {
      let conditionsMet = [
          /[a-z]+/.test(validatorText.value),
          /[A-Z]+/.test(validatorText.value),
          /[0-9]+/.test(validatorText.value),
          /[$-/:-?{-~!"^_`\[\]]+/.test(validatorText.value),
          validatorText.value.length >= 12
      ];

      passwordConditions.forEach((item, index) => {
          if (conditionsMet[index]) {
              item.style.color = 'green';
          } else {
              item.style.color = 'initial';
          }
      });
  });
});

