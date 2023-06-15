import { appendElement, clearChildren } from "./helpers.js";

const RESULT_TEXT = document.querySelector(".result-card__text");
const RESULT_CARD = document.querySelector(".result-card__container");
const CARD_INPUT = document.querySelector(".credit-card__input");
const CARD_PROVIDER = document.querySelector(".credit-card__provider-image");
const INFORMATION_RESULTS = document.querySelector(
  ".information-card__results"
);

const DEFAULT_CLASS = RESULT_CARD.classList.value;
const ISSUER_IMAGE_ROOT_PATH = "./assets/logos/";
const MIN_CARD_LENGTH = 12;

const MAJOR_INDUSTRY_IDENTIFIERS = {
  0: "ISO / TC 68 and other industry duties",
  1: "Airlines",
  2: "Airlines, finance, and other future industry duties",
  3: "Travel and leisure",
  4: "Banking and finance",
  5: "Finance and banking",
  6: "Sales and banking/finance",
  7: "Petroleum and other future industry tasks",
  8: "Healthcare, telecommunications, and other future industry tasks",
  9: "For the appointment of national standards bodies",
};

function Issuer(name, prefixNumbers, lengths, image) {
  this.name = name;
  this.prefixNumbers = prefixNumbers;
  this.lengths = lengths;
  this.image = image;
}

const CARD_ISSUERS = [
  new Issuer(
    "American Express",
    [34, 37],
    [15],
    `${ISSUER_IMAGE_ROOT_PATH}amex.png`
  ),
  new Issuer(
    `Diner's Club`,
    [300, 301, 302, 303, 304, 305, 309, 36, 38, 39],
    [14, 15],
    `${ISSUER_IMAGE_ROOT_PATH}diners.png`
  ),
  new Issuer(
    `Discover`,
    [6011, 64, 65, 622126, 622925],
    [16],
    `${ISSUER_IMAGE_ROOT_PATH}discover.png`
  ),
  new Issuer(
    `JCB`,
    [35, 3088, 3096, 3112, 3158, 3337],
    [16],
    `${ISSUER_IMAGE_ROOT_PATH}jcb.png`
  ),
  new Issuer(
    `MasterCard`,
    [51, 52, 53, 54, 55],
    [16],
    `${ISSUER_IMAGE_ROOT_PATH}mastercard.png`
  ),
  new Issuer(`Visa`, [4], [13, 16, 19], `${ISSUER_IMAGE_ROOT_PATH}visa.png`),
];

function logResult(isValid) {
  RESULT_TEXT.innerText = isValid ? "Valid card." : "Invalid card.";
  RESULT_CARD.className = isValid
    ? `${DEFAULT_CLASS}--valid`
    : `${DEFAULT_CLASS}--invalid`;
}

function checkCardNumber() {
  let cardNumber = this.value;
  if (!(this.value.length >= MIN_CARD_LENGTH)) {
    RESULT_TEXT.innerText = "Please enter a card number above.";
    CARD_PROVIDER.style.backgroundImage = "none";
    RESULT_CARD.className = DEFAULT_CLASS;
    clearChildren(INFORMATION_RESULTS);
    return;
  }
  let cardLength = cardNumber.length;
  let firstDigit = cardNumber.charAt(0);
  logResult(checkSum(cardNumber));
  clearChildren(INFORMATION_RESULTS);
  logIndustryCode(firstDigit);
  let issuer = checkCardIssuer(cardNumber);
  logIssuer(issuer);
  changeDisplayedIssuer(issuer);
  logLengthForIssuer(cardLength, issuer);
}

function checkSum(card) {
  card = reverseString(card);
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
  return str === "" ? "" : reverseString(str.substr(1)) + str.charAt(0);
}

function logIndustryCode(number) {
  let industry = MAJOR_INDUSTRY_IDENTIFIERS[number];
  let resultHeading = `(MII) INDUSTRY CODE [${number}]: `;
  let industryResult = appendElement(
    INFORMATION_RESULTS,
    "p",
    "information-card__subheading",
    resultHeading
  );
  appendElement(industryResult, "span", "information-card__result", industry);
}

function checkCardIssuer(number) {
  let cardString = number.toString();
  for (let issuer of CARD_ISSUERS) {
    for (let prefixNumber of issuer.prefixNumbers) {
      if (cardString.startsWith(prefixNumber.toString())) {
        return {
          name: issuer.name,
          prefix: prefixNumber,
          lengths: issuer.lengths,
          image: issuer.image,
        };
      }
    }
  }
  return { name: "Unknown Issuer", prefix: 0, lengths: null, image: null };
}

function logIssuer({ name, prefix }) {
  if (prefix === 0) {
    prefix = "N/A";
  }
  let resultHeading = `(IIN) ISSUER IDENTIFICATION NUMBER [${prefix}]: `;
  let issuerResult = appendElement(
    INFORMATION_RESULTS,
    "p",
    "information-card__subheading",
    resultHeading
  );
  appendElement(issuerResult, "span", "information-card__result", name);
}

function logLengthForIssuer(length, { name, lengths }) {
  if (!lengths) {
    return;
  }
  if (lengths.includes(length)) {
    return;
  }
  lengths = lengths.join(", ");
  RESULT_TEXT.innerText = `Expected length(s) for ${name}: ${lengths}.`;
  RESULT_CARD.className = `${DEFAULT_CLASS}--invalid`;
}

function changeDisplayedIssuer({ image }) {
  let imagePath = image;
  if (imagePath === null) {
    return;
  }
  CARD_PROVIDER.style.backgroundImage = `url(${imagePath})`;
}
CARD_INPUT.addEventListener("input", checkCardNumber);
