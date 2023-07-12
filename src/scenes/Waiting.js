export default class Waiting extends Phaser.Scene {
  constructor() {
    super("host-game");
    const host = "ws://192.168.10.6:2567";
    const client = new Colyseus.Client(host);
  }

  create() {
    client.create("snake_and_ladder").then((room) => {
      room.onStateChange.once((state) => {
        if (state.code) {
          //TODO: Show code lên màn hình
        }
      });
    });
  }
}
