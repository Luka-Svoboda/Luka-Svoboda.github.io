const phoneNumberContainer = document.getElementById("phone-number-container");
const instructionsElement = document.getElementById("instructions");
const errorMessageElement = document.getElementById("error-message");
const buttonContainer = document.getElementById("button-container");

// Phone number information
let targetNumber = "";
let enteredNumber = "";
let currentInputIndex = -1;

// Generate target phone number
for (let i = 0; i < 10; i++) {
  targetNumber += Math.floor(Math.random() * 10);
}

// Create phone number boxes
for (let i = 0; i < 10; i++) {
  const phoneNumberBox = document.createElement("div");
  phoneNumberBox.classList.add("phone-number-box");
  phoneNumberContainer.appendChild(phoneNumberBox);
}

// Generate buttons with random numbers
for (let i = 0; i < 500; i++) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = Math.floor(Math.random() * 10);

  // Update button number every 0.25 seconds
  setInterval(() => {
    let currentNumber = parseInt(button.textContent);
    currentNumber = (currentNumber + 1) % 10; // Increment and reset at 9
    button.textContent = currentNumber;
  }, 100);

  button.addEventListener("click", () => {
    if (currentInputIndex === 9) {
      errorMessageElement.textContent = "You can only enter 10 digits.";
      return;
    }

    // Update entered number and corresponding box
    currentInputIndex++;
    enteredNumber += button.textContent;
    phoneNumberContainer.children[currentInputIndex].textContent = button.textContent;

    // Check phone number if all digits entered
    if (enteredNumber.length === 10) {
      checkPhoneNumber();
    }
  });
  buttonContainer.appendChild(button);
}

instructionsElement.textContent = "Click on the buttons to enter the digits of your phone number. Each box can only be filled once.";


