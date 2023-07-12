import Phaser from "phaser";

export default class Snake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, number, x, y, texture) {
    texture = "snake_" + number;
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.anims.create({
      key: "eat",
      frames: this.anims.generateFrameNumbers(`snake_1`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "eat",
      frames: this.anims.generateFrameNumbers(`snake_2`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "eat",
      frames: this.anims.generateFrameNumbers(`snake_3`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "eat",
      frames: this.anims.generateFrameNumbers(`snake_4`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "eat",
      frames: this.anims.generateFrameNumbers(`snake_5`, {
        start: 0,
        end: 31,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "eat",
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
}
