const app = {
    init: function () {
      console.log('init !');

      app.boardElement = document.querySelector('#board');

      app.drawBoard();
      app.listenKeyboardEvents();

    },

    drawBoard: function () {
      for (let rowNbr = 0; rowNbr < 4; rowNbr++) {
        const rowElement = document.createElement('div');

        rowElement.classList.add('row');
        
        for (let cellNbr = 0; cellNbr < 6; cellNbr++) {
        const cellElement = document.createElement('div');

        cellElement.classList.add('cell');

        // Si ma targetCell a sa position x égale a mon numéro de colonne (cell) ET que sa position y est également à mon numéro de ligne (row)
        if (rowNbr === app.targerCell.y && cellNbr === app.targetCell.x) {
          cellElement.classList.add('targetCell');
        }
          
        if(rowNbr === app.player.y && cellNbr === app.player.x) {
          
        }
    
      }
    }





  };
  
  document.addEventListener('DOMContentLoaded', app.init);