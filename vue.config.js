module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'examples/dist',
  publicPath: './',
  // -----     android     -----
  // publicPath: 'file:///android_asset/www/dist/',
  pages: {
    index: {
      // entry for the page
      entry: 'examples/src/main.js',
      // the source template
      template: 'examples/public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Documentación DvFileUpload'
    }
  }
}