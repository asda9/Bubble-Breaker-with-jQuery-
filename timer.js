//timer.js (Time for BubbleBreaker)
$(document).ready(function() {

//var timerLoop;

//var timer = function() {
	
//}


var time = 0;
//$("#timer").text(String(time));
	var ti

var timerLoop = function() {
	time += 1;
	$("#timer").text(String(time));
	ti = setTimeout(timerLoop, 1000);
}

timerLoop();


$(".button").click(function() {
	time=0;
	$("#timer").text(String(time));
	//clearTimeout(ti); //NOT SURE IF THIS WILL HAVE A PROBLEM LATER!!!!!!!!!!!!!!1
	//timeLoop();
});



/*
var timeid;



var timework = function() {
	alert("body is loaded!");
	$("#timer").text(String(time));
	time += 1;
	timeid = setTimeout("changetime()", 1000);
}

function restarttime() {
	clearTimeout(timeid);
	time=0;
	changetime();
}
*/
});