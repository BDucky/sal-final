import Phaser from "phaser";

import PlayScene from "./scenes/PlayScene";
import Keyboard from "./scenes/Keyboard";
import StartGame from "./scenes/StartGame";
import Waiting from "./scenes/Waiting";
import GameOver from "./scenes/GameOver";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 900,
  height: 650,
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
    },
  },
  scene: [StartGame, Waiting, Keyboard, PlayScene, GameOver],
};

export default new Phaser.Game(config);
