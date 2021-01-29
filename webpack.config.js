const path = require('path');
const { WebpackPluginServe } = require("webpack-plugin-serve");

module.exports = (env = "production") => {
    console.log(env)
    return {
        watch: env.development,
        mode: "none",
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.glsl$/i,
                    use: 'raw-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.glsl'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new WebpackPluginServe({
                port: process.env.PORT || 8080,
                static: "./dist",
                liveReload: true,
                waitForBuild: true,
            }),
        ],
    }
};