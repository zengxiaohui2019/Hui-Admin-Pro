module.exports = {
    publicPath: "./", // ./相对路径
    productionSourceMap: false,// 打包时不生成.map文件
    // 这里写你调用接口的基础路径，来解决跨域
    devServer: {
        open: true,
        proxy: {
            '/dev-api': {
                target: 'https://www.fastmock.site/mock/8b8187de5502cc6a522b78638621c2c4/HuiAdmin/',
                pathRewrite: { '^/dev-api': '' }
            }
        }
    }
}
