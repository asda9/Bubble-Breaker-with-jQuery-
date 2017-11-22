//bubbles.js 

var rows = 8; 

var columns = 15; 

var sizeofgrid = rows*columns;

$(document).ready(function() {


var spanParent;

var score=0;

/*
	Array of bubbles selected by the user. Bubble images in the selectedbubbles array will appear in a box on the screen. If the user clicks on any of them again, 
	all of the bubbles in selectedbubbles will "burst"
	The selectedbubbles array contains the ids of the currently selected bubbles (ie. bordered in black box). 
*/
var selectedbubbles = new Array(); 

//the number of remaining bubbles still on the screen. This is all of the bubbles that have not yet been "burst". 
var bubblenumber = sizeofgrid;



//Clears score, makes a new grid of bubbles and starts a new game
$("#newgamebutton").click(function() {
	
	score = 0;
	$("#totalscore").text(String(score)); //reset the total score

	$("#scoreincrease").text("0"); //then set the text telling the user how many points they could earn to zero
	intscore=0;
	$("#scoreinterm").css("opacity", 0); //make the text telling the user how many points they could earn opaque
		

	//reset the grid of bubbles (first empty the div that contained the grid of spans, then re-add a grid of spans, each with an image inside it
	$("#bubblegrid").empty();

	var bubblenumb1to5; //a random number from 1 to 5
	for (var i=0; i<(sizeofgrid); i++) { 
		bubblenumb1to5 = Math.floor(Math.random()*5) + 1;

		testspan = "<span id=\"" + i +"\" class= \"tspan\"> </span>";
	
		testerst = "<img id = \"image" + i + "\" src = \"" + bubblenumb1to5 + ".png\" class = \"bubbleclass\" name = \"" + bubblenumb1to5 + "\"> </img>";
	
		$("#bubblegrid").append(testspan);
		$("#"+i).append(testerst);
		$("#image"+i).css("opacity", "0.78"); 
	}	
});



/*
	Recursive funtion that takes the id of the current bubble and the bubble colour and finds all adjacent bubbles of the same colour
*/
var findadjbubbles = function(bubbleid, bubblecolour) { 	

	if (selectedbubbles.indexOf(bubbleid) < 0) { //if the bubble isn't already in the selectedbubbles array	

		if (($("#"+bubbleid).children().attr("name")) == bubblecolour) { //add the bubble if it's the same colour
			
			selectedbubbles.push(bubbleid);
		}
		else {
			return;
		}
	}
	
	//the following recursively checks the bubble's neighbours in all directions (top, bottom, right, left)
	topneighbour = bubbleid-columns;
	if ((topneighbour) >= 0 && (($("#"+topneighbour).children().length) !== 0) && (selectedbubbles.indexOf(topneighbour) < 0)) { //has a top neighbour
		findadjbubbles((topneighbour), bubblecolour);
	}
	bottom = bubbleid+columns;
	if ((bottom) < sizeofgrid && (($("#"+bottom).children().length) !== 0) && (selectedbubbles.indexOf(bottom) < 0)) { //has bottom neighbour
		findadjbubbles((bottom), bubblecolour);		
	}
	totheright = bubbleid+1;
	if ((totheright < (bubbleid+15 - (bubbleid%15))) && (($("#"+totheright).children().length) !== 0) && (selectedbubbles.indexOf(totheright) < 0)) {
		findadjbubbles((totheright), bubblecolour);
	}
	totheleft = bubbleid-1;
	if ((totheleft >= (bubbleid - (bubbleid)%15)) && (($("#"+totheleft).children().length) !== 0) && (selectedbubbles.indexOf(totheleft) < 0)) {
		findadjbubbles((totheleft), bubblecolour);
	}	
	return;	
};



var boxthebubbles = function() { 
	
	//get the name of the image that is in the span that was clicked on (the name corresponds to the image's colour)
	child1 = $("#"+parentSpan).children();	
	bubcolour = ($(child1).attr("name"));
	
	//find all of the adjacent bubbles that are of the same colour
	findadjbubbles(parentSpan, bubcolour); 	

	//add a border around all of the selected bubbles
	for (var bubbles = 0; bubbles < selectedbubbles.length; bubbles++) {
		$("#"+selectedbubbles[bubbles]).css("border", "2px solid lightgrey");
	}
	
	//tell the user how many points they could get if they "burst" the selected bubbles
	intscore = (selectedbubbles.length)*(selectedbubbles.length)
	$("#scoreincrease").text(String(intscore));
	$("#scoreinterm").css("opacity", 1); //make the text on the screen visible
};




//decide on something to do here
var gameended = function() {
	
};



/*
	A function that removes the selected bubbles, causing all bubbles above it to fall 
	It indexes through the bubbles in the selectedbubbles array, removes the image child of each span element in the array, and 
	moves all of the image children of the span's upper neighbours down
*/
var gravity = function() {
	selectedbubbles.sort(function(a, b) {return a-b}); //sorts bubble ids in the selectedbubbles array
	
	for (var index2 = 0; index2 < selectedbubbles.length; index2++) { 
	//indexing though the bubbles in the selectedbubbles array

		idofbubble = selectedbubbles[index2]; //the id of the bubble (corresponds to the span id)
		
		//remove the image child from that span element 
		$("#"+(idofbubble)).empty()
		
		while ((idofbubble-columns) >= 0 && (($("#"+(idofbubble-columns)).children().length) !== 0)) { 
			//while the bubble has an upper neighbour
			
			//move the top neighbour's image child down to the current span and make the span of the top neighbour empty
			$("#"+(idofbubble)).append($("#"+(idofbubble-columns)).html());
			$("#"+(idofbubble-columns)).empty();

			//remove the border
			$("#"+(idofbubble)).css("border", "2px solid black");
			
			idofbubble = idofbubble-columns;
			
		}

		bubblenumber--; //reduces the number of bubbles in the game by 1
		$("#"+(idofbubble)).css("border", "2px solid black");

	}
		
	if (bubblenumber == 0) {
		gameended();
	}
};



$(document).on("click", ".tspan", function() { 
/* 
	Called when a bubble image is clicked on
	
	If the bubble or any adjacent bubbles of the same colour have not just been selected, they will now be bordered in grey. 
	The selectedbubbles array will be cleared of any previous items and the id of the bubble and adjacent bubbles of the same colour will be added to the array
	The potential score increase will be made visible and displayed to the user.

	If the bubble is part of a set that has just been selected (would show the bubbles bordered in grey on the screen), 
		all the selected bubbbles will now "burst".
	If the bubble is part of a set that has just been selected, its id (and those of adjacent bubbles of the same colour) would be in the selectedbubbles array.

	If there is a set of bubbles selected (ie. bordered in grey), but this bubble is not part of that set, then the previous bubbles will be unselected,
	and this bubbles and all adjacent bubbles of the same colour will be selected (ie. bordered in grey and added to the selectedbubbles array).		

*/
	if (($(this).children().length) !== 0) { //if there is a bubble (image element) in the span that was just clicked on (ie. it has not already been burst).

		parentSpan=Number(($(this).attr("id")));  //id of the span that was just clicked on
	
		if (selectedbubbles.length > 0) { //if some bubbles have just been selected
			if ((selectedbubbles.indexOf(parentSpan)) >= 0) { //if the bubble that just was just clicked on is in the set of currently selected bubbles
			//all the bubbles in the set "burst"
			
				//increase the total score
				score += intscore;
				$("#totalscore").text(String(score));

				//then set the text telling the user how many points they could earn to zero
				$("#scoreincrease").text("0"); 
				intscore=0;	
				$("#scoreinterm").css("opacity", 0); //make the text telling the user how many points they could earn opaque

				gravity(); //remove all bubbles in the set, causing all bubbles above it to fall			
			
				selectedbubbles = []	//reset the array

			}
			else { //the bubble just selected is not part of the set of currently selected bubbles
				//remove the bordered from all the previously selected bubbles
				for (var index1 = 0; index1 < selectedbubbles.length; index1++) {
					$("#"+(selectedbubbles[index1])).css("border", "2px solid black"); 
				}
				selectedbubbles = [] //reset the array
				boxthebubbles(parentSpan); //surrounds all adjacent bubbles (of the same colour) with a grey border and adds them to selectedbubbles array

			}
		}
		else { //no bubbles were just selected (ie. no bubbles are surrounded by a black border)
		
			boxthebubbles(parentSpan); //surrounds all adjacent bubbles (of the same colour) with a grey border and adds them to selectedbubbles array
		
		}
	}	
});



});