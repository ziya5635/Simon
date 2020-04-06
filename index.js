let arr = [];
// includes all colors selected by the user in different levels.
let userHistory = [];
// includes all colors selected by the robot in different levels.
let robotHistory = [];

let level = 1;

$(document).keydown(() => {
  if (arr.length == 0) {
    $('.heading').text('level ' + level);
    $('body').removeClass('gameOver');
    robotColor();
    blinkking(robotHistory, 200, 1000);
    setTimeout(playSounds, 20, robotHistory);
    arr.push(1);
  }
})

$('.row div').click(e => {
  if (arr.length > 0) {
    userHistory.push(e.currentTarget.textContent);
    slidding(e.currentTarget);
    setTimeout(playSound, 20, e.currentTarget.textContent);
    if (!judge()) {
      $('.heading').html('<h1>GAME OVER!</h1> <h4>Press any keys to restart.</h4>');
      $('body').addClass('gameOver');
      playSound(['wrong']);
      arr = [];
      userHistory = [];
      robotHistory = [];
      level = 1;
    }
    else if (robotHistory.length == userHistory.length && judge()) {
      level += 1;
      robotColor();
      blinkking(robotHistory, 200, 800);
      playSounds(robotHistory);
      userHistory = [];
      $('.heading').text('level ' + level);
    }else{
    arr.push(1)};
  }
})

// this function returns a list of random colors.
function robotColor(){
  var squrares = ['green', 'yellow', 'blue', 'red'];
  var randomIndex = Math.floor(Math.random() * 4);
  robotHistory.push(squrares[randomIndex]);
}

function blinkking(colors, speed, timeOut){
  let i = 0;
  setTimeout(function delay(){
    $('.' + colors[i]).fadeOut(speed).fadeIn(speed);
    i++;
    setTimeout(delay, timeOut);
  }, timeOut);
}

function slidding(element){
  $(element).slideUp('fast').slideDown('fast');
}

function playSound(color){
  let address = 'sounds/' + color + '.mp3';
  let sound = new Audio(address);
  sound.play();
}

function playSounds(colors){
  let i = 0;
  setTimeout(function delay(){
    if (i < colors.length){
      let address = 'sounds/' + colors[i] + '.mp3';
      let sound = new Audio(address);
      sound.play();
    }
    i++;
    setTimeout(delay, 800);
  }, 800);
}

function judge(){
  for (var i = 0; i < userHistory.length; i++) {
    if (userHistory[i] != robotHistory[i]) {
      return false;
    }
  }
  return true;
}
