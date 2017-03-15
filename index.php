<?php include 'params.php'; ?>

<!DOCTYPE html>
<html lang="en">
  <head>
      <title><?= $meta['title']; ?></title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
      <link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
      <meta property="og:title" content="<?= $meta['title']; ?>">
      <meta property="og:description" content="<?= $meta['description']; ?>">
      <meta property="og:image" content="<?= $meta['image']; ?>">
      <meta property="og:url" content="<?= $meta['url']; ?>">
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
      <script src="js/three.min.js"></script>
      <script src="js/controls/PointerLockControls.js"></script>
      <script src="js/loaders/collada/Animation.js"></script>
      <script src="js/loaders/collada/AnimationHandler.js"></script>
      <script src="js/loaders/collada/KeyFrameAnimation.js"></script>
      <script src="js/loaders/ColladaLoader.js"></script>
      <script src="js/Detector.js"></script>
      <script src="js/libs/stats.min.js"></script>
      <script src="js/controls/OrbitControls.js"></script>
      <script src="page.js"></script>
      <script src="document.js"></script>
      <script src="js/howler/howler.core.min.js"></script>
      <script src="js/audioplayer.js"></script>
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
          <div id="mute-btn" class="mute-btn mute-btn-unmuted"></div>
          <div id="mute-btn-muted" class="mute-btn mute-btn-muted hidden"></div>
        </div>
      </div>
    </header>
  </body>
</html>
