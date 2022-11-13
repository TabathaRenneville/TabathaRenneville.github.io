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



createPalette() {

//   <div class="palette">
  //   <div class="palette__img palette__img--ete"></div>
  //   <div class="palette__img palette__img--automne"></div>
  //   <div class="palette__img palette__img--hiver"></div>
  //   <div class="palette__img palette__img--printemps"></div>
  // </div>

const paletteElm = document.createElement('div');
paletteElm.classList.add('palette');


for(const style of app.style){

  const imgELm = document.createElement('div');
  imgELm.classList.add('palette__img', 'palette__img--${style}');

  if(style === app.currentStyle) {
    imgELm.classList.add('palette__img--on');
  }

  imgELm.dataset.style = style,

  imgELm.addEventListener('click', app.handleClickImg);

  paletteElm.append(imgELm);

},

  handleClickImg(event) {
    const imgElm = event.currentTarget;

    const activeColorElm = document.querySelector('palette__img--on');

    // on retire la classe à l'ancien élement
    activeColorElm.classList.remove('palette__img--on';
    
    // on jaoute la classe au nouvel elémént qu'on souahite utiliset
    imgElm.classList.add('palette__img--on');

    app.currentStyle = imgElm.dataset.style
  

  };




}