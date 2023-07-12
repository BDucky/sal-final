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

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("play-scene");
  }

  preload() {
    this.load.image("background", "assets/images/bg_game0.jpg");
    this.load.spritesheet("player_1", "assets/spritesheets/player_1.png", {
      frameWidth: 58,
      frameHeight: 70,
    });
    this.load.spritesheet("player_2", "assets/spritesheets/player_2.png", {
      frameWidth: 55,
      frameHeight: 68,
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

  create() {
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

    var randomSnakes = [
      { id: 1, cell: 75 },
      { id: 2, cell: 45 },
      { id: 3, cell: 59 },
      { id: 4, cell: 62 },
      { id: 5, cell: 88 },
      { id: 6, cell: 14 },
    ]
    var randomLadders = [{ id: 6, cell: 27 }, { id: 1, cell: 3 }]

    // var dice = new Dice(this, 800, 550);
    //x tăng = 55
    //y tăng = 55
    //tọa độ +- 25
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
  }

  update() { }

  movePlayer(value) {
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
          this.movePlayer(steps - 1);
        } else {
          if (nextCell.ladder.x != null) {
            setTimeout(() => {
              this.movePlayerOnLadder();
            }, 200);
          }
          if (nextCell.snake.x != null) {
            console.log("meetSnake",);
            setTimeout(() => {
              this.meetSnake(nextCell.snake.number);
            }, 200);
          }
        }
      },
    });
  }

  movePlayerOnLadder() {
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
        console.log("currentP1Cell", gameSettings.currentP1Cell);
      },
    });
  }

  meetSnake(id) {
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
      var newLadder = new Ladder(this, id, cell.x - 10, cell.y + 30);
    } else if (id == 4) {
      var newLadder = new Ladder(this, id, cell.x - 25, cell.y + 10);
    } else {
      var newLadder = new Ladder(this, id, cell.x + 5, cell.y + 30);
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
    var value = Phaser.Math.Between(1, 6);
    // var value = 5;
    this.diceBtn.disableInteractive();
    this.diceBtn.setFrame(1);
    this.dice = new Dice(this, 800, 350, value);
    this.dice.launchDice(value);
    this.movePlayer(value);
    setTimeout(() => {
      this.dice.destroy();
      this.diceBtn.setInteractive({
        cursor: "pointer",
      });
      this.diceBtn.setFrame(0);
    }, 2000);
  }
}
