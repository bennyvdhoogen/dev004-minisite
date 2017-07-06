var ScrollingController = (function () {
	var self = {};
  // idle, playing, muted
  self.scrollingCurrentSpeed = 0;
	self.scrollingLeftSpeed = 0;
	self.scrollingRightSpeed = 0;
	self.scrollingProgress = 0; // float bewteen 0 <-> 1

  self.scrollingIncrement = 0.01;
  self.dampingFactor = self.scrollingIncrement * 1;
  self.scrollingStartSpeed = 0.01;
  self.scrollingCap = 0.01;
  self.scrollDuration = 100; //in ms
  self.scrollStartTime = {};
	self.scrollTimeLeft = 0;
	self.scrollEndTime;
  self.isScrolling = false;
  self.isStopping = false;

	self.scrollingCooldown = 200; // period (in ms) AFTER scroll when  wheel events will be ignored
	self.scrollingCooldownStart; // timestamp when cooldown started
	self.scrollingThreshold = 155;

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
			console.log("still warm!");
			console.log(event);
			self.scrollingCooldownStart = currentTime;
			if(wheelDelta < self.scrollingThreshold){
				return false;
			}
			console.log(wheelDelta);
			//return false;
		}

		console.log("currentTime :" + currentTime);
		console.log("scrollingCooldownStart :" + self.scrollingCooldownStart);
		console.log("scrollingCooldown :" + self.scrollignCooldown);

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
    	self.updateTimeElapsed();
      window.controls.rotate(self.scrollingCurrentSpeed);

      self.updateSpeed();
			self.updateProgress();
  //    self.applyDamping();

			console.log("isScrolling : "+ self.isScrolling);
			console.log("scrollStart : "+ self.scrollStartTime);
			console.log("scrollTimeLeft :" + self.scrollTimeLeft);
			console.log("progress :" + self.scrollingProgress);
			console.log("scrollEnd : "+ (self.scrollEndTime));
			console.log("left : " + self.scrollingLeftSpeed * 1);
			console.log("right : " + self.scrollingRightSpeed * 1);
  }

	return self;
}());
