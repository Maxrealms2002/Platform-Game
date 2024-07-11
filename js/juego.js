//Pendienta hacer el easter egg y agregar mas plataformas

// define variables
var game;
var music;
var player;
var platforms;
var trees;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;
var resetButton;
var muteButton;

// agregar Objetos coleccionables en el juego
function addItems() {
  items = game.add.physicsGroup();
  createItem(0, 300, "coin");
  createItem(375, 300, "coin1");
  createItem(50, 40, "coin2");
  createItem(350, 110, "coin3");
  createItem(480, 430, "coin4");
  createItem(570, 430, "coin5");
  createItem(760, 500, "coin6");
  createItem(180, 500, "coin7");
  createItem(600, 300, "coin8");
  createItem(530, 50, "coin9");
}

// agregar plataformas en el juego
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 492, "platform");
  platforms.create(100, 450, "platform2");
  platforms.create(-20, 570, "ground");
  platforms.create(120, 570, "ground");
  platforms.create(300, 570, "ground");
  platforms.create(450, 570, "ground");
  platforms.create(600, 570, "ground");
  platforms.create(700, 570, "ground");
  platforms.create(850, 570, "ground");
  platforms.create(300, 170, "branch_right");
  platforms.create(750, 280, "branch_right");
  platforms.create(0, 100, "branch_right");
  platforms.create(150, 300, "branch_left");
  platforms.create(590, 350, "branch_left");
  platforms.create(550, -100, "leaf");
  platforms.create(800, 333, "cabana");
  platforms.z = 10;
  //platforms.create(100, -325, "tree");

  /*
  // Crea un arbol transpasable
  var tree_bg = platforms.create(100, -325, "tree");
  tree_bg.body.immovable = true; // set body as immovable
  tree_bg.inputEnabled = false; // disable input
*/
  platforms.setAll("body.immovable", true);
}

function addTreeBg() {
  trees = game.add.physicsGroup();
  var tree = trees.create(100, -325, "tree");
  tree.body.immovable = true; // set body as immovable
  tree.inputEnabled = false; // disable input
  tree.z = -10;
  var tree2 = trees.create(550, -114, "tree2");
  tree2.body.immovable = true; // set body as immovable
  tree2.inputEnabled = false; // disable input
  tree2.z = -10;
  platforms.setAll("body.immovable", true);
}

// Crear una animacion simple de un objeto y agregar a la pantalla
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add("spin");
  item.animations.play("spin", 10, true);
}

// Crear una insignia ganadora y agregar a la pantalla
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(905, 250, "badge");
  badge.animations.add("spin");
  badge.animations.play("spin", 10, true);
}

// Cuando el jugador colecta un objeto obtiene puntos
function itemHandler(player, item) {
  item.kill();
  currentScore = currentScore + 10;
  if (currentScore === winningScore) {
    createBadge();
  }
}

// Cuando el jugador colecta una insignia al final del juego
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// Mutea la musica de fondo cuando el usuario pulsa sobre el sprite de sonido
function toggleSound() {
  if (game.sound.mute) {
    // if the game is muted, unmute it
    game.sound.mute = false;
    muteButton.frame = 0;
  } else {
    // if the game is not muted, mute it
    game.sound.mute = true;
    muteButton.frame = 1;
  }
}

// Iniciar el juego cuando la pagina carga
window.onload = function () {
  game = new Phaser.Game(1000, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
    render: render,
  });

  //antes que inicie el juego
  function preload() {
    //game.stage.backgroundColor = "#5db1ad";

    //Carga los audios
    game.load.audio("forest", [
      "assets/music/forest.mp3",
      "assets/music/forest.ogg",
      "assets/music/forest.wav",
    ]);

    //carga imagenes
    game.load.image("background", "assets/background.png");
    game.load.image("platform", "assets/platform_4.png");
    game.load.image("platform2", "assets/platform_5.png");
    game.load.image("ground", "assets/ground.png");
    game.load.image("branch_right", "assets/branch_right.png");
    game.load.image("branch_left", "assets/branch_left.png");
    game.load.image("tree", "assets/super_tree.png");
    game.load.image("tree2", "assets/super_tree2.png");
    game.load.image("leaf", "assets/leaf.png");
    game.load.image("cabana", "assets/cabana.png");
    game.load.image("muteButton", "assets/mute_button.png");

    //carga los sprites
    game.load.spritesheet("player", "assets/boy_walker.png", 48, 62);
    game.load.spritesheet("coin", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin1", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin2", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin3", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin4", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin5", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin6", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin7", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin8", "assets/coin.png", 36, 44);
    game.load.spritesheet("coin9", "assets/coin.png", 36, 44);
    game.load.spritesheet("badge", "assets/badge.png", 42, 54);
    game.load.spritesheet("resetButton", "assets/resetButton.png", 800, 20);
  }
  // Configuracion inicial del juego
  function create() {
    // Establece el tamaño del mundo
    game.world.setBounds(0, 0, 1000, 600);

    // Establece la musica de fondo
    music = game.add.audio("forest");
    music.play();

    // Añadimos la imagen de fondo
    var background = this.add.sprite(0, 0, "background");
    background.width = game.world.width;
    background.height = game.world.height;

    // Crea un boton para mutear la musica de fondo
    muteButton = game.add.button(177, 5, "muteButton", toggleSound, this);
    muteButton.z = 2;

    //Añadimos el sprite del jugador
    player = game.add.sprite(50, 570, "player");
    player.animations.add("walk");
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    player.z = 1;

    //Agrega el boton de reset
    resetButton = game.add.sprite(847, 5, "resetButton");
    resetButton.inputEnabled = true;
    resetButton.events.onInputDown.add(resetGame, this);

    //Añadimos el background
    this.add.sprite(1000, 600, "background");
    addItems();
    addPlatforms();
    addTreeBg();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, {
      font: "bold 24px Arial",
      fill: "white",
    });
    winningMessage = game.add.text(game.world.centerX, 275, "", {
      font: "bold 48px Arial",
      fill: "white",
    });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // cuando el juego esta corriendo
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    //si la flecha izquierda es presionada
    if (cursors.left.isDown) {
      player.animations.play("walk", 10, true);
      player.body.velocity.x = -300;
      player.scale.x = -1;
    }
    //si la flecha derecha es presionada
    else if (cursors.right.isDown) {
      player.animations.play("walk", 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // cuando el jugador esta detenido
    else {
      player.animations.stop();
    }
    if (
      jumpButton.isDown &&
      (player.body.onFloor() || player.body.touching.down)
    ) {
      player.body.velocity.y = -400;
    }
    // cuando el jugador gana el juego
    if (won) {
      winningMessage.text = "Ganaste !!!";
    }
  }

  // Funcion para reiniciar el juego
  function resetGame() {
    won = false;
    currentScore = 0;
    game.state.restart();
  }

  function render() {

    // Despliga  
    if (game.sound.mute) {
      muteButton.frame = 1;
    } else {
      muteButton.frame = 0;
    }
  }
};
