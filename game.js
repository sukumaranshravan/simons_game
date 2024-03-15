var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red", "blue", "green", "yellow"]

function nextSequence(){
    $("h1").text("Level "+level)
    var randomNumber = Math.round(Math.random()*3)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).delay(1000).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    level++
}

$(document).on("keydown",function(pressA){
    if(pressA.key === "a"){
        nextSequence()
    }
})

//1. handler function to deal with mouse click of the simon colour set

//2. adding sounds to the button click

$(".btn").on("click",function(){
    var userChosenColour = this.id 
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    var level_index = userClickedPattern.length-1
    checkAnswer(level_index)
})

// a dedicated function for playing sound is created so that we can call it whenever it is required
function playSound(name){
    var sound = new Audio("./sounds/"+name+".mp3")
    sound.play();
}

// a dedicated function for adding animations
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

// creating a new variable called 'level' to start the game ...
var level = 0

// // creating a function for user memory check

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success")
        if(gamePattern.length===userClickedPattern.length){
            console.log("user"+userClickedPattern[currentLevel])
            console.log("game"+gamePattern[currentLevel])
            userClickedPattern=[]
            nextSequence() 
        } 
    }else{
        playSound("wrong")
        $("h1").text("Game Over..Press Any Key to Restart")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $(document).on("keydown",function(){
            location.reload()
        })
    }
}


