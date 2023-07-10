import Phaser from "phaser";

export default class Snake extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, number, x, y, texture) {

        texture = "snake_" + number;
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.anims.create({
            key: "eat",
            frames: this.anims.generateFrameNumbers(`snake_${number}`, { start: 0, end: 31 }),
            frameRate: 20,
            repeat: -1,
        });


        this.setOrigin(0.5, 0);
        this.number = number;
    }

    eat() {
        this.play("eat", true);
    }
}