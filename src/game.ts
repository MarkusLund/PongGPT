import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private playerPaddle: Paddle;
  private computerPaddle: Paddle;
  private ball: Ball;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.playerPaddle = new Paddle(this.canvas, 0);
    this.computerPaddle = new Paddle(this.canvas, this.canvas.width - 10);
    this.ball = new Ball(this.canvas);
  }

  start(): void {
    this.registerEventListeners();
    this.gameLoop();
  }

  private gameLoop(): void {
    if (!this.checkWinner()) {
      this.update();
      this.draw();
    }
    requestAnimationFrame(() => this.gameLoop());
  }

  private drawScore() {
    const halfWidth = this.canvas.width / 2;
    this.context.fillStyle = "white";
    this.context.font = "24px Arial";
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillText(
      this.playerPaddle.score.toString(),
      halfWidth - 50,
      10
    );
    this.context.fillText(
      this.computerPaddle.score.toString(),
      halfWidth + 50,
      10
    );
  }

  private checkWinner(): boolean {
    if (this.playerPaddle.score === 3 || this.computerPaddle.score === 3) {
      this.context.fillStyle = "white";
      this.context.font = "48px Arial";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        this.playerPaddle.score === 3 ? "Player Wins!" : "Computer Wins!",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      return true;
    }
    return false;
  }

  private update(): void {
    this.playerPaddle.update();
    this.computerPaddle.update();
    this.ball.update(this.playerPaddle, this.computerPaddle);

    // AI paddle movement
    const aiPaddleCenter =
      this.computerPaddle.y + this.computerPaddle.height / 2;
    if (this.ball.y < aiPaddleCenter - 10 && this.computerPaddle.y > 0) {
      this.computerPaddle.moveUp();
    } else if (
      this.ball.y > aiPaddleCenter + 10 &&
      this.computerPaddle.y < this.canvas.height - this.computerPaddle.height
    ) {
      this.computerPaddle.moveDown();
    } else {
      this.computerPaddle.stopMoving();
    }
  }

  private draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.playerPaddle.draw(this.context);
    this.computerPaddle.draw(this.context);
    this.ball.draw(this.context);
    this.drawScore();
  }

  private registerEventListeners(): void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        this.playerPaddle.moveUp();
      } else if (event.key === "ArrowDown") {
        this.playerPaddle.moveDown();
      }
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        this.playerPaddle.stopMoving();
      }
    });
  }
}
