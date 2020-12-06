function anonymous(param1, param2) {
    "use strict";
    var _context = {};
    var _x = this._x;
    var _loop;
    do {
        _loop = false;
        var _fn0 = _x[0];
        var _result0 = _fn0(param1, param2);
        if (_result0 !== undefined) {
            _loop = true;
        } else {
            var _fn1 = _x[1];
            var _result1 = _fn1(_context, param1, param2);
            if (_result1 !== undefined) {
                _loop = true;
            } else {
                var _fn2 = _x[2];
                var _result2 = _fn2(_context, param1, param2);
                if (_result2 !== undefined) {
                    _loop = true;
                } else {
                    if (!_loop) {
                    }
                }
            }
        }
    } while (_loop);
}