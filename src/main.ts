import { Game } from "./game.js";

const canvas: HTMLCanvasElement | null = document.querySelector("#gameCanvas");
const context = canvas?.getContext("2d");

if (canvas && context) {
  window.addEventListener("DOMContentLoaded", () => {
    const game = new Game(canvas, context);
    game.start();
  });
} else {
  console.error("Canvas not found or not supported");
}
