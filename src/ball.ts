import { Paddle } from "./paddle";

export class Ball {
  public x: number;
  public y: number;
  private speedX: number;
  private speedY: number;
  private radius: number;
  private canvas: HTMLCanvasElement;
  private baseSpeed: number = 4;
  private speedMultiplier: number = 1.05;

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

  private increaseSpeed(): void {
    this.speedX *= this.speedMultiplier;
    this.speedY *= this.speedMultiplier;
  }

  private isCollidingWithPaddle(paddle: Paddle): boolean {
    return (
      this.y + this.radius >= paddle.y &&
      this.y - this.radius <= paddle.y + paddle.height
    );
  }

  reset(): void {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.speedX = this.baseSpeed * (Math.random() < 0.5 ? -1 : 1);
    this.speedY = this.baseSpeed * (Math.random() * 2 - 1);
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
      (this.x - this.radius <= playerPaddle.x + playerPaddle.width &&
        this.isCollidingWithPaddle(playerPaddle)) ||
      (this.x + this.radius >= computerPaddle.x &&
        this.isCollidingWithPaddle(computerPaddle))
    ) {
      this.speedX = -this.speedX;
      this.increaseSpeed();

      // Calculate the angle based on where the ball hits the paddle
      const paddle = this.speedX > 0 ? computerPaddle : playerPaddle;
      const hitPosition = (this.y - paddle.y) / paddle.height - 0.5;
      const angle = (hitPosition * Math.PI) / 3; // The range of the angle is between -60 and 60 degrees

      // Update the ball's speedY based on the angle
      const speedMagnitude = Math.sqrt(
        this.speedX * this.speedX + this.speedY * this.speedY
      );
      this.speedY = speedMagnitude * Math.sin(angle);
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
