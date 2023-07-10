import Phaser from "phaser";

export default class Dice extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, value) {
        super(scene, x, y, "launch-dice");

        this.anims.create({
            key: "dice1",
            frames: this.anims.generateFrameNumbers("dice1", { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: "dice2",
            frames: this.anims.generateFrameNumbers("dice1", { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: "dice3",
            frames: this.anims.generateFrameNumbers("dice1", { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: "dice4",
            frames: this.anims.generateFrameNumbers("dice1", { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: "dice5",
            frames: this.anims.generateFrameNumbers("dice1", { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: "dice6",
            frames: this.anims.generateFrameNumbers("dice1", { start: 0, end: 11 }),
            frameRate: 5,
            repeat: 0,
        });

        scene.physics.add.existing(this);
        this.setInteractive();
        scene.add.existing(this);
    }

    launchDice(value) {
        if (value === 1) {
            this.play("dice1", true);
        } else if (value == 2) {
            this.play("dice2", true);
        } else if (value == 3) {
            this.play("dice3", true);
        } else if (value == 4) {
            this.play("dice4", true);
        } else if (value == 5) {
            this.play("dice5", true);
        } else if (value == 6) {
            this.play("dice6", true);
        }
    }
}
