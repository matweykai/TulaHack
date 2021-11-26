let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: '/dist/'
	},
	devServer: {
		overlay: true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.module\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						loader: 'css-loader',
						options: {
							//importLoaders: 2,
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					}
				]
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: [
				{
				  loader: 'url-loader',
				  options: {
					limit: 10000
				  }
				}
			  ]
			},
			{
				test: /^((?!\.module).)*css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [ 
		new MiniCssExtractPlugin({
			filename: 'main.css'
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
};

module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	conf.devtool = isProd ? 'source-map' : 'eval-cheap-module-source-map';
	conf.target = isProd ? 'browserslist' : 'web';
	return conf;
}