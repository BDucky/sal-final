import Phaser from 'phaser'

import PlayScene from './scenes/PlayScene'
import Keyboard from './scenes/Keyboard'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 900,
	height: 650,
	physics: {
		default: 'arcade',
		arcade: {
			// gravity: { y: 200 },
		},
	},
	scene: [PlayScene],
}

export default new Phaser.Game(config)
