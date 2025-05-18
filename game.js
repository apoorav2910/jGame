// alert("Game.js Loaded successfully")
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 1;
var currInd = 0;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).on("keypress touchstart click", function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
    }
    else{
        console.log("Wrong!");
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameStarted = false;
        level = 1;
        gamePattern = [];
    }
    if (currInd === level-1) setTimeout(function() { nextSequence(); }, 1000);
}

function nextSequence(){
    $("h1").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    level++;
    userClickedPattern = [];
    currInd = 0;
}



$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(currInd++);
    //nextSequence();
})





