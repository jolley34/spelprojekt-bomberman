//---- GLOBAL VARIABLES ----//
let gameboardbackground: GameboardBackground;
let dynamics: Clouds;
let gameboard: Gameboard;
/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  gameboardbackground = new GameboardBackground();
  gameboard = new Gameboard();
  dynamics = new Clouds();
  dynamics.preload();
  gameboardbackground.preload();
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  frameRate(120)
  gameboardbackground.setup();
  dynamics.setup();
  gameboard.setup();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  gameboardbackground.draw();
  gameboard.draw();
  dynamics.draw();
  
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



