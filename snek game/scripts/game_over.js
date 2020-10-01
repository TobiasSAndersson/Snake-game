const Game_Over = {
    preload:function () {
        game.load.image("Game_Over", "./assets/images/gameover.png");

    },

    create:function () {
        this.add.button(0,0, "Game_Over", this.startGame, this)
        console.log("gameover")
    },

    startGame:function () {
       this.state.start("Game");
    }

};
