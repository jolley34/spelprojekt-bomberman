//---- GLOBAL VARIABLES ----//

let game: Game;
let currentPage: IGamePage;
let music: {
  mystery: p5.SoundFile;
};
let currentScreen = "StartPage"; // Or however you are managing the current screen
let startPage: StartPage;
/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  music = {
    mystery: loadSound("../assets/music/mystery.mp3"),
  };
  backgroundImage = loadImage("../assets/background/cruel_nature_bg1.png");
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  music.mystery.setVolume(0.8);
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
  drawBackgroundImage(backgroundImage, 150);
  game.draw();
}

function mouseClicked() {
  if (currentScreen === "StartPage") {
    startPage.mousePressed();
  }
}
/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
