function CPause() {

    var _oContainer;
    var _oBg;
    var _oMsgBox;
    var _oLogo;
    var _oButContinue;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;

        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));

        _oContainer.addChild(_oBg);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oMsgBox = createBitmap(oSpriteBg);
        _oMsgBox.x = CANVAS_WIDTH_HALF;
        _oMsgBox.y = CANVAS_HEIGHT_HALF;
        _oMsgBox.regX = oSpriteBg.width * 0.5;
        _oMsgBox.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(_oMsgBox);

        var oSpriteLogoSmall = s_oSpriteLibrary.getSprite("logo_small");
        _oLogo = new CLogo(oSpriteLogoSmall.width * 0.5 + 15, oSpriteLogoSmall.height * 0.5 + 15, oSpriteLogoSmall, _oContainer);

        _oContainer.on("click", function () {});

        var oPauseText = new createjs.Text(TEXT_PAUSE, "60px " + PRIMARY_FONT, TEXT_COLOR);
        oPauseText.x = CANVAS_WIDTH * 0.5;
        oPauseText.y = CANVAS_HEIGHT * 0.5 - 160;
        oPauseText.textAlign = "center";
        _oContainer.addChild(oPauseText);

        s_oStage.addChild(_oContainer);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 70, oSpriteContinue, _oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onLeavePause, this);

        this.onPause(true);

        createjs.Tween.get(_oContainer).to({alpha: 1}, 300, createjs.quartOut).call(function () {
            createjs.Ticker.paused = true;
        });
        
        
        this.refreshPosLogo(s_iOffsetX, s_iOffsetY);
    };

    this.onPause = function (bVal) {
        s_oGame.setPause(bVal);
    };

    this.unload = function () {
        _oBg.off("click", function () {});
        s_oStage.removeChild(_oContainer);
    };

    this.refreshPosLogo = function (iNewX, iNewY) {
        var oPosLogo = _oLogo.getStartPos();
        _oLogo.setPosition(oPosLogo.x + iNewX, oPosLogo.y + iNewY);
    };

    this._onLeavePause = function () {
        playSound("click", 1, 0);
        createjs.Ticker.paused = false;
        createjs.Tween.removeTweens(_oContainer);
        var oParent = this;
        createjs.Tween.get(_oContainer).to({alpha: 0}, 300, createjs.quartIn).call(function () {
            oParent.onPause(false);
            _oButContinue.unload();
            s_oInterface.unloadPause();
        });
    };

    this._init();

    return this;
}