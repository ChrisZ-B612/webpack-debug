const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    AsyncSeriesLoopHook,
} = require("tapable");

class Test {
    constructor() {
        this.hooks = {
            abc: new SyncHook(['param1', 'param2']),
            // abc: new SyncBailHook(['param1', 'param2']),
            // abc: new SyncWaterfallHook(['param1', 'param2']),
            // abc: new SyncLoopHook(['param1', 'param2']),
            // abc: new AsyncSeriesHook(['param1', 'param2']),
            // abc: new AsyncSeriesBailHook(['param1', 'param2']),
            // abc: new AsyncSeriesWaterfallHook(['param1', 'param2']),
        };
    }

    intercept() {
        this.hooks.abc.intercept({
            tap(tap) {
                console.log('NASA: intercept1 -> tap', tap);
            },
            call(param1, param2) {
                console.log('NASA: intercept1 -> call', param1, param2);
            },
            register(tap) {
                console.log('NASA: intercept1 -> register', tap);
            },
        });

        this.hooks.abc.intercept({
            context: true,
            tap(context, tap) {
                console.log('NASA: intercept2 -> tap', context, tap);
            },
            call(context, param1, param2) {
                console.log('NASA: intercept2 -> call', context, param1, param2);
            },
            register(context, tap) {
                console.log('NASA: intercept2 -> register', context, tap);
            },
        });

        return this;
    }

    tap() {
        this.hooks.abc.tap('tap1', function (param1, param2) {
            const rand = Math.random() > 0.5 ? 'tap1' : undefined;
            console.log('NASA: Test -> tap1', rand);
            return rand;
        });

        this.hooks.abc.tap({
            name: 'tap2',
            context: true,
        }, function (context, param1, param2) {
            const rand = Math.random() > 0.5 ? 'tap2' : undefined;
            console.log('NASA: Test -> tap2', rand);
            return rand;
        });

        this.hooks.abc.tap({
            name: 'tap3',
            context: true,
        }, function (context, param1, param2) {
            const rand = Math.random() > 0.5 ? 'tap3' : undefined;
            console.log('NASA: Test -> tap3', rand);
            return rand;
        });

        return this;
    }

    tapAsync() {
        this.hooks.abc.tapAsync('tapAsync1', function (param1, param2, callback) {
            console.log('NASA: Test -> tapAsync -> tapAsync1');
            callback() ;
        });

        this.hooks.abc.tapAsync({
            name: 'tapAsync2',
            context: true,
        }, function (context, param1, param2, callback) {
            console.log('NASA: Test -> tapAsync -> tapAsync2');
            callback('err2') ;
        });

        this.hooks.abc.tapAsync({
            name: 'tapAsync3',
            context: true,
        }, function (context, param1, param2, callback) {
            console.log('NASA: Test -> tapAsync -> tapAsync3');
            callback() ;
        });

        return this;
    }

    tapPromise() {
        this.hooks.abc.tapPromise('tapPromise1', function (param1, param2) {
            console.log('NASA: Test -> tapPromise -> tapPromise1');
            return Promise.resolve();
        });

        this.hooks.abc.tapPromise({
            name: 'tapPromise2',
            context: true,
        }, function (context, param1, param2) {
            console.log('NASA: Test -> tapPromise -> tapPromise2');
            return Promise.resolve();
        });

        this.hooks.abc.tapPromise({
            name: 'tapPromise3',
            context: true,
        }, function (context, param1, param2) {
            return Promise.resolve();
        });

        return this;
    }

    call() {
        let res = this.hooks.abc.call('value1', 'value2');
        console.log('NASA: Test -> call -> res', res);
        return this;
    }

    callAsync() {
        this.hooks.abc.callAsync('value1', 'value2', (err) => {
            console.log('NASA: Test -> callAsync -> err', err);
        });
        return this;
    }

    callPromise() {
        this.hooks.abc.promise('value1', 'value2').then((res) => {
            console.log(res);
        });
        return this;
    }
}

const test = new Test();
test.tap().intercept().call();
// test.intercept().tapAsync().callAsync();
// test.tapPromise().callPromise();
