import Player from "./player.js"

let levelDataP =
[
    {
        //construtor da plataforma grande
        x: 25,
        y: 350,
        key: "bigPlat",
        width: 560,
        height:96.5,
        physics: true
    }
]

let levelDataR =
[
    {
        //construtor da rampa
        x: 100,
        y: 390,
        key: "ramp",
        width: 200,
        height:100,
        physics: true
    }
]

export default class Level001 extends Phaser.Scene
{
    constructor()
    {
        super ("Level001");
    }

    init()
    {
        //controlos do jogo
        this.controls = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        //criar grupo de física para plataformas e rampas
        this.platforms = this.physics.add.staticGroup(
            {
                allowGravity: false,
                immovable: true
            }
        );
        this.ramps = this.physics.add.staticGroup(
            {
                allowGravity: false,
                immovable: true
            }
        );

        //aplicar cenário
        this.add.image(0, 0, "level1").setOrigin(0).setScale(1);

        //chamar métodos para posicionar plataformas e rampas
        this.createPlatforms();
        this.createRamps();

        //criar jogador com base na classe
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "player", 0
        ).setScale(0.3);

        //habilitar overlaps entre player e plataformas/rampas
        this.physics.add.overlap(this.player, this.platforms, this.onPlatform, null, this);
        this.physics.add.overlap(this.player, this.ramps, this.onRamp, null, this);
    }

    createPlatforms()
    {
        //criar plataformas
        levelDataP.forEach(
            data => {
                console.log("plataformas");
                let newPlatform = this.add.sprite(data.x, data.y, data.key);
                newPlatform.setOrigin(0).setScale(0.24);
                this.platforms.add(newPlatform);
            }
        )
    }

    createRamps()
    {
        //criar rampas
        levelDataR.forEach(
            data => {
                console.log("rampas");
                let newRamp = this.add.sprite(data.x, data.y, data.key);
                newRamp.setOrigin(0).setScale(0.1);
                this.ramps.add(newRamp);
            }
        )
    }

    //chamar métodos de interação com plataformas e rampas da classe do player
    onPlatform(player, platform)
    {
        this.player.setOnPlatform(true);
    }

    onRamp(player, ramp)
    {
        this.player.setOnRamp(true);
        
    }

    update(time)
    {
        //chamar updates e métodos necessários do player
        this.player.update(time);

    }
}