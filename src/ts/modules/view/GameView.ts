import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";

export class GameView {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private startButton: HTMLButtonElement;
  private restartButton: HTMLButtonElement;
  private menu: HTMLDivElement;
  private title: HTMLHeadingElement;

  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.title = document.getElementById("title") as HTMLHeadingElement;
    this.menu = document.getElementById("menu") as HTMLDivElement;
    this.startButton = document.getElementById("start") as HTMLButtonElement;
    this.restartButton = document.getElementById(
      "restart"
    ) as HTMLButtonElement;
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

  hideRestartButton() {
    this.restartButton.style.display = "none";
  }

  showRestartButton() {
    this.restartButton.style.display = "block";
  }

  showMenu() {
    this.menu.style.display = "flex";
  }

  hideMenu() {
    this.menu.style.display = "none";
  }

  showStartButton() {
    this.startButton.style.display = "block";
  }

  setMenuTitle(text: string) {
    this.title.textContent = text;
  }

  hideStartButton() {
    this.startButton.style.display = "none";
  }

  onStartButtonClick(callback: () => void) {
    this.startButton.addEventListener("click", callback);
  }

  onRestartButtonClick(callback: () => void) {
    this.restartButton.addEventListener("click", callback);
  }
}
