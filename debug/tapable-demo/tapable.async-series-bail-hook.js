function anonymous(param1, param2, _callback) {
    "use strict";
    var _context = {};
    var _x = this._x;
    function _next1() {
        var _fn2 = _x[2];
        _fn2(_context, param1, param2, (_err2, _result2) => {
            if (_err2) {
                _callback(_err2);
            } else {
                if (_result2 !== undefined) {
                    _callback(null, _result2);
                    ;
                } else {
                    _callback();
                }
            }
        });
    }
    function _next0() {
        var _fn1 = _x[1];
        _fn1(_context, param1, param2, (_err1, _result1) => {
            if (_err1) {
                _callback(_err1);
            } else {
                if (_result1 !== undefined) {
                    _callback(null, _result1);
                    ;
                } else {
                    _next1();
                }
            }
        });
    }
    var _fn0 = _x[0];
    _fn0(param1, param2, (_err0, _result0) => {
        if (_err0) {
            _callback(_err0);
        } else {
            if (_result0 !== undefined) {
                _callback(null, _result0);
                ;
            } else {
                _next0();
            }
        }
    });
}