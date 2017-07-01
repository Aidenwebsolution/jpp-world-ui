function CLanguageMenu() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _oSelLangText;
    var _oSelLangCont;
    var _oBg;
    var _oFade;
    var _oAudioToggle;
    var _oButExit;
    var _oLogo;
    var _aButFlag;

    this._init = function () {
        _aButFlag = new Array();

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        var oSpriteLogoSmall = s_oSpriteLibrary.getSprite("logo_small");

        _oLogo = new CLogo(oSpriteLogoSmall.width * 0.5 + 15, oSpriteLogoSmall.height * 0.5 + 15, oSpriteLogoSmall, s_oStage);

        _oSelLangText = new createjs.Text(TEXT_SELECT_LANG, 65 + "px " + PRIMARY_FONT, TEXT_COLOR_2);
        _oSelLangText.textAlign = "center";
        _oSelLangText.textBaseline = "alphabetic";
        _oSelLangText.x = CANVAS_WIDTH / 2;
        _oSelLangText.y = CANVAS_HEIGHT / 2 - 250;

        s_oStage.addChild(_oSelLangText);

        var iXOffset = 180;
        var iYOffset = 194;

        for (var i = 0; i < NUM_OF_LANGUAGE; i++, iXOffset += 285) {
            if (i % 2 === 0) {
                iXOffset = 180;
                iYOffset += 162;
            }

            var oSpriteFlag = s_oSpriteLibrary.getSprite("flag_" + i);
            _aButFlag.push(this.createFlagButton(iXOffset, iYOffset, oSpriteFlag, i));
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 15, y: (oSprite.height / 2) + 15};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = {x: _oButExit.getX() - oSprite.width - 15, y: (oSprite.height / 2) + 15};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, s_oSpriteLibrary.getSprite('icon_audio'), s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(_oFade);
            _oFade = null;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.createFlagButton = function (iX, iY, oSprite, iID) {
        var oButFlag = new CGfxButton(iX, iY, oSprite, s_oStage);
        oButFlag.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, iID);
        return oButFlag;
    };

    this.unload = function () {
        _oSelLangCont = null;
        _oSelLangText = null;

        for (var i = 0; i < NUM_OF_LANGUAGE; i++) {
            _aButFlag[i].unload();
        }

        _aButFlag = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        _oButExit = null;
        s_oStage.removeAllChildren();

        s_oLanguageMenu = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosAudio.y);

        var oPosLogo = _oLogo.getStartPos();
        _oLogo.setPosition(oPosLogo.x + iNewX, oPosLogo.y + iNewY);
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        this.unload();
        s_oMain.gotoMenu();
    };

    this._onButPlayRelease = function (_iLang) {
        s_oMain.loadJSON(LANGUAGE_ID[_iLang]);
        this.unload();

        playSound("click", 1, 0);
    };

    s_oLanguageMenu = this;

    this._init();
}

var s_oLanguageMenu = null;



