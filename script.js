let isFullNameValid = false;
let isFacultyValid = false;
let isBirthdateValid = false;
let isAddressValid = false;
let isEmailValid = false;

document.getElementById("fullName").addEventListener("input", function () {
  const regex = /^[A-Za-zА-Яа-яІіЇїЄє]+ [A-Za-zА-ЯІіЇїЄє]\.[A-Za-zА-ЯІіЇїЄє]\.$/;
  isFullNameValid = regex.test(this.value);
  this.classList.toggle("error", !isFullNameValid);
});

document.getElementById("faculty").addEventListener("input", function () {
  const regex = /^[A-Za-zА-Яа-яІіЇїЄє]{2,4}$/;
  isFacultyValid = regex.test(this.value);
  this.classList.toggle("error", !isFacultyValid);
});

document.getElementById("birthdate").addEventListener("input", function () {
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  isBirthdateValid = regex.test(this.value);

  if (isBirthdateValid) {
    const [day, month, year] = this.value.split(".").map(Number);
    const enteredDate = new Date(year, month - 1, day);
    const minDate = new Date(1907, 0, 1);
    const currentDate = new Date();
    isBirthdateValid = enteredDate >= minDate && enteredDate <= currentDate;
  }
  
  this.classList.toggle("error", !isBirthdateValid);
});

document.getElementById("address").addEventListener("input", function () {
  const regex = /^м\. \d{6}$/;
  isAddressValid = regex.test(this.value);
  this.classList.toggle("error", !isAddressValid);
});

document.getElementById("email").addEventListener("input", function () {
  const regex = /^[a-z0-9\._]+@[a-z]+\.com$/;
  isEmailValid = regex.test(this.value);
  this.classList.toggle("error", !isEmailValid);
});

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (isFullNameValid && isFacultyValid && isBirthdateValid && isAddressValid && isEmailValid) {
    displayTextInNewWindow();
  } else {
    alert("Будь ласка, перевірте правильність введенних даних");
  }
});

const displayTextInNewWindow = () => {
  const fullName = document.getElementById("fullName").value;
  const faculty = document.getElementById("faculty").value;
  const birthdate = document.getElementById("birthdate").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;

  const displayText = ` 
    <style>
      .info_container { display: flex; justify-content: center; }
      .info_container div { background-color: #f0f0f0; border: 1px solid #ccc; padding: 10px; }
    </style>
    <div class="info_container">
      <div>
        <p><strong>ПІБ:</strong> ${fullName}</p>
        <p><strong>Факультет:</strong> ${faculty}</p>
        <p><strong>Дата народження:</strong> ${birthdate}</p>
        <p><strong>Адреса:</strong> ${address}</p>
        <p><strong>Електронна пошта:</strong> ${email}</p>
      </div>
    </div>
  `;
  window.open("", "_blank").document.write(displayText);
};

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("numberTableBody");
  const colorPicker = document.getElementById("colorPicker");
  let counter = 1;

  for (let i = 1; i <= 6; i++) {
    const row = document.createElement("tr");
    for (let j = 1; j <= 6; j++) {
      const cell = document.createElement("td");
      if (counter === 5) {
        cell.addEventListener("mouseover", () => cell.style.backgroundColor = getRandomColor());
        cell.addEventListener("click", () => cell.style.backgroundColor = colorPicker.value);
        cell.addEventListener("dblclick", () => {
          const selectedColor = getRandomColor();
          Array.from(tableBody.getElementsByTagName("td")).forEach(otherCell => {
            if (otherCell !== cell) otherCell.style.backgroundColor = selectedColor;
          });
        });
      }
      cell.textContent = counter;
      row.appendChild(cell);
      counter++;
    }
    tableBody.appendChild(row);
  }
});

function getRandomColor() {
  return `#${Array.from({ length: 6 }, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join('')}`;
}
