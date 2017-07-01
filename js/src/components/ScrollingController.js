var ScrollingController = (function () {
	var self = {};
  // idle, playing, muted
  self.scrollingCurrentSpeed = 0;
	self.scrollingLeftSpeed = 0;
	self.scrollingRightSpeed = 0;

  self.scrollingIncrement = 0.01;
  self.dampingFactor = self.scrollingIncrement * 1;
  self.scrollingStartSpeed = 0.01;
  self.scrollingCap = 0.01;
  self.scrollDuration = 2000; //in ms
  self.scrollStartTime = {};
	self.scrollTimeLeft = 0;
	self.scrollEndTime;
  self.isScrolling = false;
  self.isStopping = false;

  // on scroll up/down event:
  // 1) scroll left speed increases (if event.deltaY < 0)
	// 1) scroll right speed increases (if event.deltaY > 0)
  // every frame the scroll speed decreases so that after {{scrollDuration}} the speed is 0

  self.determineTargetDirection = function(event){
    if(event.deltaY < 0){
			self.scrollingTargetDirection = -1;
			if(self.scrollingLeftSpeed < self.scrollingCap){
				self.scrollingLeftSpeed = self.scrollingLeftSpeed + (self.scrollingIncrement);
			}
    }
		if(event.deltaY > 0){
      self.scrollingTargetDirection = 1;
			if(self.scrollingRightSpeed < self.scrollingCap){
				self.scrollingRightSpeed = self.scrollingRightSpeed + (self.scrollingIncrement);
			}
    }
  }

  self.handleEvent = function(event){
    self.determineTargetDirection(event);

    if(!self.isScrolling){
      self.scrollStartTime = new Date().getTime();
			self.scrollEndTime = self.scrollStartTime + self.scrollDuration;
      self.scrollingCurrentSpeed = self.scrollingStartSpeed;
      self.isScrolling = true;
    }else{
      // if already scrolling:
    }
  }

  self.updateSpeed = function(){
    self.scrollingCurrentSpeed = (self.scrollingLeftSpeed * -1) + self.scrollingRightSpeed;
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
      self.applyDamping();

			console.log("isScrolling : "+ self.isScrolling);
			console.log("scrollStart : "+ self.scrollStartTime);
			console.log("scrollTimeLeft :" + self.scrollTimeLeft);
			console.log("scrollEnd : "+ (self.scrollEndTime));
			console.log("left : " + self.scrollingLeftSpeed * 1);
			console.log("right : " + self.scrollingRightSpeed * 1);
  }

	return self;
}());
