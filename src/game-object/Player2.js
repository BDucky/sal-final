import Phaser from "phaser";

export default class Player2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, "player_2");

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.anims.create({
            key: "p2_idle",
            frames: this.anims.generateFrameNumbers("player_2", { start: 0, end: 26 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "p2_move",
            frames: this.anims.generateFrameNumbers("player_2", { start: 27, end: 40 }),
            frameRate: 20,
            repeat: 0,
        });

        // this.play("p2_idle");
    }

    moveLeft() {
        this.play("p2_move", true);
        // this.setVelocityX(-velocity);
        this.flipX = false;
    }

    moveRight() {
        this.play("p2_move", true);
        // this.setVelocityX(velocity);
        this.flipX = true;
    }

    idle() {
        this.play('p2_idle')
        this.setVelocity(0)
    }
}