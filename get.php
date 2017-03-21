<?php include 'params.php'; ?>

<!DOCTYPE html>
<html lang="en">
  <head>
      <title><?= $meta['title']; ?></title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
      <link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
      <meta property="og:title" content="<?= $meta['title']; ?>">
      <meta property="og:description" content="<?= $meta['description']; ?>">
      <meta property="og:image" content="<?= $meta['image']; ?>">
      <meta property="og:url" content="<?= $meta['url']; ?>">
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
      <script src="document.js"></script>
      <script type='text/javascript' src='js/controlkit/controlKit.min.js'></script>
  </head>
  <body>
    <header>
      <div class="menu-wrapper">
        <div class="menu float-left">
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
    <div class="content bg-img">
      <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">
        <a href="<?= $buttons['download']['url'] ?>" target="_blank" class="btn btn-outline"> <?= $buttons['download']['txt'] ?></a>
        <a href="<?= $buttons['redeem']['url'] ?>" target="_blank" class="btn btn-outline"> <?= $buttons['redeem']['txt'] ?> </a>
      </div>
    </div>
  </body>
</html>
