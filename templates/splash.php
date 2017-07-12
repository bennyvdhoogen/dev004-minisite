<div id="splash-screen" style="display:none;">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 col-md-8 hidden-xs" onclick="goToState(2);" style="height: 100vh; background-color: white; opacity: 0.5;">
      </div>
      <div id="splash-information-panel" class="col-xs-12 col-md-4 col-sm-6" style="height:100vh; background-color: white;">
        <div class="row">
          <div class="centered-information">
            <div class="title-block">
              <a href="<?= $buttons['download']['url']?>" target="blank">
                <img src="assets/svg/cover_invert_1.svg" width="300px">
              </a>
            </div>
            <div class="continue-block">
              <button onclick="goToState(2);"> LISTEN </button>
            </div>
            <div class="continue-block">
              <button onclick="goToState(3);"> DOWNLOAD </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
