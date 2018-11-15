import * as PIXI from 'pixi.js';

export default class Button extends PIXI.Sprite {

  /** @type PIXI.Text */
  _text;


  get clicked() {
    return this._cb;
  }
  set clicked(cb) {
    this._cb = cb;
  }
  _cb;

  constructor(width, height) {
    super();
    this.create(width, height);
  }

  create(width, height) {
    // generate the texture
    let gfx = new PIXI.Graphics();
    gfx.beginFill(0xffffff, 1);
    gfx.drawRoundedRect(0, 0, width, height, height / 5);
    gfx.endFill();
    this.texture = gfx.generateCanvasTexture();

    // set the x, y and anchor
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    // create the text object
    this._text = new PIXI.Text("", 'arial');
    this._text.anchor = new PIXI.Point(0.5, 0.5);
    this.addChild(this._text);

    // set the interactivity to true and assign callback functions
    this.interactive = true;

    this.on("mousedown", () => {
      this.onDown();
    }, this);

    this.on("mouseup", () => {
      this.onUp();
    }, this);

    this.on("mouseover", () => {
      this.onHover();
    }, this);

    this.on("mouseout", () => {
      this.onOut();
    }, this);
  }

  setText(val, style) {
    // Set text to be the value passed as a parameter
    this._text.text = val;
    // Set style of text to the style passed as a parameter
    this._text.style = style;
  }

  onDown() {
    console.log('Clicked');
    this.y += 5;
    this.tint = 0xffffff;
  }

  onUp() {
    console.log('onup');
    if(typeof(this._cb) === 'function') {
      this._cb();
    }
    this.y -= 5;
    this.tint = 0xF8A9F9;
  }

  onHover() {
    console.log('On Hover');
    this.tint = 0xF8A9F9;
    this.scale.x = 1.2;
    this.scale.y = 1.2;
  }

  onOut() {
    console.log('On Out');
    this.tint = 0xffffff;
    this.scale.x = 1;
    this.scale.y = 1;
  }
}