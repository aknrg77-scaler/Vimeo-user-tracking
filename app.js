function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);

player.getVideoTitle().then(function(title) {
  console.log('title:', title);
});
  
  // When the player is ready, add listener for playProgress
player.on('play', function() {

    player.setCurrentTime(getCookie("timeElapsed")).then(function(seconds) {
    }).catch(function(error) {
      switch (error.name) {
        case 'RangeError':
            // The time is less than 0 or greater than the video's duration
            break;
    
        default:
            // Some other error occurred
            break;
      }
    });

});

player.getVolume().then(function(playbackRate) {
  console.log(playbackRate);
});

player.on('timeupdate',function(data) {
  document.cookie = `timeElapsed=${data.seconds}`;
});




player.on('ended', function(){
  alert('Video play completed');
});