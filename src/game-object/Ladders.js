import Phaser from "phaser";

export default class Ladder extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, number, x, y, texture) {

        texture = "ladder" + number;
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        if (number < 6) {
            this.setOrigin(0, 1);
        } else {
            this.setOrigin(1, 1);
        }

        this.number = number;
    }
}