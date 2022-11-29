const app = {
    // J'aime mettre mes propriétés avant mes méthodes. Pour être mieux organisé
    boardElm: null,
    gameOver: false,
    counter: 0,
    player: {
      x: 0,
      y: 0,
      direction: 'right'
    },
    targetCell: {
      x: 5,
      y: 3
    },
    init() {
      console.log('init !');
      // debugger;
      // Je renseigne mes propriétés contenant des éléments HTML dans mon init afin d'être sûr que mon HTML soit charger avant d'executer le selecteur
      app.boardElm = document.querySelector('#board');
  
      app.drawBoard();
      app.listenKeyboardEvents();
    },
    drawBoard() {
      for(let rowNumber = 0; rowNumber < 4; rowNumber++) {
        const rowElm = document.createElement('div');
  
        rowElm.classList.add('row');
  
        for(let cellNumber = 0; cellNumber < 6; cellNumber++) {
          const cellElm = document.createElement('div');
  
          cellElm.classList.add('cell');
  
          // Je fais mes séries de test au moment de la création de mes cellules
          // Si ma targetCell a sa position x égale a mon numéro de colonne (cell) ET que sa position y est également à mon numéro de ligne (row)
          if(rowNumber === app.targetCell.y && cellNumber === app.targetCell.x) {
            cellElm.classList.add('targetCell');
          }
  
          // Même principe que au dessus mais avec le player
          if(rowNumber === app.player.y && cellNumber === app.player.x) {
            // Je créer mon élément qui va représenter mon joueur
            const playerElm = document.createElement('div');
            playerElm.classList.add('player', `player--${app.player.direction}`);
            cellElm.append(playerElm);
          }
  
          rowElm.append(cellElm);
        }
  
        app.boardElm.append(rowElm);
      }
  
      app.isGameOver();
    },
  
    clearBoard() {
      app.boardElm.textContent = '';
    },
  
    redrawBoard() {
      app.clearBoard();
      app.drawBoard();
    },
  
    turnLeft() {
      // Petite astuce pour arrêter l'execution du reste des instructions de la fonction. Il suffit de faire un return;. ainsi ce qu'il y a en dessous de sera jamais appeler
      if(app.gameOver) {
        return;
      }
      // Pour gérer notre direction on va essayer quelque de nouveau. Lorsque l'on tourne à gauche, on respecte toujours le même ordre de direction les uns après les autres.
      // Sa tombe, un tableau respecte l'ordre que l'on défini
      // On créer un tableau qui contient nos directions dans le bon ordre de passation (je passe de left à down, de down à right, de right a up, de up à left)
      const directions = ['left', 'down', 'right', 'up'];
      // On va ici récupérer l'index de notre direction actuel pour pouvoir grâce à celui ci prendre l'élément juste à côté qui est notre futur direction
      const currentDirectionIndex = directions.findIndex((direction) => {
        // Si la condition mise dans le findIndex est vrai, alors cette méthode retournera la valeur de l'index de l'élément
        return direction === app.player.direction;
      });
  
      // Je rajoute ensuite 1 à mon index récupérer pour avoir ma nouvelle direction
      // On rajoute un modulo de la taille du tableau afin de ne jamais sortir de notre tableau, lorsque l'on passera de notre dernier élément au suivant, le modulo nous fera retourner à l'index 0
      const newIndexDirection = (currentDirectionIndex + 1) % directions.length;
  
      app.player.direction = directions[newIndexDirection];
  
      app.counter++;
  
      app.redrawBoard();
    }, 
  
    turnRight() {
      if(app.gameOver) {
        return;
      }
      // En mode if else
      // if(app.player.direction === 'right') {
      //   app.player.direction = 'down';
      // } else if(app.player.direction === 'down') {
      //   app.player.direction = 'left';
      // } else if(app.player.direction === 'left') {
      //   app.player.direction = 'up';
      // } else if(app.player.direction === 'up') {
      //   app.player.direction = 'right';
      // }
      switch (app.player.direction) {
      case 'right':
        app.player.direction = 'down';
        // Le break permet de ne pas tester les autres case et de sortir du switch
        break;
      case 'down':
        app.player.direction = 'left';
        break;
      case 'left':
        app.player.direction = 'up';
        break;
      case 'up':
        app.player.direction = 'right';
        break;
      // Cas par défaut si les autres case sont fausse
      default:
        console.log('direction non gérée');
      }
      app.counter++;
      app.redrawBoard();
    },
  
    moveForward() {
      if(app.gameOver) {
        return;
      }
      switch (app.player.direction) {
      case 'right':
        // Pourquoi 5 et pas 6
        // On se déplace si on est pas sur la dernière case. Vu que l'on commence à 0, x peut aller de 0 à 5 et donc on autorise le déplacement seulement si on est pas sur la colonne numéro 5
        if(app.player.x < 5) {
          app.player.x++;
        } else {
          console.log("impossible d'aller plus à droite");
        }
        break;
      case 'down':
        if(app.player.y < 3) {
          app.player.y++;
        } else {
          console.log("impossible d'aller plus en bas");
        }
        break;
      case 'left':
        if(app.player.x > 0) {
          app.player.x--;
        } else {
          console.log("impossible d'aller plus à gauche");
        }
        break;
      case 'up':
        if(app.player.y > 0) {
          app.player.y--;
        } else {
          console.log("impossible d'aller plus en haut");
        }
        break;
        // Cas par défaut si les autres case sont fausse
      default:
        console.log('direction non gérée');
      }
  
      app.counter++;
  
      // Je redessine la map après chaque modification
      app.redrawBoard();
    },
    listenKeyboardEvents() {
      document.addEventListener('keydown', (event) => {
        // event.key va contenir une chaine de caractère correspondant à la touche de clavier clicker
        switch(event.key) {
        case 'ArrowUp':
          app.moveForward();
          break;
        case 'ArrowLeft':
          app.turnLeft();
          break;
        case 'ArrowRight':
          app.turnRight();
          break;
        }
      });
    },
    isGameOver() {
      if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
        app.gameOver = true;
        alert(`Yes, we dit it in ${app.counter}`);
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);
  