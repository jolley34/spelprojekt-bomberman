//sketch.ts
//---- GLOBAL VARIABLES ----//

let gameboard: Gameboard;
let gamebackground: GameBackground;
let game: Game;

//
let player1: Player;
let player2: Player;

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
    mystery: loadSound("/assets/music/mystery.mp3"),
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
  frameRate(60);

  music.mystery.setVolume(0.8);

  game = new Game();
  gamebackground = new GameBackground();
  gameboard = new Gameboard();
  //
  player1 = new Player("black", 100, 100, {
    up: 87, left: 65, down: 83, right: 68, placeBomb: 16
  });

  player2 = new Player("yellow", 200, 100, {
    up: 38, left: 37, down: 40, right: 39, placeBomb: 32
  });

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
  gameboard.update();
  gameboard.drawGameboard();
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
