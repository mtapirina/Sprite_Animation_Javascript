const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 3;

const bgLeyer1 = new Image();
bgLeyer1.src = "assets/layer-1.png";
const bgLeyer2 = new Image();
bgLeyer2.src = "assets/layer-2.png";
const bgLeyer3 = new Image();
bgLeyer3.src = "assets/layer-3.png";
const bgLeyer4 = new Image();
bgLeyer4.src = "assets/layer-4.png";
const bgLeyer5 = new Image();
bgLeyer5.src = "assets/layer-5.png";

window.addEventListener("load", () => {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById("showGameSpeed");
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2334;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const layer1 = new Layer(bgLeyer1, 0.1);
  const layer2 = new Layer(bgLeyer2, 0.2);
  const layer3 = new Layer(bgLeyer3, 0.3);
  const layer4 = new Layer(bgLeyer4, 0.6);
  const layer5 = new Layer(bgLeyer5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  //ANIMATE!!!
  function animateBG() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });
    requestAnimationFrame(animateBG);
  }
  animateBG();

});

