//---- GLOBAL VARIABLES ----//

let game: Game;
let assets: {
  images: {
    backgroundImages: p5.Image[];
    clouds: p5.Image[];
  };
};

let currentScreen = "StartPage";
let startPage: StartPage;
/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  assets = {
    images: {
      backgroundImages: [
        loadImage("../assets/background/cruel_nature_bg1.png"),
        loadImage("../assets/background/Map1 - blurred.png"),
        loadImage("../assets/background/winter_background.png"),
      ],
      clouds: [
        loadImage("./assets/clouds/smoke1.png"),
        loadImage("./assets/clouds/smoke2.png"),
        loadImage("./assets/clouds/smoke3.png"),
        loadImage("./assets/clouds/smoke4.png"),
      ],
    },
  };
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  game = new Game();
  startPage = new StartPage(game);
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
}

function mouseClicked() {
  if (currentScreen === "StartPage") {
    startPage.mousePressed();
  }

  if (currentScreen === "ChooseBoard") {
    game.chooseBoard.update();
  }

  if (currentScreen === "GameBoardPage") {
    game.gameBoard.update();
  }
}
/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
