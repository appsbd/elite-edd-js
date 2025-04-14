const path = require("path");
const devServer=require("./appsbd_get_proxy");

console.log("Proxy Server:"+devServer.proxy);
const plugins=[];
/*if(process.env.NODE_ENV === 'production'){
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  plugins.push(new BundleAnalyzerPlugin());
}*/

module.exports = {
  devServer: {
    proxy:'http://localhost/Projects/edd/'
  },
  outputDir: path.resolve(__dirname, "../../assets/"),
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:'',
  filenameHashing: false,
  css: {
    extract: (process.env.NODE_ENV === 'development' ? false : {
      filename: 'css/style.css',
    }),
    sourceMap: process.env.NODE_ENV === 'development'
  },

  configureWebpack: {
    output: {
      filename: 'js/script.js',
      //chunkFilename: 'js/[name].js'
    },
    optimization: {
      splitChunks: false
    },
    plugins: plugins
  },

}
