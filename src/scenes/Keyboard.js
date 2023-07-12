import Phaser from "phaser";
import KeyboardItem from "../game-object/KeyboardItem";
import WebFontFile from "../game-object/WebFontFile";
import { Client } from "colyseus.js"
// import config from "../config";

// const {width, height} = config

const width = 900;
const height = 650;

const values = [7, 8, 9, 4, 5, 6, 1, 2, 3, "×", 0, "✓"];

const CELL_SIZE = 55;
const CELL_PADDING = 6;

export default class Keyboard extends Phaser.Scene {
  constructor() {
    super("keyboard");
    this.host = 'wss://fresher.woay.io';
    this.client = new Client(this.host);
  }

  preload() {
    this.load.image("bg_game0", "assets/images/bg_game0.jpg");
    this.load.image("bg_help", "assets//images/bg_help.png");
    this.load.image("exit", "assets/images/but_no.png");

    //File này mọi người tự import vào nhé
    this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
  }

  create() {
    this.client.joinOrCreate("lobby").then(room => {
      room.send("findRoom", '<4-digit-code>');
      // listen to patches coming from the server
      room.onMessage("roomId", function (roomId) {
        this.client.joinById(roomId, this.roomId)
      });
    });

    this.keyboards = [];
    this.roomId = "";

    this.add.image(width / 2, height / 2, "bg_game0");
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);

    this.msgBox = this.add.image(width / 2, height / 2, "bg_help");

    this.createHeader();
    this.createKeyboard();
    this.createRoomLabel();

    this.handleOnEvent();
  }

  handleOnEvent() {
    this.input.on("gameobjectdown", (pointer, gameobject) => {
      switch (gameobject) {
        case this.exit:
          this.scene.stop();
          break;
        default:
          if (gameobject.value == "×") {
            this.roomId.length > 0 && this.setRoomId(this.roomId.slice(0, -1));
            return;
          }

          if (gameobject.value == "✓") {
            this.handleSubmit();
            return;
          }

          if (this.roomId.length > 9) {
            return;
          }

          this.setRoomId(this.roomId + gameobject.value);
          break;
      }
    });
  }

  handleSubmit() {
    console.log(this.roomId);
  }

  setRoomId(value) {
    this.roomId = value;
    this.roomLabel.setText(this.roomId);
  }

  createRoomLabel() {
    this.roomLabel = this.add
      .text(this.msgBox.x - 100, this.msgBox.y, this.roomId || "0000", {
        fontFamily: "Permanent Marker",
        fontSize: "40px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }

  createKeyboard() {
    values.forEach((value) => {
      let backgroundColor = undefined;
      let borderColor = undefined;

      if (value === "✓") {
        backgroundColor = 0x30e451;
        borderColor = 0x1c842c;
      }

      if (value === "×") {
        backgroundColor = 0xf87171;
        borderColor = 0xdc2626;
      }

      const keyboard = new KeyboardItem(
        this,
        CELL_SIZE,
        value,
        backgroundColor,
        borderColor
      );
      this.keyboards.push(keyboard);
    });

    Phaser.Actions.GridAlign(this.keyboards, {
      width: 3,
      height: 4,
      cellWidth: CELL_SIZE + CELL_PADDING,
      cellHeight: CELL_SIZE + CELL_PADDING,
      x: this.msgBox.x + 120,
      y: this.msgBox.y - 60,
    });

    this.keyboards.forEach((keyboard) => {
      keyboard.createText();
    });
  }

  createHeader() {
    this.exit = this.add.sprite(
      this.msgBox.x + this.msgBox.width / 2 - 70,
      this.msgBox.y - this.msgBox.height / 2 + 70,
      "exit"
    ).setScale(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start("start-game"))

    this.titleText = this.add
      .text(
        this.msgBox.x - this.msgBox.width / 2 + 50,
        this.msgBox.y - this.msgBox.height / 2 + 50,
        "please enter room id",
        {
          fontFamily: "Permanent Marker",
          fontSize: "30px",
          color: "#ffffff",
          wordWrap: { width: this.msgBox.width - 80 },
        }
      )
      .setShadow(-5, 5, "rgba(0,0,0,0.5)", 0);
  }
}
