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
