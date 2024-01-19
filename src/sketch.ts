//---- GLOBAL VARIABLES ----//
let game: Game;
let assets: {
  music: {
    ingamemusic: p5.SoundFile;
    menumusic: p5.SoundFile;
  };
  images: {
    maptextures: p5.Image[];
    playeranimation: p5.Image;
    background: p5.Image;
    clouds: p5.Image[];
  };
};

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  assets = {
    music: {
      ingamemusic: loadSound("/assets/music/spelprojekt-ingame-v6.mp3"),
      menumusic: loadSound("/assets/music/spelprojekt-menu.mp3"),
    },
    images: {
      playeranimation: loadImage("./assets/playeranimations/george.png"),
      background: loadImage("./assets/background/Map-1-blurred-shadow-v4.png"),
      clouds: [
        loadImage("./assets/clouds/smoke1.png"),
        loadImage("./assets/clouds/smoke2.png"),
        loadImage("./assets/clouds/smoke3.png"),
        loadImage("./assets/clouds/smoke4.png"),
      ],
      maptextures: [loadImage("./assets/maptextures/bush.png")],
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

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
