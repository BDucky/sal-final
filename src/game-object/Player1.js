import Phaser from "phaser";

export default class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, "player_1");

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.anims.create({
            key: "p1_idle",
            frames: this.anims.generateFrameNumbers("player_1", { start: 0, end: 26 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "p1_move",
            frames: this.anims.generateFrameNumbers("player_1", { start: 27, end: 40 }),
            frameRate: 20,
            repeat: 0,
        });

        this.play("p1_idle");
    }

    moveLeft() {
        this.play("p1_move", true);
        // this.setVelocityX(-velocity);
        this.flipX = false;
    }

    moveRight() {
        this.play("p1_move", true);
        // this.setVelocityX(velocity);
        this.flipX = true;
    }

    idle() {
        this.play('p1_idle')
        this.setVelocity(0)
    }
}