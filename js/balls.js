export default class Balls extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(0.1);
        this.setBounce(1.0);
        this.randomDirection = {
            min: {
                x: -100,
                y: -100
            },
            max: {
                x: 50,
                y: -10
            }
        }
        this.setVelocity(
            Phaser.Math.Between(this.randomDirection.min.x, this.randomDirection.max.x),
            Phaser.Math.Between(this.randomDirection.min.y, this.randomDirection.max.y)
        );
    }
}