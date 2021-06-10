import Player from "./player.js"

let levelDataP =
[
    {
        //construtor da plataforma grande
        x: 1024 - 128,
        y: 2048 - 192,
        key: "bigPlat",
        width: 120,
        height:120,
        physics: true
    },
    {
        //construtor da plataforma mais pequena
        x: 1024 - 128,
        y: 2048 - 192,
        key: "bigPlat",
        width: 100,
        height:100,
        physics: true
    }
]

let levelDataR =
[
    {
        //construtor da rampa
        x: 1024 - 128,
        y: 2048 - 192,
        key: "ramp",
        width: 120,
        height:120,
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
        this.controls = this.input.keyboard.createCursorKeys();
    }

    create()
    {
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

        this.add.image(0, 0, "background").setOrigin(0).setScale(1);

        this.createPlatforms();
        this.createRamps();

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "player", 0
        ).setScale(1);

        this.physics.add.overlap(this.player, this.platforms, this.onPlatform, null, this);
        this.physics.add.overlap(this.player, this.ramps, this.onRamp, null, this);
    }

    createPlatforms()
    {
        levelDataP.forEach(
            data => {
                let newPlatform = this.add.sprite(data.x, data.y, data.key);
                newPlatform.setOrigin(0);
                this.platforms.add(newPlatform);
            }
        )
    }

    createRamps()
    {
        levelDataR.forEach(
            data => {
                let newRamp = this.add.sprite(data.x, data.y, data.key);
                newRamp.setOrigin(0);
                this.ramps.add(newRamp);
            }
        )
    }

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
        this.player.update(time);
        this.player.setOnPlatform(false);
        this.player.setOnRamp(false);
    }
}