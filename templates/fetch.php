<!-- <div id="fetch-page" style="display:none"; class="content bg-img">
  <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">
    <a href="<?= $buttons['download']['url'] ?>" target="_blank" class="btn btn-outline"> <?= $buttons['download']['txt'] ?></a>
    <a href="<?= $buttons['redeem']['url'] ?>" target="_blank" class="btn btn-outline"> <?= $buttons['redeem']['txt'] ?> </a>
  </div>
</div> -->

<div id="fetch-page" style="display:none;">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 col-md-8 hidden-xs" onclick="goToState(2);" style="height: 100vh; background-color: white; opacity: 0.5;">
      </div>
      <div id="splash-information-panel" class="col-xs-12 col-md-4 col-sm-6" style="height:100vh; background-color: white;">
        <div class="row">
          <div class="centered-information">
            <div class="title-block">
              <a href="<?= $buttons['download']['url']?>" target="blank">
                <img src="assets/svg/ghostkwini_cover.svg" alt="Void, Separation and Waiting" width="300px">
              </a>
            </div>
            <div class="continue-block">
              <a href="<?= $buttons['download']['url'] ?>" target="_blank"> <?= $buttons['download']['txt'] ?></a>
            </div>
            <div class="continue-block">
              <a href="<?= $buttons['redeem']['url'] ?>" target="_blank"> <?= $buttons['redeem']['txt'] ?> </a>
            </div>
            <div class="continue-block alt">
              <button onclick="goToState(2);"> BACK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
