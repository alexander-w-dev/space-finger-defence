import Button from "./button";

export default class Interface {
  /** @type PIXI.Sprite */
  pauseContainer;
  /** @type PIXI.Sprite */
  startMenu;


  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;

  constructor(game) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    this.generatePauseContainer();
    this.generateStartMenu();

    this.game.events.gamePause.subscribe(this.onGamePauseChangeHandler);
    this.game.events.gameStarted.subscribe(this.onGameStartedChangeHandler);
  }

  onGamePauseChangeHandler = (gamePause) => {
    this.pauseContainer.visible = gamePause;
  };

  onGameStartedChangeHandler = (started) => {
    this.startMenu.visible = !started;
  };

  generateStartMenu() {
    this.startMenu = new PIXI.Container();

    this.startMenu.addChild(this.getGrayBG());

    const button = new Button('Start', () => this.game.events.onGameStartClick.next(true));
    button.y = this.game.interfaceContainer.height / 2;
    button.x = this.game.interfaceContainer.width / 2;
    this.startMenu.addChild(button);

    this.game.interfaceContainer.addChild(this.startMenu);
  }

  generatePauseContainer() {
    this.pauseContainer = new PIXI.Container();

    this.pauseContainer.addChild(this.getGrayBG());

    const pauseText = new PIXI.Text('PAUSE', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 40,
    }));
    pauseText.pivot.y = pauseText.height / 2;
    pauseText.pivot.x = pauseText.width / 2;
    pauseText.y = this.game.interfaceContainer.height / 2 - 60;
    pauseText.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(pauseText);

    const button = new Button('Continue', () => this.game.events.onPauseClick.next(true));
    button.y = this.game.interfaceContainer.height / 2;
    button.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(button);

    const pauseUnderText = new PIXI.Text('... or press "Space" to continue', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 25,
    }));
    pauseUnderText.pivot.y = pauseUnderText.height / 2;
    pauseUnderText.pivot.x = pauseUnderText.width / 2;
    pauseUnderText.y = this.game.interfaceContainer.height / 2 + 60;
    pauseUnderText.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(pauseUnderText);

    this.game.interfaceContainer.addChild(this.pauseContainer);
  }

  getGrayBG() {
    const background = new PIXI.Graphics();
    background.beginFill(0x000000, .5);
    background.drawRect(0, 0, this.game.interfaceContainer.width, this.game.interfaceContainer.height);
    background.endFill();
    return background;
  }
}