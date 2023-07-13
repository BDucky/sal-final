import Dice from "../game-object/Dice";
import Phaser from "phaser";
import { gameSettings } from "../game-object/GameSettings";
import Ladder from "../game-object/Ladders";
import Snake from "../game-object/Snakes";
import Player1 from "../game-object/Player1";
import Player2 from "../game-object/Player2";

const CELL_SIZE = 55; // Size of each cell in pixels
const NUM_ROWS = 10; // Number of rows in the board
const NUM_COLS = 10; // Number of columns in the board
let PLAYER_ID = 0; // 1: Player 1, 2: Player 2
let TURN = 1; // 1: Player 1, 2: Player 2
let time = 0
export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("play-scene");
  }

  init() {
  }

  preload() {
    this.load.image("background", "assets/images/bg_game0.jpg");
    this.load.spritesheet("player_1", "assets/spritesheets/player_1.png", {
      frameWidth: 58,
      frameHeight: 70,
    });
    this.load.spritesheet("player_2", "assets/spritesheets/player_2.png", {
      frameWidth: 50,
      frameHeight: 72,
    });
    this.load.spritesheet("but-dice", "assets/spritesheets/but_dice.png", {
      frameWidth: 84,
      frameHeight: 87,
    });
    this.load.spritesheet(
      "but-settings",
      "assets/spritesheets/but_settings.png",
      {
        frameWidth: 85,
        frameHeight: 85,
      }
    );
    this.load.spritesheet(
      "launch-dice",
      "assets/spritesheets/launch_dices.png",
      {
        frameWidth: 60,
        frameHeight: 60,
      }
    );

    for (let i = 1; i <= 6; i++) {
      this.load.spritesheet("dice-" + i, `assets/spritesheets/dice_${i}.png`, {
        frameWidth: 150,
        frameHeight: 410,
      });
    }

    this.load.image("ladder1", "assets/images/ladders/ladder_1.png");
    this.load.image("ladder2", "assets/images/ladders/ladder_2.png");
    this.load.image("ladder3", "assets/images/ladders/ladder_3.png");
    this.load.image("ladder4", "assets/images/ladders/ladder_4.png");
    this.load.image("ladder5", "assets/images/ladders/ladder_5.png");
    this.load.image("ladder6", "assets/images/ladders/ladder_6.png");
    this.load.image("ladder7", "assets/images/ladders/ladder_7.png");

    this.load.spritesheet("snake_1", "assets/spritesheets/snakes/snake_1.png", {
      frameWidth: 150,
      frameHeight: 100,
    });
    this.load.spritesheet("snake_2", "assets/spritesheets/snakes/snake_2.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("snake_3", "assets/spritesheets/snakes/snake_3.png", {
      frameWidth: 120,
      frameHeight: 200,
    });
    this.load.spritesheet("snake_4", "assets/spritesheets/snakes/snake_4.png", {
      frameWidth: 190,
      frameHeight: 72,
    });
    this.load.spritesheet("snake_5", "assets/spritesheets/snakes/snake_5.png", {
      frameWidth: 96,
      frameHeight: 310,
    });
    this.load.spritesheet("snake_6", "assets/spritesheets/snakes/snake_6.png", {
      frameWidth: 170,
      frameHeight: 90,
    });
  }

  create(data) {
    this.cellData = data
    console.log("data", data);
    this.boardData = data[0];
    this.room = data[1];

    this.background = this.add
      .tileSprite(-250, 0, 1150, 1000, "background")
      .setOrigin(0, 0);
    var settings = this.add.sprite(850, 50, "but-settings", 0).setInteractive({
      cursor: "pointer",
    });

    this.diceBtn = this.add.sprite(800, 550, "but-dice", 0);
    this.diceBtn.on("pointerdown", this.handleClickBtnDice, this);
    this.diceBtn.setInteractive({
      cursor: "pointer",
    });

    var randomSnakes = []
    var randomLadders = []

    for (let i = 0; i < this.boardData.length; i++) {
      var checkCell = this.boardData[i];
      if (checkCell.type === "ladder") {
        var id = checkCell.objectId;
        var cell = checkCell.id;
        randomLadders.push({ id: id, cell: cell });
        console.log("randomLadders", randomLadders);
      }
      if (checkCell.type === "snake") {
        var id = checkCell.objectId;
        var cell = checkCell.id;
        randomSnakes.push({ id: id, cell: cell });
        console.log("randomSnakes", randomSnakes);
      }
    }

    for (let i = 0; i < randomLadders.length; i++) {
      let ladder = randomLadders[i];
      this.addLadders(ladder.cell, ladder.id);
    }
    for (let i = 0; i < randomSnakes.length; i++) {
      let snake = randomSnakes[i];
      this.addSnakes(snake.cell, snake.id);
    }
    this.player2 = new Player2(this, 100, 525);
    this.player1 = new Player1(this, 100, 550);



    this.room.onMessage('move', (value) => {
      this.value = value.dice
      PLAYER_ID = value.playerId
      console.log("value", value);

      this.dice?.destroy();
      this.dice = new Dice(this, 800, 350, this.value);
      this.dice.launchDice(this.value);

      if (PLAYER_ID === 1 && time % 2 === 0) {
        this.movePlayer1(this.value);
        time += 1
      } else if (PLAYER_ID === 2 && time % 2 !== 0) {
        this.movePlayer2(this.value);
        time += 1
      }

      this.diceBtn.disableInteractive();
      this.diceBtn.setFrame(1);

      setTimeout(() => {
        this.diceBtn.setInteractive({
          cursor: "pointer",
        });
        this.diceBtn.setFrame(0);
        this.dice.destroy();
      }, 2500);
    })


  }
  update() {
    if (gameSettings.currentP1Cell.number === 100) {
      console.log("win");
      this.scene.start("game-over", { winner: "player 1" });
    } else if (gameSettings.currentP2Cell.number == 100) {
      this.scene.start("game-over", { winner: "player 2" });
    }
  }

  movePlayer1(value) {
    var currentCell = gameSettings.currentP1Cell;
    var nextCell = gameSettings.cells[currentCell.number + 1];
    var direction = Math.floor(currentCell.number / 10) % 2 === 0 ? 1 : -1;
    var distance = direction * (nextCell.x - currentCell.x);
    var steps = value;

    var tween = this.tweens.add({
      targets: this.player1,
      x: nextCell.x,
      y: nextCell.y,
      duration: 500,
      ease: "Linear",
      onStart: () => {
        this.player1.play("p1_move", true);
        this.player1.flipX = direction === -1;
        gameSettings.currentP1Cell = nextCell;
      },
      onComplete: () => {
        this.player1.play("p1_idle");
        if (steps > 1) {
          this.movePlayer1(steps - 1);
        } else {
          if (nextCell.ladder.x != null) {
            setTimeout(() => {
              this.movePlayer1OnLadder();
            }, 200);
          }
          if (nextCell.snake.x != null) {
            console.log("meetSnake",);
            setTimeout(() => {
              this.player1MeetSnake(nextCell.snake.number);
            }, 200);
          }
        }
      },
    });
  }

  movePlayer2(value) {
    var currentCell = gameSettings.currentP2Cell;
    var nextCell = gameSettings.cells[currentCell.number + 1];
    var direction = Math.floor(currentCell.number / 10) % 2 === 0 ? 1 : -1;
    var distance = direction * (nextCell.x - currentCell.x);
    var steps = value;

    var tween = this.tweens.add({
      targets: this.player2,
      x: nextCell.x,
      y: nextCell.y,
      duration: 500,
      ease: "Linear",
      onStart: () => {
        this.player2.play("p2_move", true);
        this.player2.flipX = direction === -1;
        gameSettings.currentP2Cell = nextCell;
      },
      onComplete: () => {
        this.player2.play("p2_idle");
        if (steps > 1) {
          this.movePlayer2(steps - 1);
        } else {
          if (nextCell.ladder.x != null) {
            setTimeout(() => {
              this.movePlayer2OnLadder();
            }, 200);
          }
          if (nextCell.snake.x != null) {
            console.log("meetSnake",);
            setTimeout(() => {
              this.player2MeetSnake(nextCell.snake.number);
            }, 200);
          }
        }
      },
    });
  }

  movePlayer1OnLadder() {
    var currentCell = gameSettings.currentP1Cell;
    var nextCell = gameSettings.cells[currentCell.number + 1];
    var direction = Math.floor(currentCell.number / 10) % 2 === 0 ? 1 : -1;
    var ladder = currentCell.ladder;

    console.log("moveOnLadder", currentCell);

    var tween = this.tweens.add({
      targets: this.player1,
      x: currentCell.ladder.toX,
      y: currentCell.ladder.toY,
      duration: 500,
      ease: "Power1",
      onStart: () => {
        this.player1.play("p1_move", true);
        this.player1.flipX = direction === -1;
        console.log("play");
      },
      onComplete: () => {
        this.player1.play("p1_idle");
        for (let i = 0; i < gameSettings.cells.length; i++) {
          let tempCell = gameSettings.cells[i];
          if (
            tempCell.x == currentCell.ladder.toX &&
            tempCell.y == currentCell.ladder.toY
          ) {
            gameSettings.currentP1Cell = tempCell;
          }
        }
      },
    });
  }

  movePlayer2OnLadder() {
    var currentCell = gameSettings.currentP2Cell;
    var nextCell = gameSettings.cells[currentCell.number + 1];
    var direction = Math.floor(currentCell.number / 10) % 2 === 0 ? 1 : -1;
    var ladder = currentCell.ladder;

    console.log("moveOnLadder", currentCell);

    var tween = this.tweens.add({
      targets: this.player2,
      x: currentCell.ladder.toX,
      y: currentCell.ladder.toY,
      duration: 500,
      ease: "Power1",
      onStart: () => {
        this.player2.play("p1_move", true);
        this.player2.flipX = direction === -1;
        console.log("play");
      },
      onComplete: () => {
        this.player2.play("p1_idle");
        for (let i = 0; i < gameSettings.cells.length; i++) {
          let tempCell = gameSettings.cells[i];
          if (
            tempCell.x == currentCell.ladder.toX &&
            tempCell.y == currentCell.ladder.toY
          ) {
            gameSettings.currentP2Cell = tempCell;
          }
        }
      },
    });
  }

  player1MeetSnake(id) {
    this.player1.destroy();
    console.log(gameSettings.currentP1Cell);
    if (id === 1) {
      this.newSnake_1.play(`snake_${id}_eat`, true);
    } else if (id === 2) {
      this.newSnake_2.play(`snake_${id}_eat`, true);
    } else if (id === 3) {
      this.newSnake_3.play(`snake_${id}_eat`, true);
    } else if (id === 4) {
      this.newSnake_4.play(`snake_${id}_eat`, true);
    } else if (id === 5) {
      this.newSnake_5.play(`snake_${id}_eat`, true);
    } else if (id === 6) {
      this.newSnake_6.play(`snake_${id}_eat`, true);
    }
    setTimeout(() => {
      for (let i = 0; i < gameSettings.cells.length; i++) {
        let tempCell = gameSettings.cells[i];
        if (
          tempCell.x == gameSettings.currentP1Cell.snake.toX &&
          tempCell.y == gameSettings.currentP1Cell.snake.toY
        ) {
          gameSettings.currentP1Cell = tempCell;
          this.player1 = new Player1(this, tempCell.x, tempCell.y);
        }
      }
    }, 1700);
  }

  player2MeetSnake(id) {
    this.player2.destroy();
    console.log(gameSettings.currentP2Cell);
    if (id === 1) {
      this.newSnake_1.play(`snake_${id}_eat`, true);
    } else if (id === 2) {
      this.newSnake_2.play(`snake_${id}_eat`, true);
    } else if (id === 3) {
      this.newSnake_3.play(`snake_${id}_eat`, true);
    } else if (id === 4) {
      this.newSnake_4.play(`snake_${id}_eat`, true);
    } else if (id === 5) {
      this.newSnake_5.play(`snake_${id}_eat`, true);
    } else if (id === 6) {
      this.newSnake_6.play(`snake_${id}_eat`, true);
    }
    setTimeout(() => {
      for (let i = 0; i < gameSettings.cells.length; i++) {
        let tempCell = gameSettings.cells[i];
        if (
          tempCell.x == gameSettings.currentP2Cell.snake.toX &&
          tempCell.y == gameSettings.currentP2Cell.snake.toY
        ) {
          gameSettings.currentP2Cell = tempCell;
          this.player2 = new Player2(this, tempCell.x, tempCell.y);
        }
      }
    }, 1700);
  }

  addLadders(cellIndex, id) {
    var cellSize = 55;
    var cell = gameSettings.cells[cellIndex]
    var ladder = gameSettings.laddersDirections[id - 1];

    if (ladder.incX !== 0) {
      var topX = cell.x + ladder.incX * cellSize;
      var topY = cell.y - ladder.incY * cellSize;
    } else if (ladder.incX === 0) {
      var topX = cell.x;
      var topY = cell.y - ladder.incY * cellSize;
    }

    cell.ladder = {
      x: cell.x,
      y: cell.y,
      toX: topX,
      toY: topY,
    };
    if (id < 2) {
      var newLadder = new Ladder(this, id, cell.x - 25, cell.y + 20);
    } else if (id == 2) {
      var newLadder = new Ladder(this, id, cell.x - 15, cell.y + 10);
    } else if (id == 3) {
      var newLadder = new Ladder(this, id, cell.x - 10, cell.y + 15);
    } else if (id == 4) {
      var newLadder = new Ladder(this, id, cell.x - 15, cell.y + 25);
    } else if (id == 5) {
      var newLadder = new Ladder(this, id, cell.x - 25, cell.y + 10);
    } else if (id == 6) {
      var newLadder = new Ladder(this, id, cell.x, cell.y + 25);
    } else if (id == 7) {
      var newLadder = new Ladder(this, id, cell.x + 1, cell.y + 25);
    }
  }

  addSnakes(cellIndex, id) {
    var cellSize = 55;
    var cell = gameSettings.cells[cellIndex]
    var snake = gameSettings.snakesDirections[id - 1];

    if (id === 1) {
      var toX = cell.x + cellSize;
      var toY = cell.y + snake.incY * cellSize;
    } else if (id === 2) {
      var toX = cell.x + snake.incX * cellSize;
      var toY = cell.y + snake.incY * cellSize;
    } else if (id === 3) {
      var toX = cell.x + snake.incX * cellSize;
      var toY = cell.y + snake.incY * cellSize;
    } else if (id === 4) {
      var toX = cell.x + snake.incX * cellSize;
      var toY = cell.y + snake.incY * cellSize;
    } else if (id === 5) {
      var toX = cell.x;
      var toY = cell.y + snake.incY * cellSize;
    } else if (id === 6) {
      var toX = cell.x + snake.incX * cellSize;
      var toY = cell.y + snake.incY * cellSize;
    }

    cell.snake = {
      x: cell.x,
      y: cell.y,
      toX: toX,
      toY: toY,
      number: id,
    };

    if (id == 1) {
      this.newSnake_1 = new Snake(this, id, cell.x - 75, cell.y);
    } else if (id == 2) {
      this.newSnake_2 = new Snake(this, id, cell.x - 75, cell.y);
    } else if (id == 3) {
      this.newSnake_3 = new Snake(this, id, cell.x - 10, cell.y);
    } else if (id == 4) {
      this.newSnake_4 = new Snake(
        this,
        id,
        cell.x - 10,
        cell.y - 30
      );
    } else if (id == 5) {
      this.newSnake_5 = new Snake(this, id, cell.x - 10, cell.y);
    } else {
      this.newSnake_6 = new Snake(this, id, cell.x, cell.y);
    }
  }

  handleClickBtnDice() {
    this.room.send('roll')
  }
}
