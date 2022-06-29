//the game is counting the key pressed by the user in the input field and displaying it in the div

//get the input field, this input will be a text
var input = document.getElementById("input");

var kps = 0;

var kpss = [];

//each second
setInterval(function(){
    document.getElementById("text").innerHTML = kps + " kps";
    kpss.push(kps);
    kps = 0;
    //get the last 60 element of kpss
    var last60 = kpss.slice(Math.max(kpss.length - 60, 1));
    //add the last 60 element of kpss
    var sum = 0;
    for(var i = 0; i < last60.length; i++){
        sum += last60[i];
    }
    document.getElementById("textM").innerHTML = sum + " kpm the last minute";

    //test if kpss array lenght is greater than 60
    if(kpss.length > 60){
        //remove the first element of kpss
        kpss.shift();
    }
}   , 1000);

//event listener for the input field
input.addEventListener("keydown", function(event){
    kps++;
}   , false);