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
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,500" rel="stylesheet">
  </head>
  <body>
    <header>
      <div class="menu-wrapper">
        <div id="menu-elem" class="menu init float-left">
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

      </div>
    </header>
    <?php include 'templates/fetch.php' ?>
    <?php include 'templates/splash.php' ?>
    <?php include 'templates/loader.php' ?>
    <div class="information-button">
      <button onclick="goToState(1);"> INFO </button>
    </div>
    <div id="track-information" class="track-information">
      <div id="track-info-text">

      </div>
      <div id="actions" class="float-right">
        <button id="mute-btn" onclick="mutePlayer();" class="mute-btn mute-btn-unmuted"></button>
        <div id="mute-btn-muted" class="mute-btn mute-btn-muted hidden"></div>
      </div>
    </div>
    <iframe width="100%" height="1"  style="position:fixed; z-index:-1;" scrolling="no" frameborder="no" id="soundcloud-player"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/328882058&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true">
    </iframe>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
    <script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
    <script src="https://w.soundcloud.com/player/api.js"></script>
    <script src="js/dist/app.js"></script>
  </body>
</html>
 