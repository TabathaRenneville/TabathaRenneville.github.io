// ouverture du cv au click

const container = document.querySelector(".container");
const signUpButton = document.querySelector(".green-bg button");

signUpButton.addEventListener("click", ()=>{
    container.classList.toggle("change")

})


const togglerElem = document.getElementById('formation-button');

function formationClick() {
  const formationOn = document.getElementById('formation-article');
  formationOn.classList.toggle('formation--on');
}

togglerElem.addEventListener('click', formationClick);

const xpElm = document.getElementById('xp-button');

function xpClick() {
  const xpOn = document.getElementById('xp-article');
  xpOn.classList.toggle('xp--on');
}

xpElm.addEventListener('click', xpClick);


