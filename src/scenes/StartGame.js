import Phaser from "phaser";

const width = 900;
const height = 650;
export default class StartGame extends Phaser.Scene {
  constructor() {
    super("start-game");
  }

  preload() {
    this.load.image("background", "assets/images/bg_game0.jpg");
    this.load.image("logo", "assets/images/logo_menu.png");
    this.load.image("play", "assets/images/but_play.png");
    this.load.image("join", "assets/images/but_vs_player.png");
  }

  create() {
    this.add.image(width / 2, height / 2, "background");
    this.add.image(width / 2, height / 2 - 100, "logo");
    var hostRoom = this.add.image(width / 2 - 100, height / 2 + 150, "play").setInteractive({
      cursor: "pointer",
    });
    var joinRoom = this.add.image(width / 2 + 100, height / 2 + 150, "join").setInteractive({
      cursor: "pointer",
    });
    
    hostRoom.on('pointerdown', function () {
      this.scene.start('host-game')
    }, this);

    joinRoom.on('pointerdown', function () {
      this.scene.start('keyboard')
    }, this);
  }
}
