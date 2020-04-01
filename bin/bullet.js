
class object{
	constructor(X,Y){
		this.x=X;
		this.y=Y;
	}
	updatePosition(spdX,spdY){
		this.x+=spdX;
		this.y+=spdY;

		this.pressingRight = false;
		this.pressingLeft = false;
		this.pressingUp = false;
		this.pressingDown = false;

		this.width=26;
		this.height=120
	}
}
class Bullet extends object{
	constructor(angle,X,Y,playerList){
	 super(X,Y);
	 this.playerList=playerList
	 if(Math.random()<=0.5)
	 this.spdX = -3;
     else
	 this.spdX = 3;
     if(Math.random()<=0.5)
	 this.spdY = -3;
     else
	 this.spdY = 3;

	 this.r = 38;
	}
	/**When the bullet touch one of the playes */
	player_bullet_collision(number_player){
		
		let left = this.x ,
                        right = this.x + this.r,
                        top = this.y ,
                        bottom = this.y +this.r;
                    
                let pleft = this.playerList[number_player].x - this.playerList[number_player].width / 2,
                        pright = this.playerList[number_player].x + this.playerList[number_player].width / 2,
                        ptop = this.playerList[number_player].y - this.playerList[number_player].height / 2,
                        pbottom = this.playerList[number_player].y + this.playerList[number_player].height / 2;
		
                    

		/**If collision with the first player */
		if (number_player==0 && top>ptop && bottom<pbottom && right>pleft && this.x+this.r/2<pleft)
                    {
                        this.spdX -= 1;
						
                    }
		else if (number_player==0 && top>ptop && bottom<pbottom && left<pright && this.x+this.r/2>pright && this.spdX<0 )
                    {
                        this.spdX *= -1;
			            this.spdX += 1;
						
                    }
		else if(number_player==0 && right> pleft && pright> left) 
                    {   if (bottom>ptop && ptop>top)
		        {	if( this.spdY>0){
					this.spdY *= -1;
					this.spdY = this.spdY-1;
				}
				if(this.x+this.r/2>pright && this.spdX<0 ){
					this.spdX *= -1;
					this.spdX += 1;
				}
			}
			else if(top<pbottom && pbottom<bottom)
			{	if(this.spdY<0){
					this.spdY *= -1;
					this.spdY = this.spdY+1;
				}
			 	if(this.x+this.r/2>pright && this.spdX<0 ){
					this.spdX *= -1;
					this.spdX += 1;
			 	}
			}
		}
		/**If collision with the scond player */
		else if (number_player==1 && top>ptop && bottom<pbottom && left<pright && this.x+this.r/2>pright)
                    {
                        this.spdX += 1;
						
                    }
		else if (number_player==1 && top>ptop && bottom<pbottom && right>pleft && this.x+this.r/2<pleft && this.spdX>0)
                    {
                        this.spdX *= -1;
			            this.spdX = this.spdX-1;
						
                    }
		else if(number_player==1 && left< pright && pleft<right)
                {
                        if (bottom>ptop && ptop>top )
                        {	if( this.spdY>0){
					this.spdY *= -1;
					this.spdY = this.spdY-1;
				}
				if(this.x+this.r/2<pleft && this.spdX>0 ){
					this.spdX *= -1;
					this.spdX = this.spdX-1;
				}
			}
			else if(top<pbottom && pbottom<bottom)
			{	if( this.spdY<0){
					this.spdY *= -1;
					this.spdY = this.spdY+1;
				}
			 	if(this.x+this.r/2<pleft && this.spdX>0 ){
					this.spdX *= -1;
					this.spdX = this.spdX-1;
				}
			}
						
                }
		if(this.spdX>20)
			this.spdX = 20;
		else if(this.spdX< -20)
			this.spdX = -20;
		if(this.spdY>20)
			this.spdY = 20;
		else if(this.spdY< -20)
			this.spdY = -20;		    
	   }
	/**Update the Bullet postion, speed and if there is a collision each 40ms */
	update(){
	 if(this.y + this.r>650 && this.spdY>0){
		 this.spdY *= -1;
		 
	 }
	 else if(this.y <0 && this.spdY<0){
		 this.spdY *= -1;
		 
	 }
	 /** When a Player lose, rest bullet postion and update players score */
	 if(this.x + this.r>1000){
		 if(Math.random()<=0.5)
			 this.spdX = -3;
		 else
			 this.spdX = 3;
		 if(Math.random()<=0.5)
			 this.spdY = -3;
		 else
			 this.spdY = 3;
		 this.y = 325-this.r;
		 this.x = 500-this.r;
		this.playerList[0].score++;
		 
	 }
	 else if(this.x + this.r<0){
		 if(Math.random()<=0.5)
			 this.spdX = -3;
		 else
			 this.spdX = 3;
		 if(Math.random()<=0.5)
			 this.spdY = -3;
		 else
			 this.spdY = 3;
		 this.y = 325-this.r;
		 this.x = 500-this.r;
		 this.playerList[1].score++;
		 
	 }
	 /**When collision between player and bullet call player_bullet_collision method */
	 else  {
		 for(let i in this.playerList){			
			 this.player_bullet_collision(this.playerList[i].id);
		 }	 
	 }
	 /**Update the bullet postion */
	 super.updatePosition(this.spdX,this.spdY);
	 return {x:this.x,y:this.y,r:this.r};
 }
}

module.exports=Bullet;