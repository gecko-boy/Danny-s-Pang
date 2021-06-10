import Preload from "./preload.js"
import Level001 from "./level001.js"

const config = {
    width: 827,
    height: 523,
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene: [Preload, Level001],
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