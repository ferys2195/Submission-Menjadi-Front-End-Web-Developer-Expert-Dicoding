const path = require('path');
const { merge } = require('webpack-merge');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: './sw.bundle.js',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      fingerprints: false,
      id: 'indoresto-pwa-v1',
      name: 'Indoresto',
      short_name: 'Indoresto',
      theme_color: '#459f2e',
      background_color: '#EEEEEE',
      start_url: 'index.html',
      display: 'standalone',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/public/icons/icon-512x512.png'),
          destination: path.join('icons'),
          purpose: 'maskable any',
          sizes: [48, 72, 96, 128, 144, 152, 192, 256, 284, 384, 512], // multiple sizes
        },
      ],
    }),
  ],
});
