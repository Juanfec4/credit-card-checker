const HAMBURGER_MENU = document.querySelector(".hamburger__bar-container");

HAMBURGER_MENU.addEventListener("click", mobileView);

function mobileView(){
    document.querySelector(".nav--mobile").classList.toggle('hidden');
    HAMBURGER_MENU.classList.toggle('active');
    console.log('test');
};
