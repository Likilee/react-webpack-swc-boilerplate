const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const port = process.env.PORT || 3000;

module.exports = {
  mode: "development", // 개발환경
  entry: "./src/index.tsx", // 애플리케이션 시작 경로
  // 번들링된 파일을 저장할 경로
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  // 로더 설정
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // exclude: /.yarn/,
        use: {
          loader: "swc-loader",
          options: {
            sync: true,
            jsc: {
              parser: {
                syntax: "typescript",
              },
            },
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 커스텀 템플릿 파일을 로드합니다.
    }),
    new ProvidePlugin({
      React: "react",
    }),
  ],
  devServer: {
    host: "localhost", // 개발 서버의 URL을 설정합니다.
    port: port, // 기본 값은 3000번 입니다.
    open: true, // 개발 서버를 실행하면 자동으로 웹 브라우저를 엽니다.
  },
};
