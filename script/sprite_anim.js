const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT =  canvas.height = 600;

let playerState = "idle"; //animationStates.name;
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e)=>{
    playerState = e.target.value;
})


const playerImage = new Image();
playerImage.src = "assets/shadow_dog.png";
const spriteWidth = 575; //CANVAS_WIDTH/ columns; 6876px/12 = 573
const spriteHeight = 523; //CANVAS_HEIGHT/ rows 5230px/ 10

//let frameX = 0;//индекс картинки по горизонтали
//let frameY = 0;// индекс картинки по вертикали
//контроль скорости воспроизведения анимации
let gameFrame = 0;
//триггер что бы замедлить воспроизведение кадров 
const staggerFrames = 8;
const spriteAnimations = [];//контейнер для всех видов всех анимаций
const animationStates = [ //перечень всех анимаций персонажа - статы
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    }, {
        name: "run",
        frames: 8,
    },
    {
        name: "dizzy",
        frames: 10,
    },
    {
        name: "sit",
        frames: 5,
    }, 
    {
        name: "roll",
        frames: 6,
    }, 
    {
        name: "bite",
        frames: 7,
    }, 
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 4,
    },

];

animationStates.forEach((state, index)=>{
    let frames = {
        loc: [],
    }
    for(let i = 0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX , y: positionY});
    }
    spriteAnimations[state.name] = frames;
    
});
console.log(spriteAnimations);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//Продвинутый метод Анимации кадров
    //скорость кадров делим на замедление и округляем до целого числа Math.floor. Вычисляем отстаток от / на 6. 
    //Где 6 кадров - это анимация покоя в спрайт листе - первая линия кадров, если считать от 0 
    //(7 кадров, 6 - индекс последнего элемента в массиве)
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    
    ctx.drawImage(playerImage,
        frameX,
        frameY,
        spriteWidth, 
        spriteHeight, 
        0, 
        0,
        spriteWidth, 
        spriteHeight);
         
         gameFrame++;
        requestAnimationFrame(animate);
}
animate();
