import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";

export class Ball {
  private ctx: CanvasRenderingContext2D;
  public ballDy = 3;
  public ballDx = 3;
  public ballX = CANVAS_WIDTH / 2;
  public ballY = CANVAS_HEIGHT / 2;
  public ballWidth = 10;
  public ballHeight = 10;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(this.ballX, this.ballY, this.ballWidth, this.ballHeight);
  }
}
