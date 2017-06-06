var EasingTools = (function () {
	var self = {};
  self.status = 'idle'; //

	self.easeInSin = function (t) {
	  return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
	}
	self.easeOutSin = function (t) {
	  return Math.sin(Math.PI / 2 * t);
	}
	self.easeInOutSin = function (t) {
	  return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
	}

	return self;
}());
