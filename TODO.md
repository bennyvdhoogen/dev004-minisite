DEVORM004 EXPERIENCE
---

Todo:
  - [x] Callback on objects
  - [x] Reflection library
  - [x] View from middle
  - [x] Changes controls back to drag
  - [x] Position and scale objects
  - [x] Music player
  - [x] Lazy load mp3s
  - [x] Download handling for full package
  - [x] Header nav like in 003
      -> Window met still background image
      -> 2 buttons: (download | buy)
  - [x] Check out device orientational controls https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_deviceorientation.html    
  - [x] See if the SoundCloud API can be used
  - [] Clean ups and presentation
  - [] classList backward support
  - Splash page covering the canvas

---

Structure:

  - Create gulp flow
  - Sassss
  - Remove project
  - Remove reusable ray

├── assets/
|   ├── (sound/) (-- MOVED TO /_misc/ --)
|   ├── img/
|   ├── meshes/
|   └── shaders/
├── js/
|   └── libs/
|       ├── libs/
|       |    ├── three.min.js
|       |    └── components/
|       └── components/
|           ├── loaders/
|           ├── controls/
|           ├── world/
|           |   ├── setup.js
|           |   ├── init.js
|           |   └── render.js
|           ├── StateManager.js   
|           ├── SoundManager.js    
|           ├── InputController.js
|           └── main.js
|
├── style/
|   ├── sass/
|   └── css/
├── misc/
|   └── trash folder (should go eventually)
├── node_modules/ (if necessary?)
├── params.php
├── get.php // optional download page
└── index.php
