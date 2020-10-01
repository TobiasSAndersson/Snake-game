var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;


var Game= {
    preload:function () {
        game.load.image("snake", "./assets/images/snek_body.png")
        game.load.image("apple", "./assets/images/apple.png")
        game.load.image("arrow-right", "./assets/images/arrow-right.png")
        game.load.image("arrow-left", "./assets/images/arrow-left.png")
        game.load.image("arrow-up", "./assets/images/arrow-up.png")
        game.load.image("arrow-down", "./assets/images/arrow-down.png")
        game.load.audio("eat", "./assets/sounds/eat.mp3?", "./assets/sounds/eat.ogg?" + Date.now())
        game.load.audio("death", "./assets/sounds/death.mp3?", "./assets/sounds/death.ogg?" + Date.now())
    },

    create:function () {
        snake = [];
        apple = {};
        direction = "right";
        new_direction = null;
        squareSize = 30;
        speed = 0;
        updateDelay = 0;
        addNew = false;
        eatSound = game.add.audio("eat")
        deathSound = game.add.audio("death")
        score = 0;
        text = game.add.text(0, 0, score);

        game.stage.backgroundColor = "#e0e0e0";
        console.log("Game")

        cursors = game.input.keyboard.createCursorKeys();

        for(var i = 0; i < 10; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake'); 
            snake[i].height = squareSize;
            snake[i].width = squareSize;

        }
    
        this.generateApple();

        if (!game.device.desktop) {
            this.addMobileInputs();
        }
    },

    
	update : function() {
        // snake att röra på sig
        
        if(cursors.right.isDown && direction!='left'){
			new_direction = 'right';
			
		}
		else if(cursors.left.isDown && direction!='right'){
			new_direction = 'left';
			
		}
		else if(cursors.up.isDown && direction!='down'){
			new_direction = 'up';
			
		}
		else if(cursors.down.isDown && direction!='up'){
			new_direction = 'down';
			
		}








        updateDelay++;

        if(updateDelay % (8-speed) == 0) {
		var firstCell = snake[snake.length -1],
			lastCell = snake.shift(),
			oldLastCellx = lastCell.x,
			oldLastCelly = lastCell.y;
			
			if(new_direction) {
				direction = new_direction;
                new_direction = null;
				
			}
			
			if(direction == 'right' ) {
				lastCell.x = firstCell.x + squareSize;
				lastCell.y = firstCell.y;
			}
            else if(direction == 'left' ) {
                lastCell.x = firstCell.x - squareSize;
                lastCell.y = firstCell.y;
            }else if(direction == 'up' ) {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - squareSize;
            }		
            else if(direction == 'down' ) {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + squareSize;
            }
			snake.push(lastCell);
            firstCell = lastCell;
            if(addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }
            this.appleCollision();

            this.selfCollision(firstCell);
            this.wallCollision(firstCell);
        }
    },

    appleCollision: function () {
		
		for(var i = 0; i < snake.length; i++) {
			if(snake[i].x == apple.x && snake[i].y == apple.y) {

                score += 1;
                text.text = score;
				
				addNew = true;
				apple.destroy();
				this.generateApple();
				eatSound.play();
				
			}
			
		}
		
	},

    generateApple:function() {
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;

            apple = game.add.sprite(randomX, randomY, "apple");
    },

    selfCollision: function(head) {
        for(var i = 0; i < snake.length -1; i++) {
            if(head.x == snake[i].x && head.y == snake[i].y) {
                deathSound.play();
                game.state.start("Game_Over");
            }
        }
    },

    wallCollision: function(head) {
        if(head.x >= 1200 || head.x <3 || head.y >= 900 || head.y <0){
            deathSound.play();
            game.state.start("Game_Over");
        }
    },

    addMobileInputs: function() {
        this.leftButton = game.add.sprite(100, 800, "arrow-left");
        this.leftButton.inputEnabled = true;
        this.leftButton.alpha = 0.5;
        this.leftButton.events.onInputDown.add(this.goLeft, this);

        this.rightButton = game.add.sprite(1000, 800, "arrow-right");
        this.rightButton.inputEnabled = true;
        this.rightButton.alpha = 0.5;
        this.rightButton.events.onInputDown.add(this.goRight, this);

        this.upButton = game.add.sprite(400, 800, "arrow-up");
        this.upButton.inputEnabled = true;
        this.upButton.alpha = 0.5;
        this.upButton.events.onInputDown.add(this.goUp, this);

        this.downButton = game.add.sprite(700, 800, "arrow-down");
        this.downButton.inputEnabled = true;
        this.downButton.alpha = 0.5;
        this.downButton.events.onInputDown.add(this.goDown, this);
    },

    goLeft: function() {
        if(direction!='right'){
			new_direction = 'left';
		}
    },

    goRight: function() {
        if(direction!='left'){
			new_direction = 'right';
		}
    },

    goUp: function() {
        if(direction!='down'){
			new_direction = 'up';
		}
    },

    goDown: function() {
        if(direction!='up'){
			new_direction = 'down';
		}
    }


};