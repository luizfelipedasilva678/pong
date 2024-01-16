import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";
import { Ball } from "./Ball";
import { Paddle } from "./Paddle";
import getRandomInt from "../math/getRandomInt";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private ball: Ball;
  private userPaddle: Paddle;
  private computerPaddle: Paddle;
  private rightButtonPressed = false;
  private leftButtonPressed = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ball = new Ball(this.ctx);
    this.userPaddle = new Paddle(this.ctx, CANVAS_HEIGHT - 20, this.ball);
    this.computerPaddle = new Paddle(this.ctx, 10, this.ball);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        this.rightButtonPressed = true;
        break;
      case "ArrowLeft":
        this.leftButtonPressed = true;
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
    this.ball.draw();
  }

  private drawDashedLine() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "#fff";
    this.ctx.setLineDash([10, 10]);
    this.ctx.moveTo(0, CANVAS_HEIGHT / 2);
    this.ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawPaddles() {
    this.userPaddle.draw();
    this.computerPaddle.draw();
  }

  private drawBackground() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private computerMovements() {
    if (this.ball.ballY > 0 && this.ball.ballY <= CANVAS_HEIGHT) {
      const slope = this.ball.ballDy / this.ball.ballDx;

      const predictedX =
        this.ball.ballX +
        (this.computerPaddle.paddleyPosition - this.ball.ballY) / slope;

      if (
        predictedX >
          this.computerPaddle.paddlexPosition +
            this.computerPaddle.paddleWidth / 2 &&
        this.computerPaddle.paddlexPosition + this.computerPaddle.paddleWidth <
          CANVAS_WIDTH
      ) {
        this.computerPaddle.paddlexPosition += this.computerPaddle.paddleSpeed;
      }

      if (
        predictedX <
          this.computerPaddle.paddlexPosition +
            this.computerPaddle.paddleWidth / 2 &&
        this.computerPaddle.paddlexPosition > 0
      ) {
        this.computerPaddle.paddlexPosition -= this.computerPaddle.paddleSpeed;
      }
    }
  }

  private playerMovements() {
    if (
      this.rightButtonPressed &&
      this.userPaddle.paddlexPosition <
        CANVAS_WIDTH - this.userPaddle.paddleWidth
    ) {
      this.userPaddle.paddlexPosition += this.userPaddle.paddleSpeed;
    }

    if (this.leftButtonPressed && this.userPaddle.paddlexPosition >= 0) {
      this.userPaddle.paddlexPosition -= this.userPaddle.paddleSpeed;
    }
  }

  private ballMovements() {
    if (this.computerPaddle.hitTheBall || this.userPaddle.hitTheBall) {
      this.ball.ballDy = -this.ball.ballDy;
      this.ball.ballDx = getRandomInt(10);
    }

    if (this.ball.ballX >= CANVAS_WIDTH || this.ball.ballX <= 0) {
      this.ball.ballDx = -this.ball.ballDx;
    }

    const ballIsAvailable =
      this.ball.ballY > 0 && this.ball.ballY <= CANVAS_HEIGHT;

    if (!ballIsAvailable) {
      this.ball.ballDy = 3;
      this.ball.ballDx = 0;
      this.ball.ballX = CANVAS_WIDTH / 2;
      this.ball.ballY = CANVAS_HEIGHT / 2;
      this.ball.ballWidth = 10;
      this.ball.ballHeight = 10;
    }

    this.ball.ballX += this.ball.ballDx;
    this.ball.ballY += this.ball.ballDy;
  }

  private draw() {
    this.drawBackground();
    this.drawDashedLine();
    this.drawPaddles();
    this.drawBall();
    this.computerMovements();
    this.playerMovements();
    this.ballMovements();
  }
}
