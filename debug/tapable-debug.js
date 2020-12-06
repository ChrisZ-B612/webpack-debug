const {
    SyncHook,
} = require("tapable");

class Test {
    constructor() {
        this.hooks = {
            abc: new SyncHook(['param1', 'param2']),
        };
    }

    tap() {
        this.hooks.abc.tap('tap1', function (param1, param2) {
            console.log('tap1', param1, param2);
        });

        this.hooks.abc.tap('tap2', function (param1, param2) {
            console.log('tap2', param1, param2);
        });

        this.hooks.abc.tap('tap3', function (param1, param2) {
            console.log('tap3', param1, param2);
        });

        return this;
    }

    call() {
        this.hooks.abc.call('value1', 'value2');
        return this;
    }
}

const test = new Test();
test.tap().call();
