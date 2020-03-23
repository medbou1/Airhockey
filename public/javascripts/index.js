var waitingIcon = document.getElementById("waiting");
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = '/images/stade.jpg';
var ballImage = new Image();
ballImage.src = '/images/ball.png';
var winner=new Image();
winner.src='/images/winner.png';
var loser= new Image();
loser.src='/images/loser.png';
var playAgain=document.getElementById("playAgain");
playAgain.addEventListener('click',()=>{document.location.replace("http://localhost:3000");});
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage (img,0, 0,canvas.width,canvas.height);


//chat
var chat=io('http://localhost:3000/chat');
var messege=document.getElementById("msg");
var chatForm=document.getElementById("chatForm");
var discussion=document.getElementById("Discussion");
chatForm.onsubmit=function(event){
  event.preventDefault();
  chat.emit('msg',{player:sessionStorage.getItem('userName'),msg:messege.value});
  messege.value='';
  return false;};
chat.on('msg',function(data){
  var node = document.createElement("div");     
  if(data.player==sessionStorage.getItem("userName"))           
  var textnode = document.createTextNode('            '+data.msg);
  else
  var textnode = document.createTextNode(data.player+': '+data.msg);
  node.appendChild(textnode);   
  discussion.appendChild(node);
});



/*en jeu*/
var play=io('http://localhost:3000/play');
play.emit('getName',sessionStorage.getItem('userName'));
play.on('updatePosition', function(data){
  waitingIcon.style.display="none";
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
  for(var i =0; i<data.player.length;i++){
    ctx.fillStyle= "blue";
   ctx.fillRect(data.player[i].x-(data.player[i].width/2),data.player[i].y-(data.player[i].height/2),data.player[i].width,data.player[i].height);
   if(data.player[i].id ==0){var text1=data.player[i].playerName+': '+data.player[i].score;}
  else {var text2=data.player[i].playerName+': '+data.player[i].score;}}
  (document.getElementById("score")).textContent=text1+' | '+text2;
  ctx.beginPath();
  ctx.drawImage(ballImage,data.bullet.x,data.bullet.y,data.bullet.r,data.bullet.r);
});

/**fin du jeu */
play.on('endGame',function(data){
  ctx.fillStyle= "red";
  ctx.font = "200px Arial";
  if(data.winner==sessionStorage.getItem('userName')){
  ctx.fillText("YOU WIN !",(canvas.width/2)-100,(canvas.height/2)-100,200,200);
  }	
  else{
  ctx.fillText("YOU LOSE !",(canvas.width/2)-100,(canvas.height/2)-100,200,200);
  }	
  //ctx.fillText(data.winner + " wins !",canvas.width/2,canvas.height/2);				        
  playAgain.style.display="block";
  
});

// contoles du joueur
document.onkeydown = function(event){
  if(event.keyCode === 39) //
    play.emit('keyPress',{inputId:'right', state:true});
  if(event.keyCode === 40) //
    play.emit('keyPress',{inputId:'down', state:true});
  else if(event.keyCode === 37) //
    play.emit('keyPress',{inputId:'left', state:true});
  else if(event.keyCode === 38) //
    play.emit('keyPress',{inputId:'up', state:true});
}

document.onkeyup = function(event){
  if(event.keyCode === 39) //
    play.emit('keyPress',{inputId:'right', state:false});
  if(event.keyCode === 40) //
    play.emit('keyPress',{inputId:'down', state:false});
  else if(event.keyCode === 37) //
    play.emit('keyPress',{inputId:'left', state:false});
  else if(event.keyCode === 38) //
    play.emit('keyPress',{inputId:'up', state:false});
}






