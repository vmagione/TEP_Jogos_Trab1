player.direcao   = 1; // 0 = Esquerda, 1 = Direita 
	
	//moving
	direita = false;
	esquerda = false;

	// jumping
	player.gravity   = 1;
	player.dx        = 0;
	player.dy        = 0;
	player.jumpDy    = -10;
	player.isFalling = false;
	player.isJumping = false;

	// spritesheets
	player.sheet     = new SpriteSheet('imgs/sigurd.png', player.width, player.height);
	
	//Sprite Estado Parado
	player.stayLeftAnim  = new Animation(player.sheet, 4, 1, 1); 
	player.stayRightAnim  = new Animation(player.sheet, 4, 0, 0); 
	//Sprite Estado Andando/correndo
	player.walkLeftAnim  = new Animation(player.sheet, 4, 16, 23); 
	player.walkRightAnim  = new Animation(player.sheet, 4, 8, 15);
	//Sprite Estado Pulando
	player.jumpLeftAnim  = new Animation(player.sheet, 4, 34, 34);
	player.jumpRightAnim  = new Animation(player.sheet, 4, 26, 26);
	//Sprite Estado Caindo
	player.fallLeftAnim  = new Animation(player.sheet, 4, 27, 27); 
	player.fallRightAnim  = new Animation(player.sheet, 4, 35, 35); 
	//Sprite Estado Atacando
	player.attackRightAnim  = new Animation(player.sheet, 4, 40, 47); 
	player.attackLeftAnim  = new Animation(player.sheet, 4, 40, 47); 
	
	player.anim      = player.stayAnim;
	
	Vector.call(player, 0, 0, 0, player.dy);
	Vector.call(player, 0, 0, 0, player.dx);

	var jumpCounter = 0;  // how long the jump button can be pressed down

	/**
	* Update the player's position and animation
	*/
	player.update = function() {
		movimentarDireita = false;
		movimentarEsquerda = false;
		

		// jump if not currently jumping or falling
		if (KEY_STATUS.space && player.dy === 0 && !player.isJumping) {
			player.isJumping = true;
			player.dy = player.jumpDy;
			jumpCounter = 12;
			assetLoader.sounds.jump.play();
		}

		// jump higher if the space bar is continually pressed
		if (KEY_STATUS.space && jumpCounter) {
		  player.dy = player.jumpDy;
		}

		jumpCounter = Math.max(jumpCounter-1, 0);
		
		if (KEY_STATUS.right && player.dx == 0 ) {
			player.dx += player.speed;
			player.anim = player.walkRightAnim;
			direita = true;
			movimentarDireita = true;
			player.direcao = 1;
			//updateMove(player.speed);
			moveBG();
		
		}
		if (KEY_STATUS.left && player.dx == 0 ) {
			player.dx -= player.speed;
			player.anim = player.walkLeftAnim;
			esquerda = true;
			player.direcao = 0;
			movimentarEsquerda = true;
			menosMoveBG();
			
		}
		if (KEY_STATUS.button_c) {
			alert("atacou");
			 player.anim = player.attackAnim;
		}
		

		

		// move direita e esquerda
		if (player.isFalling || player.isJumping) {
		  player.dy += player.gravity;
		}
		
		
		
		// change animation if falling
		if (player.dy > 0) {
			if(player.direcao == 0){
				player.anim = player.fallLeftAnim;
			}else if (player.direcao == 1){
				player.anim = player.fallRightAnim;
			}
		}else{
			if (player.dy < 0) {
			// change animation is jumping
				if(player.direcao == 0){
					player.anim = player.jumpLeftAnim;
				}else if (player.direcao == 1){
					player.anim = player.jumpRightAnim;
				}
				
			}else {
				//Se não caindo
				if (player.dx > 0) {
					//Se andando para direita
					player.anim = player.walkRightAnim;
					
				}else{
					if (player.dx < 0) {
						//Se andando para esquerda
						player.anim = player.walkLeftAnim;
						
					}else{
						 if(player.direcao == 0){
							player.anim = player.stayLeftAnim;
						 }else if (player.direcao == 1){
							player.anim = player.stayRightAnim;
						 }

					}
				} 
				
			  //Se parado
			 
			}
		}
		this.advance();

		player.anim.update();
		player.dx = 0;