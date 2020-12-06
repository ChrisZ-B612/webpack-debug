//载入webpack主体
let webpack = require('webpack');
//指定webpack配置文件
let config = require("../config/webpack.dev.js");
//执行webpack，返回一个compile的对象，这个时候编译并未执行
let compiler = webpack(config);
//运行compile，执行编译
compiler.run((err, stats) => {
    if (err) {
        console.error(err);
    } else {
        console.log(stats);
    }
});