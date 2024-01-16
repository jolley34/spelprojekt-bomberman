//---- GLOBAL VARIABLES ----//
let gameboard: Gameboard;
let gamebackground: GameBackground;
let game: Game;
let currentPage: IGamePage;
let music: {
  mystery: p5.SoundFile;
};

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  music = {
    mystery: loadSound("../assets/music/mystery.mp3"),
  };
  backgroundImage = loadImage("../assets/background/Map1 - blurred.png");
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  music.mystery.setVolume(0.8);

  game = new Game();
  gamebackground = new GameBackground(backgroundImage);
  gameboard = new Gameboard();
  currentPage = new StartPage();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
  gamebackground.drawGameBackground();
  currentPage.draw();
  gameboard.update();
  //  gameboard.drawGameboard();
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
