var userName=document.getElementById("userName");
var login=document.getElementById("start");
login.disabled = true;
userName.oninput=function(){
    login.disabled =false;
}
login.onclick= function(){
    if (typeof(sessionStorage) !== "undefined") {  				
            sessionStorage.setItem('userName', userName.value);			           
            //window.location.replace("http://localhost:3000"); 			
    } 
    else  
          window.alert("Sorry, your browser does not support Web Storage...");	
    
};