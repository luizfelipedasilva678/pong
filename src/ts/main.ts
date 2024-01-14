import { GameController } from "./modules/controller/GameController";
import "../css/style.css";

window.addEventListener("DOMContentLoaded", () => {
  const gameController = new GameController();

  gameController.init();

  const gameLoop = () => {
    gameController.update();
    requestAnimationFrame(gameLoop);
  };

  gameLoop();
});
