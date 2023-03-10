const app = {
  colors: ['red','green','blue','yellow'],

  sequence: [],

  indice: 0,

  timeoutRef: null,

  canClick: false,

  drawCells: function () {
    const playground = document.getElementById('playground');
    for (const color of app.colors) {
      let cellElm = document.createElement('div');
      cellElm.className = 'cell';
      cellElm.id = color;
      cellElm.style.backgroundColor = color;

      cellElm.addEventListener('click', app.handleClickColor);

      playground.appendChild(cellElm);
    }
  },

  bumpCell: function (color) {

    document.getElementById(color).style.borderWidth = '45px';
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);

  },

  addRandomColorInSequence() {
    let random = Math.floor(Math.random()*4);
    app.sequence.push( app.colors[random] );
  },

  newGame: function () {
    app.sequence = [];
    for (let index = 0; index < 3; index++) {
      app.addRandomColorInSequence();
    }

    app.simonSays(app.sequence);
  },

  simonSays: function (sequence) {
    if (sequence && sequence.length) {
      app.canClick = false;
      app.showMessage('Memorize !');
      setTimeout( app.bumpCell, 500, sequence[0] );
      setTimeout( app.simonSays, 850, sequence.slice(1));
    } else {
      app.showMessage("Your turn !");

      app.startTimeout();

      app.canClick = true;
    }
  },

  init: function () {
    console.log('init');
    app.drawCells();

    document.getElementById('go').addEventListener('click', app.newGame );
  },


  showMessage: function (message) {
    const messageElm = document.getElementById('message');
    messageElm.textContent = message;
    messageElm.style.display = 'block';

    const goElm = document.getElementById('go');  
    goElm.style.display = 'none';
  },

  hideMessage: function () {
    const messageElm = document.getElementById('message');
    messageElm.style.display = 'none';

    const goElm = document.getElementById('go');
    goElm.style.display = 'block';
  },

  alertGameOver: function (message) {
    const messageElm = document.getElementById('message');
    messageElm.textContent = message;
    messageElm.style.display = 'block';

    const goElm = document.getElementById('go');  
    goElm.style.display = 'block';
  },

  gameOver() {
    app.alertGameOver(`Game over. Score: ${app.sequence.length-3}`);

    app.sequence = [];
  },

  handleClickColor(event) {
  
    if(!app.canClick) {
      return;
    }

    app.stopTimeout();
    const colorElm = event.currentTarget;
    const colorClicked = colorElm.id;

    app.bumpCell(colorClicked);

    const colorExpected = app.sequence[app.indice];
    if(colorClicked !== colorExpected) {
      app.gameOver();
    } 
    else if(app.sequence.length - 1 === app.indice) {
      app.nextMove();
    }
    else {
      app.indice++;
      app.startTimeout();
    }
  },

  nextMove() {
    app.addRandomColorInSequence();
    app.simonSays(app.sequence);

    app.indice = 0;
  },

  startTimeout() {
    app.timeoutRef = setTimeout(app.gameOver, 5000);
  },

  stopTimeout() {
    clearTimeout(app.timeoutRef);
  }

};

document.addEventListener('DOMContentLoaded', app.init);