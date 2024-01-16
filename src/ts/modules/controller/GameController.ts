import { Game } from "../model/Game";
import { GameView } from "../view/GameView";

export class GameController {
  private model: Game;
  private view: GameView;

  constructor() {
    this.view = new GameView();
    this.model = new Game(this.view.canvasCtx);
  }

  handleKeyUp(event: KeyboardEvent) {
    this.model.handleKeyUp(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.model.handleKeyDown(event);
  }

  showMenu() {
    this.view.showMenu();
  }

  setMenuTitle(text: string) {
    this.view.setMenuTitle(text);
  }

  hideMenu() {
    this.view.hideMenu();
  }

  hideStartButton() {
    this.view.hideStartButton();
  }

  start() {
    this.hideStartButton();
    this.model.start();
  }

  restartMenu() {
    this.view.showRestartButton();
  }

  restart() {
    this.model.restartGame();
  }

  init() {
    this.view.setCanvasConfig();
    this.view.onKeyUp(this.handleKeyUp.bind(this));
    this.view.onKeyDown(this.handleKeyDown.bind(this));
    this.view.onStartButtonClick(this.start.bind(this));
    this.view.onRestartButtonClick(this.restart.bind(this));
  }

  update() {
    if (!this.model.getGameIsRunning()) {
      this.showMenu();

      if (this.model.getWinner() !== "") {
        this.restartMenu();
        this.setMenuTitle(
          this.model.getWinner() === "user" ? "You win!" : "You lose!"
        );
      }
    } else {
      this.hideMenu();
    }

    this.model.update();
  }
}
