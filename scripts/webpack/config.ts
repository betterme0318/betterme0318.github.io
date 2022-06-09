
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import getPort from 'get-port';

export interface IBuilderExternals {
  name: string
  root: string
  path: string
  entry: string
  version?: string
}

export interface IBuilderConfig {
  cwd: string
  outputDir: string
}

export const getBuilderConfigs = (): IBuilderConfig => {
  return {
    cwd: process.cwd(),
    outputDir: 'build',
  }
}


export interface IConfigContext {
  isProd?: boolean
}

export default async (context: IConfigContext = { isProd: false }) => {
  const { isProd } = context
  const analyzerPort = await getPort()
  const entries: webpack.EntryObject = {}
  const configs = getBuilderConfigs()
  const { cwd, outputDir } = configs
  
  const webpackConfig: webpack.Configuration = {
    entry: {
      index: {
        import: path.resolve(cwd, 'src/index.tsx'),
      }
    },
    stats: {
      colors: true,
    },
    devtool: isProd ? false : "eval-cheap-module-source-map",
    mode: isProd ? "production" : "development",
    output: {
      path: path.resolve(cwd, outputDir),
      filename: '[name].js',
      clean: true,
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: require.resolve('css-loader') },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: () => autoprefixer(),
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                javascriptEnabled: true,
              }
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: ['url-loader'],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  }

  if (!isProd) {
    webpackConfig.plugins = (webpackConfig.plugins || []).concat(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
      }),
    )
  }
  return webpackConfig
}