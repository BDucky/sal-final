import Phaser from "phaser";

const velocity = 100;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player1");

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 26 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("player1", { start: 27, end: 40 }),
            frameRate: 20,
            repeat: 0,
        });

        this.play("idle");
    }

    moveLeft() {
        this.play("move", true);
        this.setVelocityX(-velocity);
        this.flipX = false
    }

    moveRight() {
        this.play("move", true);
        // this.setVelocityX(velocity);
        this.flipX = true
    }

    idle() {
        this.play('idle')
        this.setVelocity(0)
    }

    moveUp() {
        this.play("move", true);
        this.setVelocityY(-velocity);
    }

    moveDown() {
        this.play("move", true);
        this.setVelocityY(velocity);
    }
}