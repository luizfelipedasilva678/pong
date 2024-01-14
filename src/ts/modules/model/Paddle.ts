import { CANVAS_WIDTH } from "../../constants";
import { Ball } from "./Ball";

export class Paddle {
  private ctx: CanvasRenderingContext2D;
  private ball: Ball;
  public paddleyPosition;
  public paddleWidth = 90;
  public paddleHeight = 10;
  public paddleSpeed = 5;
  public paddlexPosition = CANVAS_WIDTH / 2 - 40;

  constructor(ctx: CanvasRenderingContext2D, yPosition: number, ball: Ball) {
    this.ctx = ctx;
    this.paddleyPosition = yPosition;
    this.ball = ball;
  }

  get hitTheBall() {
    return (
      this.paddlexPosition + this.paddleWidth >= this.ball.ballX &&
      this.paddlexPosition <= this.ball.ballX + this.ball.ballWidth &&
      this.paddleyPosition + this.paddleHeight >= this.ball.ballY &&
      this.paddleyPosition <= this.ball.ballY + this.ball.ballHeight
    );
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
      this.paddlexPosition,
      this.paddleyPosition,
      this.paddleWidth,
      this.paddleHeight
    );
  }
}
