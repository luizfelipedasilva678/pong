import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private paddlePosition = CANVAS_WIDTH / 2 - 40;
  private rightButtonPressed = false;
  private leftButtonPressed = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        this.rightButtonPressed = true;
        break;
      case "ArrowLeft":
        this.leftButtonPressed = true;
        break;
      default:
        break;
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        this.rightButtonPressed = false;
        break;
      case "ArrowLeft":
        this.leftButtonPressed = false;
        break;
      default:
        break;
    }
  };

  update() {
    this.clear();
    this.draw();
  }

  private clear() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private drawBall() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#fff";
    this.ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 10, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private drawDashedLine() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "#fff";
    this.ctx.setLineDash([5, 5]);
    this.ctx.moveTo(0, CANVAS_HEIGHT / 2);
    this.ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawPaddles() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(this.paddlePosition, CANVAS_HEIGHT - 20, 90, 10);

    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(CANVAS_WIDTH / 2 - 40, 10, 90, 10);
  }

  private drawBackground() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private draw() {
    this.drawBackground();
    this.drawDashedLine();

    if (this.rightButtonPressed) {
      this.paddlePosition += 5;
    }

    if (this.leftButtonPressed) {
      this.paddlePosition -= 5;
    }

    this.drawPaddles();
    this.drawBall();
  }
}
