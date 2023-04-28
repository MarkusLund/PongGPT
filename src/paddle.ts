export class Paddle {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private speed: number;
  private canvas: HTMLCanvasElement;
  public score: number = 0;

  constructor(canvas: HTMLCanvasElement, x: number) {
    this.canvas = canvas;
    this.x = x;
    this.y = this.canvas.height / 2 - 30;
    this.width = 10;
    this.height = 60;
    this.speed = 0;
  }

  update(): void {
    this.y += this.speed;

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveUp(): void {
    this.speed = -5;
  }

  moveDown(): void {
    this.speed = 5;
  }

  stopMoving(): void {
    this.speed = 0;
  }
}
