import { Paddle } from "./paddle";

export class Ball {
  public x: number;
  public y: number;
  private speedX: number;
  private speedY: number;
  private radius: number;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.radius = 5;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.speedX = 3;
    this.speedY = this.generateInitialSpeedY();
  }

  private generateInitialSpeedY(): number {
    return Math.random() * 4 - 2;
  }

  reset(): void {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.speedX = 3;
    this.speedY = Math.random() * 4 - 2;
  }

  update(playerPaddle: Paddle, computerPaddle: Paddle): void {
    this.x += this.speedX;
    this.y += this.speedY;

    // Collision with top and bottom
    if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
      this.speedY = -this.speedY;
    }

    // Collision with paddles
    if (
      (this.x - this.radius < playerPaddle.x + playerPaddle.width &&
        this.y > playerPaddle.y &&
        this.y < playerPaddle.y + playerPaddle.height) ||
      (this.x + this.radius > computerPaddle.x &&
        this.y > computerPaddle.y &&
        this.y < computerPaddle.y + computerPaddle.height)
    ) {
      this.speedX = -this.speedX;
    }

    // Scoring
    if (this.x - this.radius < 0) {
      // Computer scores
      computerPaddle.score++;
      this.reset();
    } else if (this.x + this.radius > this.canvas.width) {
      playerPaddle.score++;
      // Player scores
      this.reset();
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
  }
}
