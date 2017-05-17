var SoundManager = (function () {
	var self = {};
  // idle, playing, muted
  self.status = 'idle'; //
  self.isMuted = false;
  self.soundcloudPlayer;

  self.songs = [
       {"name": "money", "src":"assets/snd/one.mp3"},
       {"name": "arab", "src":"assets/snd/two.mp3"},
       {"name": "sphlash", "src":"assets/snd/three.mp3"},
       {"name": "smile", "src":"assets/snd/four.mp3"},
       {"name": "slime", "src":"assets/snd/four.mp3"},
       {"name": "hand", "src":"assets/snd/five.mp3"}
  ];

  self.playTrackByName = function(songName){
    var songName = songName.replace("invis_", "");
    var songIndex = 0;
    debugger;
    self.songs.forEach(function(item, key){
        if(item.name == songName){
          songIndex = key;
        }
    });

    self.playTrack(songIndex);
    debugger;
  }


  self.attachSCPlayer = function(){
    self.soundcloudPlayer = window.SC.Widget('soundcloud-player');
    debugger;
  }

  self.playTrack = function(trackNumber){
      var player = self.soundcloudPlayer;

      player.isPlay
      alert('playTrack');
      if(trackNumber){
      //  player.pause();
        player.skip(trackNumber);
        player.play();
      }
  }

  self.muteAllToggle = function(){
    self.isMuted = !self.isMuted;
    var muteBtnElem = document.getElementById('mute-btn');
    switch(self.isMuted){
      case true:
            self.soundcloudPlayer.setVolume(0);
            muteBtnElem.className = "mute-btn mute-btn-muted";
            break;
      case false:
            self.soundcloudPlayer.setVolume(100);
            muteBtnElem.className = "mute-btn mute-btn-unmuted";
            break;
    }
    // logic that mutes all audio output
  }

	return self;
}());
