var playerName=document.getElementById("userName");
var start=document.getElementById("start");
/**Start buttoon disabled until the player write his name*/
start.disabled = true;
playerName.oninput=function(){
    start.disabled =false;
}
/**Save the connected player name in the session storage */
start.onclick= function(){
    if (typeof(sessionStorage) !== "undefined") 
    { sessionStorage.setItem('userName', playerName.value);} 
    else  
        window.alert("Error, your browser does not support Web Storage...");	
    
};