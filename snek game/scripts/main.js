var game;

game = new Phaser.Game(1200, 900, Phaser.AUTO, 'gameDiv');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('Menu')