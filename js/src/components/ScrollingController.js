var ScrollingController = (function () {
	var self = {};
  // idle, playing, muted
	self.applySmoothScrolling = false;
  self.scrollingCurrentSpeed = 0;
	self.scrollingLeftSpeed = 0;
	self.scrollingRightSpeed = 0;
	self.scrollingProgress = 0; // float bewteen 0 <-> 1

  self.scrollingIncrement = 0.03;
  self.dampingFactor = self.scrollingIncrement * 1;
  self.scrollingStartSpeed = 0.01;
  self.scrollingCap = 0.02;
  self.scrollDuration = 100; //in ms 
  self.scrollStartTime = {};
	self.scrollTimeLeft = 0;
	self.scrollEndTime;
  self.isScrolling = false;
  self.isStopping = false;

	self.scrollingCooldown = 25; // period (in ms) AFTER scroll when  wheel events will be ignored
	self.scrollingCooldownStart; // timestamp when cooldown started
	self.scrollingThreshold = 155;

	self.scrollingTypeCheck = {
		status: 0,
		startTime : 0,
		endTime : 0,
		duration: 200,
		eventTimestamps: [],
		numEvents: 0,
		maxResults: 50,
		checkResults: []
	};

	self.determinedScrollingMechanism = 'continous'; // default stepping

	self.scrollingMechanismReads = {
		data: {},
		minPercentage: 0.6,
		minReads: 15,
		countMemory: 50,
		init: function(){
			standard = {
				total: 0,
				history: {
					"stepper": {
						count: 0,
						percentage: 0
					},
					"continous": {
						count: 0,
						percentage: 0
					}
				}
			}
			return standard;
		}
	};

	self.scrollingMechanismReads.data = self.scrollingMechanismReads.init();

	self.determineScrollType = function(){
		self.scrollingMechanismReads;
		if(self.scrollingMechanismReads){
			if(self.scrollingMechanismReads.data && self.scrollingMechanismReads.data.history){
				for(key in self.scrollingMechanismReads.data.history){
					if(self.scrollingMechanismReads.data.history[key].count > self.scrollingMechanismReads.minReads){
						if(self.scrollingMechanismReads.data.history[key].percentage > self.scrollingMechanismReads.minPercentage){
							self.determinedScrollingMechanism = key;
						}
					}
				}
			}
		}

		switch(self.determinedScrollingMechanism){
			case 'continous':
				self.applySmoothScrolling = false;
				break;
			case 'stepper':
				self.applySmoothScrolling = true;
				break;
		}
	}

	self.readScrollingType = function(){
		if(self.scrollingTypeCheck.checkResults){
			var arrLength = self.scrollingTypeCheck.checkResults.length;
			var targetResult = self.scrollingTypeCheck.checkResults[arrLength - 1];
		}

		if(targetResult){

				if(targetResult.timeDeltaAvg < 20){
					self.scrollingMechanismReads.data.total++;
					var determinedMechanism = 'continous';
				}

				if(targetResult.timeDeltaAvg > 20){
					self.scrollingMechanismReads.data.total++;
					var determinedMechanism = 'stepper';
				}

				self.determinedScrollingMechanism = determinedMechanism
				self.scrollingMechanismReads.data.history[determinedMechanism].count++;
				self.scrollingMechanismReads.data.history[determinedMechanism].percentage = self.scrollingMechanismReads.data.history[determinedMechanism].count / self.scrollingMechanismReads.data.total;
				self.applySmoothScrolling = false;
		}

		if(self.scrollingMechanismReads.data.total > self.scrollingMechanismReads.countMemory){
			self.scrollingMechanismReads.data = self.scrollingMechanismReads.init();
		}
	}

	self.runScrollingTypeCheck = function(){
		var currentTime = new Date().getTime();
		function init(status){
			self.scrollingTypeCheck.status = status;
			self.scrollingTypeCheck.startTime = currentTime;
			self.scrollingTypeCheck.endTime = self.scrollingTypeCheck.startTime + self.scrollingTypeCheck.duration;
			self.scrollingTypeCheck.numEvents = 0;
			self.scrollingTypeCheck.eventTimestamps = [];
		}

		if(self.scrollingTypeCheck.status == 0){
			init(1);
		}

		// on running
		if(self.scrollingTypeCheck.status == 1){
			self.scrollingTypeCheck.numEvents++;
			self.scrollingTypeCheck.eventTimestamps.push(currentTime);
		}

		// on end
		if(self.scrollingTypeCheck.status == 1 && currentTime > self.scrollingTypeCheck.endTime){
			var avg = self.scrollingTypeCheck.eventTimestamps.reduce(function(acc, element, index, array) {
					acc.current = array[index -1];
					acc.current = element - acc.current;

					if(!acc.current.isNan){
						acc.timeDeltas.push(acc.current);
					}
					var sum = 0;
					for(i = 0 ; i < acc.timeDeltas.length; i++){
						if(!isNaN(acc.timeDeltas[i]) ){
							sum = sum + acc.timeDeltas[i];
						}
					}

					var avg = sum / array.length;
					if(index == array.length -1){
						return avg;
					}

			    return acc;
			}, {timeDeltas:[], current: self.scrollingTypeCheck.eventTimestamps[0]});

			self.scrollingTypeCheck.checkResults.push({timestamp: self.scrollingTypeCheck.startTime, count: self.scrollingTypeCheck.numEvents, timeDeltaAvg: avg});
			if(self.scrollingTypeCheck.checkResults.length > self.scrollingTypeCheck.maxResults){
				self.scrollingTypeCheck.checkResults = [];
			}

			init(0);
		}

		self.readScrollingType();
		self.determineScrollType();
	}
  // on scroll up/down event:
  // 1) scroll left speed increases (if event.deltaY < 0)
	// 1) scroll right speed increases (if event.deltaY > 0)
  // every frame the scroll speed decreases so that after {{scrollDuration}} the speed is 0


  self.determineTargetDirection = function(event){
    if(event.deltaY < 0){
			self.scrollingTargetDirection = -1;
			if(self.scrollingLeftSpeed < self.scrollingCap){
				self.scrollingLeftSpeed = self.scrollingLeftSpeed + (self.scrollingIncrement);
	//			self.scrollingLeftSpeed = self.scrollingIncrement * (1 - self.scrollingProgress);
			}
    }
		if(event.deltaY > 0){
      self.scrollingTargetDirection = 1;
			if(self.scrollingRightSpeed < self.scrollingCap){
				self.scrollingRightSpeed = self.scrollingRightSpeed + (self.scrollingIncrement);
	//			self.scrollingRightSpeed = self.scrollingIncrement * (1 - self.scrollingProgress);
			}
    }
  }

	self.updateProgress = function(){
		if(self.isScrolling){
			var currentTime = new Date().getTime();
			self.scrollingProgress = (currentTime - self.scrollStartTime) / self.scrollDuration;
		}
		if(self.scrollingProgress > 1){
			self.scrollingProgress = 1;
		}
	}

  self.handleEvent = function(event){
		var currentTime = new Date().getTime();
		var wheelDelta = event.deltaY;
		if(wheelDelta < 0){
			wheelDelta = wheelDelta * -1;
		}


		if(currentTime < (self.scrollingCooldownStart + self.scrollingCooldown)){
			self.scrollingCooldownStart = currentTime;
			if(wheelDelta < self.scrollingThreshold){
				return false;
			}
			//return false;
		}


    self.determineTargetDirection(event);

    if(!self.isScrolling){
      self.scrollStartTime = new Date().getTime();
			self.scrollingProgress = 0;
			self.scrollEndTime = self.scrollStartTime + self.scrollDuration;
      self.scrollingCurrentSpeed = self.scrollingStartSpeed;
      self.isScrolling = true;
			self.scrollingCooldownStart = new Date().getTime();
    }else{
      // if already scrolling:
    }
  }

  self.updateSpeed = function(){
    self.scrollingCurrentSpeed = (self.scrollingLeftSpeed * -1) + self.scrollingRightSpeed;
		self.scrollingCurrentSpeed = self.scrollingCurrentSpeed * (1 - self.scrollingProgress);
  }

  self.applyDamping = function(){

    if(self.scrollingLeftSpeed > 0){
     self.scrollingLeftSpeed  = self.scrollingLeftSpeed  - (self.dampingFactor);
		 }else{
			 self.scrollingLeftSpeed  = 0;
		 }
		if(self.scrollingRightSpeed > 0){
     self.scrollingRightSpeed  = self.scrollingRightSpeed  - (self.dampingFactor);
		 }else{
			 self.scrollingRightSpeed  = 0;
		 }

    if(self.scrollingCurrentSpeed < 0){
      self.scrollingActualDirection = 0;
      self.scrollingTargetDirection = 0;
    }
  }

  self.updateTimeElapsed = function(){
    if(self.isScrolling){
			self.scrollTimeLeft = self.scrollEndTime - new Date().getTime();
      if(self.scrollStartTime < (new Date().getTime() - self.scrollDuration)){
        self.applyDamping();
        self.isScrolling = false;

      }
    }
  }

  self.applyScrollRotation = function(){
			if(self.applySmoothScrolling){
	    	self.updateTimeElapsed();
	      window.controls.rotate(self.scrollingCurrentSpeed);
	      self.updateSpeed();
				self.updateProgress();
			}
  }

	return self;
}());
