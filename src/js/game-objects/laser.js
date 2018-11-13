import * as PIXI from 'pixi.js';

export default class Laser {
  static SPEED = 2;

  app;
  sprite;
  UFO;

  textureFly;
  textureShot;

  constructor(app, point, UFO) {
    this.app = app;
    this.UFO = UFO;

    this.textureFly = PIXI.Texture.fromImage('../../img/spaceArt/png/laserRed.png');
    this.textureShot = PIXI.Texture.fromImage('../../img/spaceArt/png/laserRedShot.png');

    this.sprite = new PIXI.Sprite(this.textureFly);
    this.sprite.anchor.set(.5);
    this.sprite.x = point.x;
    this.sprite.y = point.y;

    this.app.stage.addChild(this.sprite);

    this.app.ticker.add(this.tick);
  }

  tick = (delta) => {
    this.sprite.y -= (Laser.SPEED * delta);

    if (Math.abs(this.sprite.y - this.UFO.container.y) < 10) {
      this.UFO.takeDamage();
      this.destroy();
    }
  };

  destroy() {
    this.sprite.texture = this.textureShot;
    this.app.ticker.remove(this.tick);

    setTimeout(() => {
      this.app.stage.removeChild(this.sprite);

      this.sprite.destroy();
    }, 300);
  }
}