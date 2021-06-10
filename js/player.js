export default class Player extends Phaser.Physics.Arcade.Sprite
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
        this.controls = scene.input.keyboard.createCursorKeys();

        //as variáveis boleanas para interagir com as rampas e plataformas
        this.onPlatform = false;
        this.onRamp = false;
    }

    setOnPlatform(value)
    {
        this.onPlatform = value;
    }

    setOnRamp(value)
    {
        this.OnRamp = value;
    }

    update(time)
    {
        //tocar a animação
        this.anims.play("cycling");

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
        //subir rampas
        else if (this.onRamp && this.controls.up.isDown)
        {
            this.setVelocityY(-this.hVelocity);
        }
        //parar no sítio
        else
        {
            this.setVelocityX(0)
        }

        //não achamos que havia necessidade de criar uma máquina de estados pelo facto de termos apenas uma animação
    }
}