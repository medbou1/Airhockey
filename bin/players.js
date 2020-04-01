
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

class player extends object{
	constructor(id,X,Y){
		super(X,Y);
		this.id=id;
		this.score=0;
		this.playerName="";

	}
	getScore(){
		return this.score;
	}
	/**method to update speed of player with movement keys pressed */
	updateSpd(maxSpd,width,height){//maxSpd modifiable
		let spdX=0;
		let spdY=0;
		if(this.pressingRight && ((this.id==0 && this.x+width/2<(1000/2-48)) || (this.id==1 && this.x+width/2<1000))){
			
				spdX =maxSpd;
		}
		else if(this.pressingLeft && ((this.id==0 && this.x-width/2>0) || (this.id==1 && this.x-width/2>1000/2+48)))
			spdX = -maxSpd;
		else 
			spdX = 0;
	 
		if(this.pressingUp && this.y-height/2>0)
			spdY = -maxSpd;
		else if(this.pressingDown && this.y+height/2<650)
			spdY = maxSpd;
		else
			spdY = 0;
		return [spdX,spdY];
	}
	/**method to update postion and speed of player */
	update(){
		let aux=this.updateSpd(8,26,120);
       super.updatePosition(aux[0],aux[1]);
	}
}

class Players{
	constructor() {
		/**List of players */
		this.playerList=[];
	}
	addPlayer(id,X,Y){
		let aux=new player(id,X,Y);
		this.playerList[id]=aux;
		return aux;
	}
	/**When new player connect */
	onConnect(socket,X,Y){
		let player=this.addPlayer(socket.id,X,Y);
		/**play socket list when a movement key is pressed */
		socket.on('keyPress',function(data){
			if(data.inputId === 'left')
				player.pressingLeft = data.state;
			else if(data.inputId === 'right')
				player.pressingRight = data.state;
			else if(data.inputId === 'up')
				player.pressingUp = data.state;
			else if(data.inputId === 'down')
				player.pressingDown = data.state;
			
		});

	}
	/**When a player disconnet */
	onDisconnect(socket){
      delete this.playerList[socket.id];
	}
	/**method to update postion of each palyer in the list */
	update(){
		for(let i in this.playerList){
			this.playerList[i].update();
		}
		return this.playerList;
	}
}




module.exports=Players;