import { appendElement } from "./helpers.js";
import { CARD_ISSUERS } from "./issuerObjects.js";

const CARD_GALLERY = document.querySelector('.card-gallery__grid-container');

function getCardIssuers(){
    let issuers = [];
    for(let cardIssuer of CARD_ISSUERS){
        issuers.push({
            name: cardIssuer.name,
            testCards: cardIssuer.testCards,
        });
    };
    return issuers;
};

function createIssuerCard(issuer,parent){
    let displayCard = appendElement(parent,'div','card-gallery__issuer-card');
    appendElement(displayCard,'h3','card-gallery__subheading',issuer.name);
    for(let cardNumber of issuer.testCards){
        let  cardNumberField = appendElement(displayCard, 'div','card-gallery__card-info');
        let cardNumberText = appendElement(cardNumberField, 'p','card-gallery__card-number',cardNumber);
        let copyButton = appendElement(cardNumberField, 'button','card-gallery__copy-button','Copy');
        copyButton.addEventListener('click',copyTarget)
    }
}

function copyTarget(){
    let targetText = this.previousElementSibling.innerText;
    navigator.clipboard.writeText(targetText);
    alert(`Copied the card number: ${targetText}`);
}

for(let issuer of getCardIssuers()){
    createIssuerCard(issuer,CARD_GALLERY);
}