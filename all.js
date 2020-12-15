const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('.title').text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    
  } else {
    $('.title').text(`Game Over, Press Any Key to Restart.`);
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 100);
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}

function playSound(id) {
  let audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
}

function animatePress(id) {
  $(`#${id}`).addClass('pressed');
  setTimeout(() => {
    $(`#${id}`).removeClass('pressed');
  }, 100);
}

$('.btn').click(function () {
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});
