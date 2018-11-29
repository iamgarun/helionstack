module.exports = {
  egg: true,
  framework: 'react',
  // devtool: 'source-map',
  entry: {
    home: 'app/web/page/home/index.jsx',
    layout: 'app/web/framework/layout/index.js',
  },
  alias: {
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store',
  },
  dll: ['react', 'react-dom'],
  loaders: [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: ['babel-loader'],
    },
  ],
  plugins: {},
  module: {},
  done() {
    console.log('---webpack compile finish---');
  },
};
