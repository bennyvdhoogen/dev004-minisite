var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var components = [
  "./js/src/libs/three.js",
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
  "./js/src/components/ScrollingController.js",
  "./js/src/components/_main.js",
  "./js/src/components/world/init.js",
  "./js/src/components/world/setup.js",
  "./js/src/components/world/render.js",
  "./js/src/components/InputController.js",
  "./js/src/components/NavigationController.js"
]

gulp.task('watch-js', function(event){
  gulp.watch('js/src/**/*.js', ['build']);
});

gulp.task('build', function() {
  return gulp.src(components) 
    .pipe(concat('app.js'))
//    .pipe(uglify())
    .pipe(gulp.dest('js/dist/'));
});
