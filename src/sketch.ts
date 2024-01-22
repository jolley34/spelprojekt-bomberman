//---- GLOBAL VARIABLES ----//
let game: Game;
let assets: {
  playerSoundEffects: {
    walkingsound: p5.SoundFile;
  };
  music: {
    ingamemusic: p5.SoundFile;
    menumusic: p5.SoundFile;
  };
  images: {
    powerups: p5.Image[];
    maptextures: p5.Image[];
    backgroundImages: p5.Image[];
    clouds: p5.Image[];
    entities: p5.Image[];
    player1Animations: p5.Image[];
  };
};

let customFont: p5.Font;

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  customFont = loadFont("../Fonts/MinecraftBold-nMK1.otf");
  assets = {
    images: {
      powerups: [loadImage("../assets/powerup/yy3.gif")],
      backgroundImages: [
        loadImage("../assets/background/Controls.svg"),
        loadImage("../assets/background/Map-1-blurred-shadow-v4-copy.png"),
        loadImage("../assets/background/winter_background.png"),
        loadImage("../assets/background/cruel_nature_bg1.png"),
      ],
      clouds: [
        loadImage("./assets/clouds/smoke1.png"),
        loadImage("./assets/clouds/smoke2.png"),
        loadImage("./assets/clouds/smoke3.png"),
        loadImage("./assets/clouds/smoke4.png"),
      ],
      maptextures: [
        loadImage("../assets/maptextures/bush.png"),
        loadImage("../assets/maptextures/ice1.png"),
        loadImage("../assets/maptextures/brick.png"),
        loadImage("../assets/maptextures/grass.jpeg"),
        loadImage("../assets/maptextures/grassywall.png"),
        loadImage("../assets/maptextures/log.png"),
        loadImage("../assets/maptextures/grass-figma.png"),
      ],
      entities: [
        loadImage("../assets/entities_img/image1.png"),
        loadImage("../assets/entities_img/image2.png"),
        loadImage("../assets/entities_img/image3.png"),
      ],
      player1Animations: [
        loadImage("../assets/player-1-animations/idle-front.png"), // 0
        loadImage("../assets/player-1-animations/idle-front-lf.png"), // 1
        loadImage("../assets/player-1-animations/idle-front-rf.png"), // 2
        loadImage("../assets/player-1-animations/idle-back.png"), // 3
        loadImage("../assets/player-1-animations/idle-back-lf.png"), // 4
        loadImage("../assets/player-1-animations/idle-back-rf.png"), // 5
        loadImage("../assets/player-1-animations/idle-left.png"), // 6
        loadImage("../assets/player-1-animations/left-foot-left.png"), // 7
        loadImage("../assets/player-1-animations/right-foot-left.png"), // 8
        loadImage("../assets/player-1-animations/idle-right.png"), // 9
        loadImage("../assets/player-1-animations/right-foot-right.png"), // 10
        loadImage("../assets/player-1-animations/left-foot-right.png"), // 11
      ],
    },
    music: {
      ingamemusic: loadSound("../assets/music/spelprojekt-ingame-v6.mp3"),
      menumusic: loadSound("..//assets/music/spelprojekt-menu.mp3"),
    },
    playerSoundEffects: {
      walkingsound: loadSound(
        "../assets/player-sound-effects/sfx_step_grass_l.mp3"
      ),
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
  textFont(customFont);
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
  /*   resizeCanvas(windowWidth, windowHeight); */
}
