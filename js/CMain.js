function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oGame;
    var _oLevelMenu;
    var _oLanguageMenu;

    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();


        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        this._loadImages();
        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
            
            //this.gotoMenu();
        }
    };

    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.ogg", "click");
            createjs.Sound.registerSound("./sounds/guessed.ogg", "guessed");
            createjs.Sound.registerSound("./sounds/wrong.ogg", "wrong");
            createjs.Sound.registerSound("./sounds/game_completed.ogg", "game_completed");

        } else {
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.mp3", "click");
            createjs.Sound.registerSound("./sounds/guessed.mp3", "guessed");
            createjs.Sound.registerSound("./sounds/wrong.mp3", "wrong");
            createjs.Sound.registerSound("./sounds/game_completed.mp3", "game_completed");
        }

        RESOURCE_TO_LOAD += 5;
    };

    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        //s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        //s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");

        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("icon_audio", "./sprites/icon_audio.png");

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");

        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_category.png");
        s_oSpriteLibrary.addSprite("hit_area_cell", "./sprites/hit_area_cell.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");

        s_oSpriteLibrary.addSprite("arrow_right", "./sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("arrow_left", "./sprites/arrow_left.png");
        //s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");

        //s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_not", "./sprites/but_not.png");

        s_oSpriteLibrary.addSprite("game_panel", "./sprites/game_panel.png");
        s_oSpriteLibrary.addSprite("word_panel", "./sprites/word_panel.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");

        s_oSpriteLibrary.addSprite("img_help", "./sprites/img_help.png");
        s_oSpriteLibrary.addSprite("time_board", "./sprites/time_board.png");
        //s_oSpriteLibrary.addSprite("logo_small", "./sprites/logo_small.png");

        for (var i = 0; i < NUM_OF_LANGUAGE; i++) {
            s_oSpriteLibrary.addSprite("flag_" + i, "./sprites/flag_" + i + ".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
            }

            this.gotoMenu();
        }
    };

    this._onAllImagesLoaded = function () {

    };

    this.onLoadedJSON = function (oData) {
        s_aJSONWords = oData;
        s_oMain.gotoLevelMenu();
    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function (iLevel) {
        _oGame = new CGame(_oData, iLevel);
        _iState = STATE_GAME;

        $(s_oMain).trigger("start_session");
    };

    this.gotoLanguageMenu = function () {
        _oLanguageMenu = new CLanguageMenu();
        _iState = STATE_MENU;
    };

    this.loadJSON = function (szLanguage) {
        jQuery.getJSON("json/" + szLanguage + ".json", this.onLoadedJSON);
    };

    this.gotoLevelMenu = function () {
        _oLevelMenu = new CLevelMenu();
        _iState = STATE_MENU;
    };

    this.stopUpdate = function () {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");
    };

    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_oAdsLevel = 1;

var s_iLevelReached = 1;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;
var s_oCanvas;

var s_iLanguageSelected;

var s_oSpriteSheetLora;

var s_aJSONWords;

