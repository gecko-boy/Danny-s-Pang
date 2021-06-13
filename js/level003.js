import Player from "./player.js"
import Player2 from "./player2.js"
import Balls from "./balls.js"

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
    },
    {
        x: 620,
        y: 200,
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

export default class Level003 extends Phaser.Scene
{
    constructor()
    {
        super ("Level003");
    }

    init()
    {
        //controlos do jogo
        this.controls = this.input.keyboard.createCursorKeys();

        this.ballAmount = 8;

        this.lifeIcons =[];
        this.lifeIcons2=[];

        //estas teclas foram criadas apenas para o professor poder navegar entre níveis mais facilmente
        this.debugKeys = this.input.keyboard.addKeys({
            level1: Phaser.Input.Keyboard.KeyCodes.ONE,
            level2: Phaser.Input.Keyboard.KeyCodes.TWO,
            level3: Phaser.Input.Keyboard.KeyCodes.THREE,
            victory: Phaser.Input.Keyboard.KeyCodes.V
        })
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

        this.balls = [];

        //aplicar cenário
        this.add.image(0, 0, "level3").setOrigin(0).setScale(1);

        //chamar métodos para posicionar plataformas e rampas
        this.createPlatforms();
        this.createRamps();

        //criar jogadores
        this.player = new Player(
            this,
            this.game.config.width * 0.4,
            this.game.config.height - 20,
            "player", 0
        ).setScale(0.3);

        this.player2 = new Player2(
            this,
            this.game.config.width * 0.6,
            this.game.config.height - 20,
            "player2", 0
        ).setScale(0.04);

        //chamar arpões
        this.harp1 = this.player.harp;
        this.harp2 = this.player2.harp;

        //criar bolas
        let firstBall = new Balls(this, this.game.config.width * 0.2, this.game.config.height * 0.2, "glassBall", 0);
        let secondBall = new Balls(this, this.game.config.width * 0.7, this.game.config.height * 0.25, "glassBall", 0);
        this.balls.push(firstBall);
        this.balls.push(secondBall);

        //física das bolas => colliders
        this.physics.add.overlap(this.player, this.balls, this.onBall, null, this);
        this.physics.add.overlap(this.player2, this.balls, this.onBall, null, this);
        this.physics.add.collider(this.balls, this.platforms);
        this.physics.add.collider(this.balls, this.harp1, this.onSpeared, null, this);
        this.physics.add.overlap(this.balls, this.harp2, this.onSpeared, null, this);

        //habilitar overlaps entre player e plataformas/rampas
        this.physics.add.overlap(this.player, this.platforms, this.onPlatform, null, this);
        this.physics.add.overlap(this.player, this.ramps, this.onRamp, null, this);
        this.physics.add.overlap(this.player2, this.platforms, this.onPlatform2, null, this);
        this.physics.add.overlap(this.player2, this.ramps, this.onRamp2, null, this);

        //preparar HUD
        this.hudMaker();
        this.hudMaker2();
    }

    hudMaker()
    {
        this.lifesRemaining = this.player.lifeGetter();

        for(let i = 0; i < this.lifesRemaining; i++)
        {
            this.lifeIcons.push(this.add.image(50 + i * 70, 50, "heart").setScale(0.03));
        }
    }

    hudMaker2()
    {
        this.lifesRemaining = this.player2.lifeGetter();

        for(let i = 0; i < this.lifesRemaining; i++)
        {
            this.lifeIcons2.push(this.add.image(this.game.config.width - 50 - i * 70, 50, "heart").setScale(0.03));
        }
    }

    createPlatforms()
    {
        //criar plataformas
        levelDataP.forEach(
            data => {
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
    onPlatform2(player2, platform)
    {
        this.player2.setOnPlatform(true);
    }
    onRamp2(player2, ramp)
    {
        this.player2.setOnRamp(true);  
    }

    //chamar métodops de interação com bolas
    onBall(player, ball)
    {
        player.hit();
        if(!player.Dead())
        {
            player.setPosition(this.game.config.width * 0.5, this.game.config.height * 1);
        } else {
            this.scene.restart();
        }
    }

    onBall2(player2, ball)
    {
        player2.hit();
        if(!player2.Dead())
        {
            player2.setPosition(this.game.config.width * 0.5, this.game.config.height * 1);
        } else {
            this.scene.restart();
        }
    }

    onSpeared(ball, harp)
    {
        if(ball.currentSize === "big")
        {
            harp.y = -100;
            let smallerBall1 = new Balls(this, ball.x - ball.displayWidth * 0.5, ball.y - 10, "bloodBall", 0).setScale(ball.sizes.medium);
            let smallerBall2 = new Balls(this, ball.x + ball.displayWidth * 0.5, ball.y - 10, "bloodBall", 0).setScale(ball.sizes.medium);
            
            this.physics.add.overlap(smallerBall1, this.harp1, this.onSpeared, null, this);
            this.physics.add.overlap(smallerBall1, this.harp2, this.onSpeared, null, this);
            this.physics.add.overlap(smallerBall2, this.harp1, this.onSpeared, null, this);
            this.physics.add.overlap(smallerBall2, this.harp2, this.onSpeared, null, this);
            this.physics.add.overlap(this.player, smallerBall1, this.onBall, null, this);
            this.physics.add.overlap(this.player2, smallerBall1, this.onBall, null, this);
            this.physics.add.overlap(this.player, smallerBall2, this.onBall, null, this);
            this.physics.add.overlap(this.player2, smallerBall2, this.onBall, null, this);
            this.physics.add.collider(smallerBall1, this.platforms);
            this.physics.add.collider(smallerBall2, this.platforms);

            smallerBall1.currentSize = "medium";
            smallerBall2.currentSize = "medium";
            ball.destroy();

            this.ballAmount--;
        }
        else if(ball.currentSize === "medium")
        {
            harp.y = -100;
            let smallerBall1 = new Balls(this, ball.x - ball.displayWidth * 0.5, ball.y -25, "bloodBall", 0).setScale(ball.sizes.small);
            let smallerBall2 = new Balls(this, ball.x + ball.displayWidth * 0.5, ball.y - 25, "bloodBall", 0).setScale(ball.sizes.small);

            this.physics.add.overlap(smallerBall1, this.harp1, this.onSpeared, null, this);
            this.physics.add.overlap(smallerBall1, this.harp2, this.onSpeared, null, this);
            this.physics.add.overlap(smallerBall2, this.harp1, this.onSpeared, null, this);
            this.physics.add.overlap(smallerBall2, this.harp2, this.onSpeared, null, this);
            this.physics.add.overlap(this.player, smallerBall1, this.onBall, null, this);
            this.physics.add.overlap(this.player2, smallerBall1, this.onBall, null, this);
            this.physics.add.overlap(this.player, smallerBall2, this.onBall, null, this);
            this.physics.add.overlap(this.player2, smallerBall2, this.onBall, null, this);
            this.physics.add.collider(smallerBall1, this.platforms);
            this.physics.add.collider(smallerBall2, this.platforms);

            smallerBall1.currentSize = "small";
            smallerBall2.currentSize = "small";
            ball.destroy();

            this.ballAmount--;
        }
        else if(ball.currentSize === "small")
        {
            harp.y = -100;
            ball.destroy();
        }

    }

    update(time)
    {
        if(this.debugKeys.level1.isDown)
        {
            this.scene.start("Level001");
        }
        else if(this.debugKeys.level2.isDown)
        {
            this.scene.start("Level002");
        }
        //passar de nível
        if(this.ballAmount <= 0 || this.debugKeys.victory.isDown)
        {
            this.scene.start("Victory");
        }

        //chamar updates e métodos necessários do player
        this.player.update(time);
        this.player2.update(time);

        //atualizar do hud
        for(let i = this.lifeIcons.length - 1; i >= this.player.life; --i)
        {
            //MUDAR A TEXTURA
            this.lifeIcons[i].setTexture("heartBW");
        }

        for(let i = this.lifeIcons2.length - 1; i >= this.player2.life; i--)
        {
            this.lifeIcons2[i].setTexture("heartBW");
        }

        //Manter as variáveis booleanas falsas quando fora de colisão
        this.player.setOnPlatform(false);
        this.player.setOnRamp(false);
        this.player2.setOnPlatform(false);
        this.player2.setOnRamp(false);

    }
}