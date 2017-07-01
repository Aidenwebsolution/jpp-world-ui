function CFailGenerateGrid(oSpriteBg) {

    var _oBg;
    var _oMsgText;
    var _oMsgTextOutline;
    var _oHitArea;
    var _oButRestart;

    var _oContainer;

    this._init = function (oSpriteBg) {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.5;
        _oHitArea.on("click", function () {});
        _oHitArea.cursor = "pointer";
        _oContainer.addChild(_oHitArea);

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(_oBg);

        _oMsgText = new createjs.Text(TEXT_FAIL_GENERATION_MATRIX, "24px " + PRIMARY_FONT, TEXT_COLOR);
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 450;
        _oMsgText.x = CANVAS_WIDTH / 2;
        _oMsgText.y = 380;
        _oContainer.addChild(_oMsgText);

        _oButRestart = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.5 + 100, s_oSpriteLibrary.getSprite('but_restart'), _oContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onPressButRestart, this);

    };

    this.unload = function () {
        _oHitArea.off("click", function () {});

        _oButRestart.unload();
        _oButRestart = null;

        playSound("click", 1, 0);

        s_oStage.removeChild(_oContainer);
    };

    this._onPressButRestart = function () {
        s_oInterface.unloadFailPanel();
        s_oGame.restartLevel();
    };

    this._init(oSpriteBg);

    return this;
}


