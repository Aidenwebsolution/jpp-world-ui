function CTimeBoard(oSprite, iX, iY) {

    var _pStartPosContainer;
    var _oContainer;
    var _oTimeBoard;
    var _oTimeText;

    this._init = function (oSprite, iX, iY) {
        _pStartPosContainer = {x: iX, y: iY};

        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosContainer.x;
        _oContainer.y = _pStartPosContainer.y;

        _oTimeBoard = createBitmap(oSprite);
        _oTimeBoard.x = 0;
        _oTimeBoard.y = 0;
        _oTimeBoard.regX = 0;
        _oTimeBoard.regY = 0;

        _oContainer.addChild(_oTimeBoard);

        _oTimeText = new createjs.Text("00:00:00", "34px " + PRIMARY_FONT, TEXT_COLOR);
        _oTimeText.x = oSprite.width * 0.30;
        _oTimeText.y = oSprite.height * 0.65;
        _oTimeText.textAlign = "left";
        _oTimeText.textBaseline = "middle";
        _oContainer.addChild(_oTimeText);

        s_oStage.addChild(_oContainer);

    };

    this.getStartPosition = function () {
        return _pStartPosContainer;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
    };

    this.refresh = function (szText) {
        _oTimeText.text = szText;
    };

    this._init(oSprite, iX, iY);

    return this;
}