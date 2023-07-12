import Phaser from "phaser";
import KeyboardItem from "../game-object/KeyboardItem";
import WebFontFile from "../game-object/WebFontFile";
import { Client } from "colyseus.js"


const width = 900;
const height = 650;

export default class Waiting extends Phaser.Scene {
    constructor() {
        super("host-game")
        this.host = "wss://fresher.woay.io";
        this.client = new Client(this.host);
    }

    preload() {
        this.load.image("bg_game0", "assets/images/bg_game0.jpg");
        this.load.image("bg_help", "assets//images/bg_help.png");
        this.load.image("exit", "assets/images/but_no.png");
    }

    create() {
        this.client.create("snake_and_ladder").then((room) => {
            room.onStateChange.once((state) => {
                if (state.code) {
                    //TODO: Show code lên màn hình
                    this.data = state.board
                        .toArray()
                        .map((item) => ({
                            direction: item.direction,
                            id: item.id,
                            incX: item.incX,
                            incY: item.incY,
                            objectId: item.objectId,
                            targetCell: item.targetCell,
                            type: item.type,
                            x: item.x,
                            y: item.y
                        }))
                        console.log(state.board);
                    console.log(this.data);
                    this.statecode = state.code
                }
            });
        });


        this.add.image(width / 2, height / 2, "bg_game0");
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6);
        this.msgBox = this.add.image(width / 2, height / 2, "bg_help");
        this.createHeader();
        this.createRoomLabel();
    }

    createRoomLabel() {
        this.roomLabel = this.add
            .text(this.msgBox.x - 100, this.msgBox.y, this.statecode, {
                fontFamily: "Permanent Marker",
                fontSize: "40px",
                color: "#ffffff",
            })
            .setOrigin(0.5);
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
                "Your room id is:",
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