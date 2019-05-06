const path = require('path');
const webpack = require('webpack');

//#region Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//#endregion

/* --- Configuration var ---*/
const config = {
    context: path.resolve(process.cwd(), 'src'),
    entry: {
        bundle:[ 
            '@babel/polyfill',
            './index.js',
            './main.scss'
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: [ '.js', '.jsx', '.json', '.jpg', '.css', '.scss' ]
    },
    
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use:{ 
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-react', '@babel/preset-env'] 
                    }
                },
                exclude: /node_modules/
            },

            {
                test: /\.(less)$/,
                use: [{
                  loader: 'style-loader' // creates style nodes from JS strings
                }, {
                  loader: 'css-loader' // translates CSS into CommonJS
                }, {
                  loader: 'less-loader' // compiles Less to CSS
                }]},

            /* --- scss ---*/
            {
                test: /\.s?css/,
                use: ExtractTextPlugin.extract({
                    use:[
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true}
                        }
                    ],
                    fallback: 'style-loader',
                })
            },

            /* --- Image ---*/
            {
                test:/\.(png|gif|jpe?g)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[path][name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },

            /* --- fonts --- */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[path][name].[ext]'
                        }
                    }
                ]
            },

            /* --- svg --- */
            {
                test: /\.svg/,
                loader: 'svg-url-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        overlay: true,
        contentBase: './dist',
        historyApiFallback: true
    },
    
    plugins:[
        new ExtractTextPlugin(
            './css/[name].css'
        ),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!**.html'],
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: './images', 
                    to: 'images'
                },
            ],
            {
                ignore:[
                    {
                        glob:'svg/*'
                    }
                ]
            }
        ),

        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)$/
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
};

module.exports = config;
