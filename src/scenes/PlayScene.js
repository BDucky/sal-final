import Dice from '../game-object/Dice';
import Player from '../game-object/Player';
import Phaser from 'phaser'
import { gameSettings } from '../game-object/GameSettings';
import Ladder from '../game-object/Ladders';
import Snake from '../game-object/Snakes';

const CELL_SIZE = 64; // Size of each cell in pixels
const NUM_ROWS = 10; // Number of rows in the board
const NUM_COLS = 10; // Number of columns in the board

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("play-scene");
  }

  preload() {
    this.load.image("background", "assets/images/bg_game0.jpg");
    this.load.spritesheet("player1", "assets/spritesheets/player_0.png", {
      frameWidth: 58,
      frameHeight: 70,
    })
    this.load.spritesheet("but-dice", "assets/spritesheets/but_dice.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("but-settings", "assets/spritesheets/but_settings.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("launch-dice", "assets/spritesheets/launch_dices.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet("dice1", "assets/spritesheets/dice_1.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("dice2", "assets/spritesheets/dice_2.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("dice3", "assets/spritesheets/dice_3.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("dice4", "assets/spritesheets/dice_4.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("dice5", "assets/spritesheets/dice_5.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("dice6", "assets/spritesheets/dice_6.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.image("ladder1", "assets/images/ladders/ladder_1.png");
    this.load.image("ladder2", "assets/images/ladders/ladder_2.png");
    this.load.image("ladder3", "assets/images/ladders/ladder_3.png");
    this.load.image("ladder4", "assets/images/ladders/ladder_4.png");
    this.load.image("ladder5", "assets/images/ladders/ladder_5.png");
    this.load.image("ladder6", "assets/images/ladders/ladder_6.png");
    this.load.image("ladder7", "assets/images/ladders/ladder_7.png");
    this.load.image("ladder8", "assets/images/ladders/ladder_8.png");
    this.load.image("ladder9", "assets/images/ladders/ladder_9.png");

    this.load.spritesheet("snake_1", "assets/spritesheets/snakes/snake_1.png", {
      frameWidth: 160,
      frameHeight: 105,
    });
    this.load.spritesheet("snake_2", "assets/spritesheets/snakes/snake_2.png", {
      frameWidth: 150,
      frameHeight: 160,
    });
    this.load.spritesheet("snake_3", "assets/spritesheets/snakes/snake_3.png", {
      frameWidth: 100,
      frameHeight: 205,
    });
    this.load.spritesheet("snake_4", "assets/spritesheets/snakes/snake_4.png", {
      frameWidth: 185,
      frameHeight: 80,
    });
    this.load.spritesheet("snake_5", "assets/spritesheets/snakes/snake_5.png", {
      frameWidth: 100,
      frameHeight: 305,
    });
    this.load.spritesheet("snake_6", "assets/spritesheets/snakes/snake_6.png", {
      frameWidth: 150,
      frameHeight: 95,
    });
    this.load.spritesheet("snake_7", "assets/spritesheets/snakes/snake_7.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("snake_8", "assets/spritesheets/snakes/snake_8.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("snake_9", "assets/spritesheets/snakes/snake_9.png", {
      frameWidth: 85,
      frameHeight: 85,
    });
    this.load.spritesheet("snake_10", "assets/spritesheets/snakes/snake_10.png", {
      frameWidth: 100,
      frameHeight: 85,
    });
  }

  create() {
    this.background = this.add.tileSprite(-250, 0, 1150, 1000, "background").setOrigin(0, 0);
    var settings = this.add.sprite(850, 50, "but-settings", 0).setInteractive();
    // var dice = new Dice(this, 800, 550);
    //x tăng = 55
    //y tăng = 55
    this.player1 = new Player(this, 100, 550);
    //tọa độ +- 25
    // this.placeLadders()
    this.placeSnakes();
  }


  update() {
    var diceBtn = this.add.sprite(800, 550, "but-dice", 0).setInteractive();
    diceBtn.on('pointerdown', () => {
      var value = Phaser.Math.Between(1, 6);
      var launch = new Dice(this, 800, 350, value);
      launch.launchDice(value);
      console.log('value', value);
      // this.time.delayedCall(5000, () => {
      //   // Clean up after the animation is complete
      //   launch.destroy();
      // });
      this.loopMove(value);
      // for (var i = 0; i < value; i++) {
      //   this.movePlayer();
      // }
    })
  }

  movePlayer() {
    var number = gameSettings.currentP1Cell.number
    gameSettings.currentP1Cell.number += 1
    this.player1.x = gameSettings.cells[number + 1].x
    this.player1.y = gameSettings.cells[number + 1].y

    // if (Math.floor(number / 10) % 2 === 0) {
    //   this.player1.moveRight();
    // } else {
    //   this.player1.moveLeft();
    // }

    if (gameSettings.currentP1Cell.number === 100) {
      console.log('win');
    }
  }

  loopMove(steps) {
    if (steps !== 0) {
      this.movePlayer();
      setTimeout(() => {
        this.loopMove(steps - 1)
      }, 500)
    }
  }

  placeLadders() {
    var cells = gameSettings.cells;
    var cellSize = 55;
    var laddersDirections = gameSettings.laddersDirections;
    var ladderRects = []

    for (let i = 0; i < laddersDirections.length; i++) {
      let ladder = laddersDirections[i];
      let ladderX, ladderY;
      let validPosition = false;

      // Tìm vị trí hợp lệ cho thang
      while (!validPosition) {
        let valid = false;
        let ifIntersect = false;
        // Chọn một ô ngẫu nhiên trên bàn
        let cellIndex = Phaser.Math.Between(1, cells.length - 1);
        let cell = cells[cellIndex];
        console.log('cell', cell.ladder.length);

        // Kiểm tra xem thang có thể nằm trong ô này không
        if (cell.used) continue; // Nếu ô này đã được sử dụng, chọn ô khác
        if (cell.ladder.length) continue;

        if (ladder.incX !== 0) {
          var topX = cell.x + ladder.incX * cellSize;
          var topY = cell.y - ladder.incY * cellSize;
        } else if (ladder.incX === 0) {
          var topX = cell.x;
          var topY = cell.y - ladder.incY * cellSize;
        }
        if (topX >= 680 || topX <= 185 || topY <= 55 || topY >= 550) continue; // Nếu thang vượt quá kích thước của bàn, chọn ô khác

        var rectX = Math.min(cell.x, topX);
        var rectY = Math.min(cell.y, topY);
        if (topX - cell.x === 0) {
          var rectWidth = cellSize + 30;
          var rectHeight = Math.abs(topY - cell.y);
        } else {
          var rectWidth = Math.abs(topX - cell.x);
          var rectHeight = Math.abs(topY - cell.y);
        }
        var newRect = new Phaser.Geom.Rectangle(rectX, rectY, rectWidth, rectHeight);

        // Kiểm tra xem thang có chồng lên thang khác không
        for (let j = 0; j < ladderRects.length; j++) {
          let rect = ladderRects[j];

          if (Phaser.Geom.Intersects.RectangleToRectangle(rect, newRect)) {
            ifIntersect = true;
            console.log(`intersect`);
            break;
          }
        }

        if (ifIntersect === true) {
          newRect = null
          validPosition = false;
          valid = false;
        } else {
          validPosition = true;
          valid = true;
        }

        // Nếu tất cả các ô đều có tình trạng là 0, thì vị trí của thang là hợp lệ
        if (valid) {
          ladderX = cell.x;
          ladderY = cell.y;
          cell.ladder = { x: ladderX, y: ladderY, toX: topX, toY: topY };
          validPosition = true;
          cell.used = true;

          if (i < 2) {
            var newLadder = new Ladder(this, i + 1, cell.x - 25, cell.y + 20);
          } else if (i == 2) {
            var newLadder = new Ladder(this, i + 1, cell.x - 15, cell.y + 10);
          } else if (i == 3) {
            var newLadder = new Ladder(this, i + 1, cell.x - 10, cell.y + 30);
          } else if (i == 4) {
            var newLadder = new Ladder(this, i + 1, cell.x - 25, cell.y + 10);
          }
          else {
            var newLadder = new Ladder(this, i + 1, cell.x + 5, cell.y + 30);
          }

          var ladderBound = newLadder.getBounds();
          var ladderRect = new Phaser.Geom.Rectangle(ladderBound.x, ladderBound.y, ladderBound.width + 30, ladderBound.height + 30);
          ladderRects.push(ladderRect);
        }
      }
    }
  }

  placeSnakes() {
    var cells = gameSettings.cells;
    var cellSize = 55;
    var snakesDirections = gameSettings.snakesDirections;

    for (let i = 0; i < snakesDirections.length; i++) {
      let snake = snakesDirections[i];
      let snakeX, snakeY;
      let validPosition = false;

      while (!validPosition) {
        let valid = false;
        let ifIntersect = false;
        // Chọn một ô ngẫu nhiên trên bàn
        let cellIndex = Phaser.Math.Between(1, cells.length - 1);
        let cell = cells[cellIndex];
        console.log('cell', cell);

        // Kiểm tra xem thang có thể nằm trong ô này không
        if (cell.used) continue;
        if (cell.ladder.length) continue;

        if (i < 5) {
          var toX = cell.x + (snake.width - 1) * cellSize;
          var toY = cell.y + snake.incY * cellSize;
        } else {
          var toX = cell.x - (snake.width - 1) * cellSize;
          var toY = cell.y + snake.incY * cellSize;
        }
        if (toX >= 625 || toX <= 295 || toY <= 110 || toY >= 495) continue;

        valid = true;
        if (valid) {
          console.log('valid');
          snakeX = cell.x;
          snakeY = cell.y;
          cell.snake = { x: snakeX, y: snakeY, toX: toX, toY: toY };
          validPosition = true;
          cell.used = true;
          if (i < 1) {
            var newSnake = new Snake(this, i + 1, cell.x - 75, cell.y);
            cells[cellIndex - 12].used = true;
          } else if (i == 1) {
            var newSnake = new Snake(this, i + 1, cell.x - 75, cell.y);
            if (Math.floor(cellIndex / 10) % 2 === 0) {
              cells[cellIndex - 21].used = true;
            } else {
              cells[cellIndex - 19].used = true;
            }
          } else if (i == 2) {
            var newSnake = new Snake(this, i + 1, cell.x - 10, cell.y);
          } else if (i == 3) {
            var newSnake = new Snake(this, i + 1, cell.x - 10, cell.y - 30);
          } else if (i == 4) {
            var newSnake = new Snake(this, i + 1, cell.x - 25, cell.y - 5);
          }
          else {
            var newSnake = new Snake(this, i + 1, cell.x - 15, cell.y);
          }
        }
      }
    }
  }
}
