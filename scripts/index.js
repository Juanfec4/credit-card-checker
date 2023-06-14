const RESULT_TEXT = document.querySelector(".result-card__text");
const CARD_INPUT = document.querySelector(".credit-card__input");
const MIN_CARD_LENGTH = 12;

function logResult(isValid) {
  RESULT_TEXT.innerText = isValid ? "Valid card." : "Invalid card.";
}

CARD_INPUT.addEventListener("input", getCardNumber);

function getCardNumber() {
  if (!(this.value.length >= MIN_CARD_LENGTH)) {
    return;
  }
  let cardNumber = this.value;
  logResult(checkSum(cardNumber));
}

function checkSum(card) {
  let digits = splitIntoDigits(card);

  for (let i = 0; i < digits.length; i += 2) {
    digits[i] *= 2;
    if (isTwoDigits(digits[i])) {
      digits[i] = sumDigits(digits[i]);
    }
  }
  if(sumDigits(digits)%10 === 0){
    return true;
  }
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
