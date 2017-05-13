SC.initialize({
  client_id: 'B4dzsr4tDHKQqDMMMREfUnwrwJzvGaD2'
});

var id = 293

var scPlayer;
SC.stream('/tracks/' + id).then(function(player){
  console.log(player);

  // making sure that 'http' is the first item in .protocols seems to fix issues with the flash obj being blocked
  player.options.protocols = [
    "http",
    "rtmp"
  ];

//  player.play()
  scPlayer = player;
});

function playTrack(trackNumber){
  alert('playTrack');
  if(trackNumber){
    window.SC.Widget('soundcloud-player').skip(trackNumber);
  }
  window.SC.Widget('soundcloud-player').play();
}

//sound2 = new newSound(313537641);
//newSound(313331549);


songs = [{"name": "money", "src":"assets/snd/one.mp3"},
         {"name": "arab", "src":"assets/snd/two.mp3"},
         {"name": "sphlash", "src":"assets/snd/three.mp3"},
         {"name": "smile", "src":"assets/snd/four.mp3"},
         {"name": "slime", "src":"assets/snd/four.mp3"},
         {"name": "hand", "src":"assets/snd/five.mp3"}];

var trackOptions = {
  autoplay: false,
  loop: true,
  volume: 1,
//  html5: true,
  onend: function() {
    console.log('Track finished!');
  }
};

songs.forEach(function(item){
    var options = trackOptions;
    options['src'] = item["src"];
    window["track_" + item['name']] = new Howl(options);
});

var varPrefix = 'track_';

window['songHandler'] = {
  varPrefix : 'track_',
  songVars : {},
  playSong : function(songName){
    songName = songName.replace('invis_', '');
    var songIndex;
    window['songs'].forEach(function(item, key){
        if(item.name == songName){
          songIndex = key;
        }
    });
    window.playTrack(songIndex);
    return true;

    //
    //
    alert('Play: ' + songName);
    for(key in this.songVars){
      window[this.songVars[key]].stop();
      if(key == songName){
          window[this.songVars[key]].play();
      }
    }
  }
};

window['songs'].forEach(function(item){
    window.songHandler['songVars'][item['name']] = varPrefix + item['name'];
});
