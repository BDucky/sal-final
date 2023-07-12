import Phaser from "phaser";
import { gameSettings } from "./GameSettings";

var SNAKE_PADDING = [
  {id: 1, x: -75, y: 0},
  {id: 2, x: -75, y: 0},
  {id: 3, x: -10, y: 0},
  {id: 4, x: -10, y: -30},
  {id: 5, x: -10, y: 0},
  {id: 6, x: 0, y: 0},
]
export default class Snake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, number, x, y, texture) {
    texture = "snake_" + number;
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.anims.create({
      key: "snake_1_eat",
      frames: this.anims.generateFrameNumbers(`snake_1`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "snake_2_eat",
      frames: this.anims.generateFrameNumbers(`snake_2`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "snake_3_eat",
      frames: this.anims.generateFrameNumbers(`snake_3`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "snake_4_eat",
      frames: this.anims.generateFrameNumbers(`snake_4`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "snake_5_eat",
      frames: this.anims.generateFrameNumbers(`snake_5`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "snake_6_eat",
      frames: this.anims.generateFrameNumbers(`snake_6`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });

    if (number < 6) {
      this.setOrigin(0, 0);
    } else {
      this.setOrigin(1, 0);
    }
  }

  eat() {
    this.play("eat", true);
  }

  addSnake(id, cell) {
    this.x = cell.x + SNAKE_PADDING[id].x;
    this.y = cell.y + SNAKE_PADDING[id].y;
  }
}
