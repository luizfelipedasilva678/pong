import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";
import { Ball } from "./Ball";
import { Paddle } from "./Paddle";
import getRandomInt from "../math/getRandomInt";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private ball: Ball;
  private userPaddle: Paddle;
  private computerPaddle: Paddle;
  private userScore = 0;
  private computerScore = 0;
  private gameIsRunning = false;
  private winner: "user" | "computer" | "" = "";
  private buttonPressed = {
    right: false,
    left: false,
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ball = new Ball(this.ctx);
    this.userPaddle = new Paddle(this.ctx, CANVAS_HEIGHT - 20, this.ball);
    this.computerPaddle = new Paddle(this.ctx, 10, this.ball);
  }

  private updateButtonPressedState = (key: string, isPressed: boolean) => {
    switch (key) {
      case "ArrowRight":
        this.buttonPressed.right = isPressed;
        break;
      case "ArrowLeft":
        this.buttonPressed.left = isPressed;
        break;
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    this.updateButtonPressedState(event.key, true);
  };

  handleKeyUp = (event: KeyboardEvent) => {
    this.updateButtonPressedState(event.key, false);
  };

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

  private drawScore() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(
      `${this.userScore}`,
      CANVAS_WIDTH - 30,
      CANVAS_HEIGHT / 2 + 40
    );
    this.ctx.fillText(
      `${this.computerScore}`,
      CANVAS_WIDTH - 30,
      CANVAS_HEIGHT / 2 - 20
    );
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
      this.buttonPressed.right &&
      this.userPaddle.paddlexPosition <
        CANVAS_WIDTH - this.userPaddle.paddleWidth
    ) {
      this.userPaddle.paddlexPosition += this.userPaddle.paddleSpeed;
    }

    if (this.buttonPressed.left && this.userPaddle.paddlexPosition >= 0) {
      this.userPaddle.paddlexPosition -= this.userPaddle.paddleSpeed;
    }
  }

  private checkWinner() {
    if (this.userScore === 3 || this.computerScore === 3) {
      this.gameIsRunning = false;
      this.winner = this.userScore === 3 ? "user" : "computer";
    }
  }

  public getWinner() {
    return this.winner;
  }

  private ballMovements() {
    if (this.computerPaddle.hitTheBall || this.userPaddle.hitTheBall) {
      this.ball.ballDy = -this.ball.ballDy;
      this.ball.ballDx = getRandomInt(10);
    }

    if (this.ball.ballX >= CANVAS_WIDTH || this.ball.ballX <= 0) {
      this.ball.ballDx = -this.ball.ballDx;
    }

    const ballIsInGame =
      this.ball.ballY > 0 && this.ball.ballY <= CANVAS_HEIGHT;

    if (!ballIsInGame) {
      if (this.ball.ballY > CANVAS_HEIGHT) {
        this.computerScore++;
        this.ball.ballDy = -3;
      }

      if (this.ball.ballY <= 0) {
        this.userScore++;
        this.ball.ballDy = 3;
      }

      this.ball.ballDx = 1;
      this.ball.ballX = CANVAS_WIDTH / 2;
      this.ball.ballY = CANVAS_HEIGHT / 2;
      this.ball.ballWidth = 10;
      this.ball.ballHeight = 10;
    }

    this.ball.ballX += this.ball.ballDx;
    this.ball.ballY += this.ball.ballDy;
  }

  public update() {
    this.clear();
    this.draw();
  }

  public restartGame() {
    this.userScore = 0;
    this.computerScore = 0;
    this.gameIsRunning = true;
    this.userPaddle = new Paddle(this.ctx, CANVAS_HEIGHT - 20, this.ball);
    this.computerPaddle = new Paddle(this.ctx, 10, this.ball);
  }

  public start() {
    this.gameIsRunning = true;
  }

  public getGameIsRunning() {
    return this.gameIsRunning;
  }

  private draw() {
    this.drawBackground();
    this.drawScore();
    this.drawDashedLine();
    this.drawPaddles();
    this.drawBall();
    this.checkWinner();

    if (this.gameIsRunning) {
      this.computerMovements();
      this.playerMovements();
      this.ballMovements();
    }
  }
}
