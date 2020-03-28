
// création dynamique de la division music player

// fonction faite pour ne pas ecrire toujours "document.getElementById"
function _(id){
	return document.getElementById(id);
}


function audioApp(){
	
	var ak_playbtn = new Image();
	ak_playbtn.src = '/images/ak_playbtn.png';
	var ak_pausebtn = new Image();
	ak_pausebtn.src = '/images/ak_pausebtn.png';

	var audio = new Audio();
	var audio_folder = "/audio/";
	var audio_ext = ".mp3";
	var audio_index = 1;
	var is_playing = false;
	var playingtrack;
	var trackbox = _("trackbox");
	var tracks = {
	    "track1":["Bass", "bass"],
		"track2":["Sax", "sax"],
		"track3":["Piano", "piano"]//ajouter les fichiers audio apres ajout dans le dossier audio
	};
	for(var track in tracks){
		var tb = document.createElement("div");
		var pb = document.createElement("button");
		var tn = document.createElement("div");
		tb.className = "trackbar";
		pb.className = "playbutton";
		tn.className = "trackname";
		tn.innerHTML = audio_index+". "+tracks[track][0];
		pb.id = tracks[track][1];
		pb.addEventListener("click", switchTrack);
		tb.appendChild(pb);
		tb.appendChild(tn);
		trackbox.appendChild(tb);
		audio_index++;
	}


	audio.addEventListener("ended",function(){
		_(playingtrack).style.background = "url(/images/ak_playbtn.png)";
		_(playingtrack).style.backgroundSize = "19px 22px";
		playingtrack = "";
		is_playing = false;
	});


	function switchTrack(event){
		if(is_playing){
		    if(playingtrack != event.target.id){
			    is_playing = true;
				_(playingtrack).style.background = "url(/images/ak_playbtn.png)";
				_(playingtrack).style.backgroundSize = "19px 22px"

				event.target.style.background = "url(/images/ak_pausebtn.png)";
				event.target.style.backgroundSize = "19px 22px";

			    audio.src = audio_folder+event.target.id+audio_ext;
	            audio.play();
			} 
			else {
			    audio.pause();
			    is_playing = false;
				event.target.style.background = "url(/images/ak_playbtn.png)";
				event.target.style.backgroundSize = "19px 22px";
			}
		} 
		else {
			is_playing = true;
			event.target.style.background = "url(/images/ak_pausebtn.png)";
			event.target.style.backgroundSize = "19px 22px";

			if(playingtrack != event.target.id){
				audio.src = audio_folder+event.target.id+audio_ext;
			}
	        audio.play();
		}
		playingtrack = event.target.id;
	}
}


window.addEventListener("load", audioApp);