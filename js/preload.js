export default class Preload extends Phaser.Scene
{
    constructor()
    {
        super("Preload");
    }

    preload()
    {
        //carregar as imagens todas
        this.load.image("level1", "./images/1cenario.png");
        this.load.image("level2", "./images/2cenario.png");
        this.load.image("level3", "./images/3cenario (2).png");
        this.load.image("glassBall", "./images/bolas.png");
        this.load.image("bloodBall", "./images/bolas2.png");
        this.load.image("spear", "./images/lança.png");
        this.load.image("bigPlat", "./images/plataformas.png");
        this.load.image("smallPlat", "./images/plataformas2.png");
        //carregar spritesheet do Danny
        this.load.spritesheet("player", "./images/player_spritesheet.png",
        {
            frameWidth: 317.5,
            frameHeight: 452
        });
        this.load.image("ramp", "./images/rampa.png");
    }

    create()
    {
        this.createAnimation();

        //Carregar o nível 1
        this.scene.start("Level001");
    }

    createAnimation()
    {
        //criar a animação do Danny a pedalar
        this.anims.create({
            key: "cycling",
            frames: this.anims.generateFrameNames("player",
            {
                frames: [0, 1]
            }),
            frameRate: 12,
            yoyo: true,
            repeat: -1
        });
    }
}