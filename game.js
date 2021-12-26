const buttonColors = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 

//game start status, will call nextSequence() when started 
var started = false; 

//game level
var level = 0;

//adding eventListener to whole doc to check for keyboard press 
$(document).keypress(function(event){
    console.log(event.key);

    if(!started){

        //update h1 text
        $("#level-title").text(`Level ${level}`);

        nextSequence(); 

        started = true; 
    }
});

//add eventListener to buttons for cicked 
$(".btn").click(function(){
    var userChosenColor = this.id; //to get the current clicked button's id # OR using jQuery $(this).attr("id"); 
    //console.log(userChosenColor); 
    userClickedPattern.push(userChosenColor); 

    //play audio
    playSound(userChosenColor);

    //animate button pressed 
    animatePress(userChosenColor);

    //checking user's clicked, by passing the last clicked index
    checkAnswer(userClickedPattern.length - 1); 
});

//function to play audio 
function playSound(color){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play(); 
}

//function to animate button pressed 
function animatePress(color){

    //add the class to animate button clicked
    $(`#${color}`).addClass("pressed");

    //remove the class after some delay 
    setTimeout( function(){ $(`#${color}`).removeClass("pressed"); }, 100 );
}

//function to randomly pick button color sequence 
function nextSequence(){

    //reset the user's clicked pattern array, setting up for next level so can check again if the user got the correct pattern
    userClickedPattern = []; 

    //increase game level
    level++; 

    //update h1 text
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4); 

    var randomChosenColor = buttonColors[randomNumber]; 

    console.log(randomChosenColor); 

    gamePattern.push(randomChosenColor); 

    //make button flash 
    $(`#${randomChosenColor}`).fadeOut().fadeIn(); 

    //play audio
    playSound(randomChosenColor); 
}


//function to check userClickedPattern is same as the gamePattern
function checkAnswer(currentLevel){
    //to check correct color picked by user 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success"); 

        //to check if user finished the sequence pattern according to gamePattern's length 
        if(gamePattern.length === userClickedPattern.length){

            //call color next seqeunce after delay 
            setTimeout(nextSequence, 1000); 
        }
    } 
    else{
        console.log("wrong");

        playSound("wrong"); 

        //add CSS class to animate wrong 
        $("body").addClass("game-over");
        setTimeout( function(){$("body").removeClass("game-over");}, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart"); 

        //start over the game
        startOver();

    }
}

//reset the game
function startOver(){
    level = 0;
    gamePattern = []; 
    started = false; 
}


