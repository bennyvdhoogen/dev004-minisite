var SoundManager = (function () {
	var self = {};
  // idle, playing, muted
  self.status = 'idle'; //
  self.isMuted = false;
	self.isPaused = false;
  self.soundcloudPlayer;
	self.currentPlayingIndex = null;

  self.songs = [
       {"name": "money", "index": 0},
       {"name": "arab", "index": 1},
       {"name": "sphlash", "index": 2},
       {"name": "smile", "index": 3},
       {"name": "slime", "index": 4},
       {"name": "hand", "index": 5}
  ];

  self.playTrackByName = function(songName){
    var songName = songName.replace("invis_", "");
    var songIndex = null;
    self.songs.forEach(function(item, key){
        if(item.name == songName){
          songIndex = key;
        }
    });

    songIndex && self.playTrack(songIndex);
  }

	self.displayTrackName = function(){
		var elemWrapper = document.getElementById("track-information");
		elemWrapper.classList = 'track-information active';
		var elem = document.getElementById("track-info-text"); 
		var trackTitle = self.songs[self.currentPlayingIndex].name;
		elem.innerHTML = trackTitle;
	}

  self.attachSCPlayer = function(){
    self.soundcloudPlayer = window.SC.Widget('soundcloud-player');
		self.soundcloudPlayer.bind(SC.Widget.Events.PAUSE, function(event){
			//
		});
		self.soundcloudPlayer.bind(SC.Widget.Events.PLAY, function(event){
			//
		});
		self.soundcloudPlayer.bind(SC.Widget.Events.FINISH, function(event){
			// stop playback on track finish
			self.soundcloudPlayer.pause();
			self.isPaused = true;
		});
  }

  self.playTrack = function(trackNumber){
      var player = self.soundcloudPlayer;

			if(self.isPaused == true){
				player.skip(trackNumber);
				self.isPaused = !self.isPaused;
			}

      if(trackNumber){
				if(trackNumber != self.currentPlayingIndex){
						self.currentPlayingIndex = trackNumber;
						player.skip(trackNumber);
						self.displayTrackName();
				}
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
