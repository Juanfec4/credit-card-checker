const RESULT_TEXT = document.querySelector(".result-card__text");
const RESULT_CARD = document.querySelector(".result-card__container");
const CARD_INPUT = document.querySelector(".credit-card__input");
const DEFAULT_CLASS = RESULT_CARD.classList.value;
const MIN_CARD_LENGTH = 12;

function logResult(isValid) {
  RESULT_TEXT.innerText = isValid ? "Valid card." : "Invalid card.";
  RESULT_CARD.className = isValid
    ? `${DEFAULT_CLASS}--valid`
    : `${DEFAULT_CLASS}--invalid`;
}

CARD_INPUT.addEventListener("input", checkCardNumber);

function checkCardNumber() {
  if (!(this.value.length >= MIN_CARD_LENGTH)) {
    RESULT_TEXT.innerText = "Please enter a card number above.";
    RESULT_CARD.className = DEFAULT_CLASS;
    return;
  }
  let cardNumber = reverseString(this.value);
  logResult(checkSum(cardNumber));
}

function checkSum(card) {
  let digits = splitIntoDigits(card);

  for (let i = 1; i < digits.length; i += 2) {
    digits[i] *= 2;
    if (isTwoDigits(digits[i])) {
      digits[i] = sumDigits(digits[i]);
    }
  }
  if (sumDigits(digits) % 10 === 0) {
    return true;
  }
  console.log(digits);
  return false;
}

function splitIntoDigits(number) {
  return Array.from(String(number), Number);
}

function isTwoDigits(number) {
  return number >= 10 && number <= 99;
}

function sumDigits(number) {
  let digits;
  let sum = 0;
  if (Array.isArray(number)) {
    digits = number;
  } else {
    digits = splitIntoDigits(number);
  }
  for (let digit of digits) {
    sum += digit;
  }
  return sum;
}

function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
  }