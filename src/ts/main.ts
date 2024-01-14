import "../css/style.css";

function init() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 650;
  canvas.height = 480;
}

init();
