function CMenu() {
    var _oBg;
    var _oButPlay;
    var _oButCredits;
    var _oFade;
    var _oAudioToggle;
    var _oCreditsPanel;

    var _pStartPosAudio;
    var _pStartPosCredits;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSpritePlay = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 + 250, oSpritePlay);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('icon_audio');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width / 2) + 15, y: (oSprite.height / 2) + 15};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
       

        var oSprite = s_oSpriteLibrary.getSprite('but_info');
        _pStartPosCredits = {x: (oSprite.width / 2) + 15, y: (oSprite.height / 2) + 15};
        _oButCredits = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, oSprite);
        _oButCredits.addEventListener(ON_MOUSE_UP, this._onCredits, this);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(_oFade);
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        s_oStage.removeChild(_oBg);
        _oBg = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        createjs.Tween.removeAllTweens();
        
        s_oMenu = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        _oButCredits.setPosition(_pStartPosCredits.x + iNewX, _pStartPosCredits.y + iNewY);
    };
    
    this._onCredits = function () {
        _oCreditsPanel = new CCreditsPanel();
        playSound("click", 1, 0);
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButPlayRelease = function () {
        this.unload();
        playSound("click", 1, 0);
        s_oMain.gotoLanguageMenu();
    };
    s_oMenu = this;

    this._init();
}

var s_oMenu = null;