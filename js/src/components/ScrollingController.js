var ScrollingController = (function () {
	var self = {};
  // idle, playing, muted
  self.scrollingCurrentSpeed = 0;
  self.scrollingActualDirection = 0;
  self.scrollingTargetDirection = 0;
  self.scrollingIncrement = 0.001;
  self.dampingFactor = self.scrollingIncrement * 1;
  self.scrollingStartSpeed = 0.01;
  self.scrollingCap = 0.3;
  self.scrollDuration = 100; //in ms
  self.scrollStartTime = {};
  self.isScrolling = false;
  self.isStopping = false;

  // on scroll up/down event:
  // 1) scroll speed increases/decreases
  // 2) direction changes to 1
  // every frame the scroll speed decreases so that after {{scrollDuration}} the speed is 0

  self.determineTargetDirection = function(event){
    if(event.deltaY > 0){
      self.scrollingTargetDirection = 1;
    }
    if(event.deltaY < 0){
      self.scrollingTargetDirection = -1;
    }
  }

  self.handleEvent = function(event){
    self.determineTargetDirection(event);

    if(!self.isScrolling){
      self.scrollStartTime = new Date().getTime();
      self.scrollingCurrentSpeed = self.scrollingStartSpeed;
      self.isScrolling = true;
    }else{
      // if already scrolling:
    }
  }

  self.increaseSpeed = function(){
    if(self.scrollingCurrentSpeed < self.scrollingCap){
      self.scrollingCurrentSpeed = self.scrollingCurrentSpeed + (self.scrollingIncrement);
    }
    // if direction is the same, speed ++ until cap
    // if direction different: speed -- untill 0
    // if direciton different: when speed >= 0 change actualDirection
  };

  self.decreaseSpeed = function(){
    if(self.scrollingCurrentSpeed > 0){
     self.scrollingCurrentSpeed = self.scrollingCurrentSpeed - (self.scrollingIncrement);
    }
  }

  self.updateDirection = function(){
    if(self.scrollingActualDirection == 0){
      self.scrollingActualDirection = self.scrollingTargetDirection;
    }

    if(self.scrollingActualDirection != self.scrollingTargetDirection){
    //  debugger;
      console.log('change direction!');
      self.scrollingCurrentSpeed = 0;
      if(self.scrollingCurrentSpeed <= 0){
        // change direction if speed hits 0
        self.scrollingActualDirection = self.scrollingActualDirection * -1;
      }
    }
  }

  self.updateSpeed = function(){
    if(self.isScrolling){
      if(self.scrollingTargetDirection == self.scrollingActualDirection){
        self.increaseSpeed();
      }

      if(self.scrollingTargetDirection != self.scrollingActualDirection){
        self.decreaseSpeed();
      }
      if(self.scrollingCurrentSpeed > self.scrollingCap){
        self.scrollingCurrentSpeed = self.scrollingCap;
      }

    }else{
      self.decreaseSpeed();
    }


    if(self.scrollingCurrentSpeed < 0){
      self.scrollingCurrentSpeed = 0;
    }

  }

  self.applyDamping = function(){
    if(self.scrollingCurrentSpeed > 0){
     self.scrollingCurrentSpeed = self.scrollingCurrentSpeed - (self.dampingFactor);
    }
    if(self.scrollingCurrentSpeed < 0){
      self.scrollingActualDirection = 0;
      self.scrollingTargetDirection = 0;
    }
  }

  self.updateTimeElapsed = function(){
    if(self.isScrolling){
      if(self.scrollStartTime < (new Date().getTime() - self.scrollDuration)){
        self.applyDamping();
        self.isScrolling = false;
      }
    }
  }

  self.applyScrollRotation = function(){
    self.updateTimeElapsed();
    console.log(self.scrollingCurrentSpeed);
    console.log(self.isScrolling);
      window.controls.rotate(self.scrollingCurrentSpeed * self.scrollingActualDirection);
      self.updateDirection();
      self.updateSpeed();
      self.applyDamping();
  }

	return self;
}());
