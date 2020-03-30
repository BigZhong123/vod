module.exports = {
  publicPath: './',
  // 全局引入scss文件
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/global.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      "/res": {
        target: "http://101.133.165.169:8000", // 要请求的后台地址
        ws: true,    // 启用websockets
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/res": "/api"  // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      }
    }
  }
}