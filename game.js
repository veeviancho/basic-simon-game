const colors = ['green', 'red', 'yellow', 'blue'];
let pattern = [];
let userPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
    if (!started) {
        started = true;
        nextSequence();
    }
});

$(".btn").click(function() {
    let clickedColor = $(this).attr("id");
    userPattern.push(clickedColor);
    flashButton(clickedColor);
    playSound(clickedColor);
    checkAnswer(userPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === pattern[currentLevel]) {
        if (userPattern.length === pattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over. Press any key to restart.");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        gameRestart();
    }
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level)
    userPattern = [];

    let randomNo = Math.floor(Math.random() * 4);
    let currentColor = colors[randomNo];
    pattern.push(currentColor);
    
    $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(currentColor);
}

function flashButton(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed")
    }, 200);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function gameRestart() {
    pattern = [];
    started = false;
    level = 0;
}