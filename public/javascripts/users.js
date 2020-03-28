var playerName=document.getElementById("playerName");
var start=document.getElementById("start");
start.disabled = true;
playerName.oninput=function(){
    start.disabled =false;
}
start.onclick= function(){
    if (typeof(sessionStorage) !== "undefined") 
    { sessionStorage.setItem('userName', playerName.value);} 
    else  
        window.alert("Error, your browser does not support Web Storage...");	
    
};