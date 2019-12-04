module.exports = {
    devServer : {
        // 自动打开浏览器
        open:true,
        port:8878
    },
    chainWebpack: config => {
        config.module
            .rule("eslint")
            .use("eslint-loader")
            .loader("eslint-loader")
            .tap(options => {
            options.fix = true;
            return options;
            })
        }
}
