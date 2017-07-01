var NUM_ROWS_PAGE_LEVEL = 5;
var NUM_COLS_PAGE_LEVEL = 2;
function CLevelMenu() {
    var _iCurPage;
    var _iHeightToggle;
    var _aLevelButs;
    var _aPointsX;
    var _aContainerPage;

    var _pStartPosSelect;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosRight;
    var _pStartPosLeft;

    var _oButExit;
    var _oAudioToggle;
    var _oArrowRight = null;
    var _oArrowLeft = null;
    var _oTextLevel;
    var _oContainer;
    var _oFade;
    var _oLogo;

    this._init = function () {
        _iCurPage = 0;

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        //var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        //_oContainer.addChild(oBg);

        //var oSpriteLogoSmall = s_oSpriteLibrary.getSprite("logo_small");

        //_oLogo = new CLogo(oSpriteLogoSmall.width * 0.5 + 15, oSpriteLogoSmall.height * 0.5 + 15, oSpriteLogoSmall, s_oStage);

        _pStartPosSelect = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT_HALF - 255};

        _oTextLevel = new createjs.Text(TEXT_SELECT_CATEGORY, "70px " + PRIMARY_FONT, TEXT_COLOR_2);
        _oTextLevel.x = _pStartPosSelect.x;
        _oTextLevel.y = _pStartPosSelect.y;
        _oTextLevel.textAlign = "center";
        s_oStage.addChild(_oTextLevel);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 15, y: (oSprite.height / 2) + 15};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _iHeightToggle = oSprite.height;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = {x: _oButExit.getX() - oSprite.width - 15, y: (oSprite.height / 2) + 15};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, s_oSpriteLibrary.getSprite('icon_audio'), s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        this._checkBoundLimits();

        //FIND X COORDINATES FOR LEVEL BUTS
        _aPointsX = new Array();
        var iWidth = CANVAS_WIDTH + EDGEBOARD_X * 2;
        var iOffsetX = Math.floor(iWidth / NUM_COLS_PAGE_LEVEL) / 2;
        var iXPos = 0;
        for (var i = 0; i < NUM_COLS_PAGE_LEVEL; i++) {
            _aPointsX.push(iXPos);
            iXPos += iOffsetX * 2;
        }

        _aContainerPage = new Array();
        this._createNewLevelPage(0, s_aJSONWords.categories.length);

        if (_aContainerPage.length > 1) {
            //MULTIPLE PAGES
            for (var k = 1; k < _aContainerPage.length; k++) {
                _aContainerPage[k].visible = false;
            }

            _pStartPosRight = {x: CANVAS_WIDTH - 80, y: CANVAS_HEIGHT - 80};
            _oArrowRight = new CGfxButton(_pStartPosRight.x, _pStartPosRight.y, s_oSpriteLibrary.getSprite('arrow_right'), s_oStage);
            _oArrowRight.addEventListener(ON_MOUSE_UP, this._onRight, this);

            _pStartPosLeft = {x: 80, y: CANVAS_HEIGHT - 80};
            _oArrowLeft = new CGfxButton(_pStartPosLeft.x, _pStartPosLeft.y, s_oSpriteLibrary.getSprite('arrow_left'), s_oStage);
            _oArrowLeft.addEventListener(ON_MOUSE_UP, this._onLeft, this);
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

    this.unload = function () {
        for (var i = 0; i < _aLevelButs.length; i++) {
            _aLevelButs[i].unload();
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        _oButExit = null;

        if (_oArrowLeft !== null) {
            _oArrowLeft.unload();
            _oArrowRight.unload();
        }

        s_oLevelMenu = null;
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if (_oArrowLeft !== null) {
            _oArrowRight.setPosition(_pStartPosRight.x - iNewX, _pStartPosRight.y - iNewY);
            _oArrowLeft.setPosition(_pStartPosLeft.x + iNewX, _pStartPosLeft.y - iNewY);
        }

        var oPosLogo = _oLogo.getStartPos();
        _oLogo.setPosition(oPosLogo.x + iNewX, oPosLogo.y + iNewY);
    };

    this._checkBoundLimits = function () {
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        var iY = 0;

        var iHeightBound = CANVAS_HEIGHT - (EDGEBOARD_Y * 2) - (_iHeightToggle * 2);
        var iNumRows = 0;

        while (iY < iHeightBound) {
            iY += oSprite.height + 20;
            iNumRows++;
        }

        if (NUM_ROWS_PAGE_LEVEL > iNumRows) {
            NUM_ROWS_PAGE_LEVEL = iNumRows;
        }


        var iNumCols = 0;
        var iX = 0;
        var iWidthBounds = CANVAS_WIDTH - (EDGEBOARD_X * 2);
        var oSprite = s_oSpriteLibrary.getSprite('but_level');

        while (iX < iWidthBounds) {
            iX += (oSprite.width / 2) + 5;
            iNumCols++;
        }
        if (NUM_COLS_PAGE_LEVEL > iNumCols) {
            NUM_COLS_PAGE_LEVEL = iNumCols;
        }
    };

    this._createNewLevelPage = function (iStartLevel, iEndLevel) {
        var oContainerLevelBut = new createjs.Container();
        _oContainer.addChild(oContainerLevelBut);
        _aContainerPage.push(oContainerLevelBut);

        _aLevelButs = new Array();
        var iCont = 0;
        var iY = -200;
        var iNumRow = 1;
        var bNewPage = false;
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        for (var i = iStartLevel; i < iEndLevel; i++) {
            var oBut = new CLevelBut(_aPointsX[iCont] + oSprite.width / 2, iY + oSprite.height / 2, s_aJSONWords.categories[i].cat_name, oSprite, true, oContainerLevelBut);
            oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onButLevelRelease, this, i);
            _aLevelButs.push(oBut);

            iCont++;
            if (iCont === _aPointsX.length) {
                iCont = 0;
                iY += oSprite.height + 20;
                iNumRow++;
                if (iNumRow > NUM_ROWS_PAGE_LEVEL) {
                    bNewPage = true;
                    break;
                }
            }
        }

        oContainerLevelBut.x = CANVAS_WIDTH / 2;
        oContainerLevelBut.y = 520;
        oContainerLevelBut.regX = oContainerLevelBut.getBounds().width / 2;

        if (bNewPage) {
            //ADD A PAGE
            this._createNewLevelPage(i, iEndLevel);
        }

    };

    this._onRight = function () {
        _aContainerPage[_iCurPage].visible = false;

        _iCurPage++;
        if (_iCurPage >= _aContainerPage.length) {
            _iCurPage = 0;
        }

        _aContainerPage[_iCurPage].visible = true;
    };

    this._onLeft = function () {
        _aContainerPage[_iCurPage].visible = false;

        _iCurPage--;
        if (_iCurPage < 0) {
            _iCurPage = _aContainerPage.length - 1;
        }

        _aContainerPage[_iCurPage].visible = true;
    };

    this._onButLevelRelease = function (iCategory) {
        //s_oSavings.levelSelected(iLevel + 1);
        s_oMain.gotoGame(s_aJSONWords.categories[iCategory]);
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        this.unload();
        s_oMain.gotoLanguageMenu();
    };

    s_oLevelMenu = this;
    this._init();
}

var s_oLevelMenu = null;