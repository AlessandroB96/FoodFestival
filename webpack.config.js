const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = { 

    entry: {
        app: './assets/js/script.js', //bundle file of script.js is app.bundle.js
        events: './assets/js/events.js', //bundle file of events.js is events.bundle.js
        schedule: './assets/js/schedule.js', //bundle file of schedule.js is schedule.bundle.js
        tickets: './assets/js/tickets.js' //bundle file of tickets.js is tickets.bundle.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',  //the name of each attribute in the entry object will be used in place of [name]
    },
    module: {     //module property is where loaders are configured 
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../","/assets/")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ] 
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", //report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
};