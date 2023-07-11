import Phaser from "phaser";

export default class Dice extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, value) {
        super(scene, x, y, value);

        this.anims.create({
            key: "dice-" + value,
            frames: this.anims.generateFrameNumbers("dice-" + value, { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 0,
        });

        scene.physics.add.existing(this);
        this.setInteractive();
        scene.add.existing(this);
    }

    launchDice(value) {
        this.play("dice-" + value, true)
        console.log("dice-" + value);
    }
}
