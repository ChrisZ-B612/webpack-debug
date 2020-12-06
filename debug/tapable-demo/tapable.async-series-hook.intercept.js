function anonymous(param1, param2, _callback) {
    "use strict";
    var _context = {};
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(param1, param2);
    _interceptors[1].call(_context, param1, param2);
    function _next1() {
        var _tap2 = _taps[2];
        _interceptors[0].tap(_tap2);
        _interceptors[1].tap(_context, _tap2);
        var _fn2 = _x[2];
        _fn2(_context, param1, param2, _err2 => {
            if (_err2) {
                _callback(_err2);
            } else {
                _callback();
            }
        });
    }
    function _next0() {
        var _tap1 = _taps[1];
        _interceptors[0].tap(_tap1);
        _interceptors[1].tap(_context, _tap1);
        var _fn1 = _x[1];
        _fn1(_context, param1, param2, _err1 => {
            if (_err1) {
                _callback(_err1);
            } else {
                _next1();
            }
        });
    }
    var _tap0 = _taps[0];
    _interceptors[0].tap(_tap0);
    _interceptors[1].tap(_context, _tap0);
    var _fn0 = _x[0];
    _fn0(param1, param2, _err0 => {
        if (_err0) {
            _callback(_err0);
        } else {
            _next0();
        }
    });
}