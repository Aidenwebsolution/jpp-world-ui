function CHelpPanel(oSprite) {
    var _oHelpBg;
    var _oGroup;
    var _oFade;
    var _oGroup;
    var _oButContinue;
    var _oHelpImg;
    var _bClick = false;

    this._init = function (oSprite) {
        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH * 0.5;
        _oHelpBg.y = CANVAS_HEIGHT * 0.5;
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;

        _oGroup = new createjs.Container();

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oGroup.addChild(_oFade);

        _oGroup.addChild(_oHelpBg);

        s_oStage.addChild(_oGroup);

        this.page1(_oGroup);

        _oGroup.on("pressup", function () {
            s_oHelpPanel._onExitHelp();
        }, null, true);

        if (!s_bMobile)
            _oGroup.cursor = "pointer";
    };

    this.page1 = function (oContainer) {

        var oTextMatch;
        oTextMatch = new createjs.Text(TEXT_SUMMARY, "44px " + PRIMARY_FONT, TEXT_COLOR);
        oTextMatch.x = CANVAS_WIDTH * 0.5;
        oTextMatch.y = CANVAS_HEIGHT * 0.5 - 180;
        oTextMatch.textAlign = "center";
        oContainer.addChild(oTextMatch);

        var oTextExplain = new createjs.Text(TEXT_HELP, "26px " + SECONDARY_FONT, TEXT_COLOR);
        oTextExplain.x = CANVAS_WIDTH * 0.5;
        oTextExplain.y = CANVAS_HEIGHT * 0.5 - 100;
        oTextExplain.textAlign = "center";
        oTextExplain.lineWidth = 430;
        oContainer.addChild(oTextExplain);

        var oSpriteImgHelp = s_oSpriteLibrary.getSprite("img_help");

        _oHelpImg = createBitmap(oSpriteImgHelp);
        _oHelpImg.x = CANVAS_WIDTH_HALF - 100;
        _oHelpImg.y = CANVAS_HEIGHT_HALF + 108;
        _oHelpImg.regX = oSpriteImgHelp.width * 0.5;
        _oHelpImg.regY = oSpriteImgHelp.height * 0.5;

        oContainer.addChild(_oHelpImg);

        createjs.Tween.get(oContainer).to({alpha: 1}, 300, createjs.Ease.cubicOut);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5 + 180, CANVAS_HEIGHT * 0.5 + 110, oSpriteContinue, oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onExitHelp, this);
        _oButContinue.pulseAnimation();

        s_oStage.addChild(oContainer);
    };


    this.unload = function () {
        s_oStage.removeChild(_oGroup);
        s_oHelpPanel = null;
        _oButContinue.unload();
        _oButContinue = null;
    };

    this._onExitHelp = function () {
        if (_bClick) {
            return;
        }
        _oGroup.removeAllEventListeners();
        _bClick = true;
        playSound("click", 1, 0);
        createjs.Tween.get(_oGroup).to({alpha: 0}, 300, createjs.Ease.cubicOut).call(function () {
            s_oGame._onExitHelp();
        });
    };

    s_oHelpPanel = this;

    this._init(oSprite);

}

var s_oHelpPanel = null;