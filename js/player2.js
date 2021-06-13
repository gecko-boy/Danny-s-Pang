class Harpoon extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, harpoon)
    {
        super(scene, x, y, "harpoon");
        this.setOrigin(0).setScale(0.1);
        this.scene.add.existing(this);
    }

    //método de disparo
    fire(x, y)
    {
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        //reposicionar o arpão quando disparado
        this.body.reset(x, y);

        //controlar visibilidade do arpão
        this.setActive(true);
        this.setVisible(true);

        //velocidade do arpão
        this.setVelocityY(-500);
    }
}

class Harpoons extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene)
    {
        super(scene, scene);

        this.createMultiple({
            classType: Harpoon,
            frameQuantity: 20,
            active: false,
            visible: true,
            key: "harpoon"
        });
    }

    fireHarpoon(x, y)
    {
        const harpoon = this.getFirstDead(false);

        if(harpoon) {
            harpoon.fire(x, y);
        }
    }
}

export default class Player2 extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);

        //adicionar o Danny à cena e ao motor de física
        scene.add.existing(this);
        this.setScale(1);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        
        //variáveis de movimento
        this.hVelocity = 200;

        //os inputs
        this.controls = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            space: Phaser.Input.Keyboard.KeyCodes.G
        });

        //vidas
        this.life = 3;

        //as variáveis boleanas para interagir com as rampas e plataformas
        this.onPlatform = false;
        this.onRamp = false;

        this.weaponGroup;

        this.harp = new Harpoon(this.scene, this.x, this.y - 20);
        this.harp.x = this.scene.game.config.width + 20;
        this.harp.y = - 20;

        this.canShoot = true;
    }

    preload()
    {
        this.load.image("harpoon", "./images/lança.png");
    }

    create()
    {
        this.laserGroup = new this.Harpoons(this);
    }

    setOnPlatform(value)
    {
        this.onPlatform = value;
    }

    setOnRamp(value)
    {
        this.onRamp = value;
    }

    update(time)
    {
        if(this.harp.y <= 0)
        {
            this.canShoot = true;
        } else {
            this.canShoot = false;
        }

        //tocar a animação
        this.anims.play("cycling2");

        //desativar a gravidade nas rampas e plataformas
        this.body.allowGravity = !this.onRamp || !this.onPlatform;

        //andar para a esquerda
        if(this.controls.left.isDown)
        {
            this.setVelocityX(-this.hVelocity);
            this.flipX = true;            
        }
        //andar para a direita
        else if (this.controls.right.isDown)
        {
            this.setVelocityX(this.hVelocity);
            this.flipX = false;
        }        
        //parar no sítio
        else
        {
            this.setVelocityX(0)
        }

        //shooting harpoon
        if (this.controls.space.isDown && this.canShoot)
        {
            this.shootHarpoon();
        }

        //subir rampas
        if (this.onRamp && this.controls.up.isDown)
        {
            this.setVelocityY(-this.hVelocity);
        }
        //descer rampas
        else if (this.onRamp && this.controls.down.isDown)
        {
            this.setVelocityY(this.hVelocity);
        }
        else
        {
            this.setVelocityY(0);
        }

        //não achamos que havia necessidade de criar uma máquina de estados pelo facto de termos apenas uma animação
    }

    shootHarpoon()
    {
        this.harp.fire(this.x, this.y - 20);
    }

    //o que acontece quando é atingido pelas bolas
    hit()
    {
        this.life--;
    }

    Dead()
    {
        return this.life === 0;
    }

    lifeGetter()
    {
        return this.life;
    }
}