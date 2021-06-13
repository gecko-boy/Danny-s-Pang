import Preload from "./preload.js"
import Level001 from "./level001.js"
import Level002 from "./level002.js"
import Level003 from "./level003.js"
import Victory from "./victory.js"

const config = {
    width: 827,
    height: 523,
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene: [Preload, Level001, Level002, Level003, Victory],
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity: {y: 800},
            debug: true
        }
    },
    pixelArt: true
}

new Phaser.Game(config);