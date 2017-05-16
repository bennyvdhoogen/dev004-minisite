<?php include 'params.php'; ?>

<!DOCTYPE html>
<html lang="en">
  <head>
      <title><?= $meta['title']; ?></title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
      <meta property="og:title" content="<?= $meta['title']; ?>">
      <meta property="og:description" content="<?= $meta['description']; ?>">
      <meta property="og:image" content="<?= $meta['image']; ?>">
      <meta property="og:url" content="<?= $meta['url']; ?>">
      <link rel="stylesheet" type="text/css" href="styles/css/style.css" media="screen" />
      <link rel="stylesheet" type="text/css" href="styles/css/bootstrap.min.css"/>
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
      <script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
      <script src="https://w.soundcloud.com/player/api.js"></script>
      <script src="js/libs/three.min.js"></script>
      <script src="js/components/controls/OrbitControls.js"></script>
      <script src="js/components/controls/DeviceOrientationControls.js"></script>
      <script src="js/components/controls/PointerLockControls.js"></script>
      <script src="js/components/loaders/collada/Animation.js"></script>
      <script src="js/components/loaders/collada/AnimationHandler.js"></script>
      <script src="js/components/loaders/collada/KeyFrameAnimation.js"></script>
      <script src="js/components/loaders/ColladaLoader.js"></script>
      <script src="js/components/loaders/Detector.js"></script>
      <script src="js/components/StateManager.js"></script>
      <script src="js/components/_main.js"></script>
      <!-- <script src="js/components/_debug.js"></script> -->
      <script src="js/components/world/setup.js"></script>
      <script src="js/components/world/init.js"></script>
      <script src="js/components/world/render.js"></script>
      <script src="js/components/InputController.js"></script>
      <script src="js/components/NavigationController.js"></script>
      <script src="js/components/SoundManager.js"></script>
      <script type='text/javascript' src='js/controlkit/controlKit.min.js'></script>
  </head>
  <body>
    <header>
      <div class="menu-wrapper">
        <div class="menu init float-left">
          <ul>
            <li><?= $info['release']; ?></li>
            <li><?= $info['artist']; ?></li>
              <?php
              foreach($links as $link){ ?>
                  <li><a href="<?= $link['url']; ?>" ><?= $link['txt'] ?></a></li>
                  <?php
              }
              ?>
          </ul>
        </div>
        <div class="float-left m-6 hidden-xs">
          <button id="mute-btn" onclick="mutePlayer(this);" class="mute-btn mute-btn-unmuted"></button>
          <div id="mute-btn-muted" class="mute-btn mute-btn-muted hidden"></div>
        </div>
        <iframe width="100%" height="450"  scrolling="no" frameborder="no" id="soundcloud-player"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/304658516&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false">
        </iframe>

        </div>
      </div>
    </header>
  </body>
</html>
