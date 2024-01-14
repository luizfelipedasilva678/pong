import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";

export class GameView {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  setCanvasConfig() {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
  }

  get canvasWidth() {
    return this.canvas.width;
  }

  get canvasHeight() {
    return this.canvas.height;
  }

  get canvasCtx() {
    return this.ctx;
  }

  onKeyDown(callback: (event: KeyboardEvent) => void) {
    window.addEventListener("keydown", callback);
  }

  onKeyUp(callback: (event: KeyboardEvent) => void) {
    window.addEventListener("keyup", callback);
  }
}
