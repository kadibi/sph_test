module.exports = {
    // 关闭eslint校验工具
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^api': '' }
            },
        },
    },
}
