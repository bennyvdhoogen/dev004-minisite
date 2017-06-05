var SoundManager = (function () {
	var self = {};
  // idle, playing, muted
  self.status = 'idle'; //
  self.isMuted = false;
	self.isPaused = false;
  self.soundcloudPlayer;
	self.currentPlayingIndex = null;

	// maps the name of the meshes, the soundcloud widget track index and the track display title together.
  self.songs = [
       {"name": "money", "displayName" : "Money", "index": 0},
       {"name": "arab", "displayName" : "Arab", "index": 1},
       {"name": "sphlash", "displayName" : "Sphlash", "index": 2},
       {"name": "smile", "displayName" : "Smile", "index": 3},
       {"name": "slime", "displayName" : "Slime", "index": 4},
       {"name": "hand", "displayName" : "Hand", "index": 5}
  ];

  self.playTrackByName = function(songName){
    var songName = songName.replace("invis_", "");
    var songIndex = undefined;
    self.songs.forEach(function(item, key){
        if(item.name == songName){
          songIndex = key;
        }
    });
    songIndex !== undefined && self.playTrack(songIndex);
  }

	self.displayTrackName = function(){
		var elemWrapper = document.getElementById("track-information");
		elemWrapper.classList = 'track-information active';
		var elem = document.getElementById("track-info-text");
		var trackTitle = self.songs[self.currentPlayingIndex].displayName;
		elem.innerHTML = trackTitle;
	}

  self.attachSCPlayer = function(){
    self.soundcloudPlayer = window.SC.Widget('soundcloud-player');
		self.soundcloudPlayer.getSounds(function(sounds){
			console.log(sounds);
			sounds.forEach(function(sound, index){
					self.songs[index].displayName = sound.title;
			});
		});
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

      if(trackNumber != undefined){
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
