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

  init() {
    this.view.setCanvasConfig();
    this.view.onKeyUp(this.model.handleKeyUp.bind(this));
    this.view.onKeyDown(this.model.handleKeyDown.bind(this));
  }

  update() {
    this.model.update();
  }
}
