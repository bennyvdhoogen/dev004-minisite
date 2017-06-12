var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

var components = [
  "./js/src/libs/three.min.js",
  "./js/src/components/controls/OrbitControls.js",
  "./js/src/components/controls/DeviceOrientationControls.js",
  "./js/src/components/controls/PointerLockControls.js",
  "./js/src/components/loaders/collada/Animation.js",
  "./js/src/components/loaders/collada/AnimationHandler.js",
  "./js/src/components/loaders/collada/KeyFrameAnimation.js",
  "./js/src/components/loaders/ColladaLoader.js",
  "./js/src/components/loaders/Detector.js",
  "./js/src/components/StateManager.js",
  "./js/src/components/SoundManager.js",
  "./js/src/components/EasingTools.js",
  "./js/src/components/_main.js",
  "./js/src/components/world/init.js",
  "./js/src/components/world/setup.js",
  "./js/src/components/world/render.js",
  "./js/src/components/InputController.js",
  "./js/src/components/NavigationController.js"
  // './js/controlkit/controlKit.min.js'
]

gulp.task('build', function() {
  return gulp.src(components)
    .pipe(concat('app.js'))
    .pipe(replace(/('|")use strict\1/g, ';'))
    .pipe(gulp.dest('./js/dist/'));
});
