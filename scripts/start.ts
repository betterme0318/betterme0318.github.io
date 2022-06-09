import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getConfig from './webpack/config';
import getPort from 'get-port';
import Koa from 'koa';
import Router from 'koa-router';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { getBuilderConfigs } from './webpack/config';

const getDevServerConfigs = async () => {
  const { cwd } = getBuilderConfigs()
  const DEV_SERVER: WebpackDevServer.Configuration = {
    allowedHosts: 'all',
    hot: true,
    open: ['index.html'],
    host: '127.0.0.1',
    port: await getPort({ port: 3008 }),
    webSocketServer: 'sockjs',
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    static: [
      path.resolve(__dirname, '../lib'),
      path.resolve(cwd, './build')
    ]
  }
  return DEV_SERVER
}

const start = async () => {
  const compiler = webpack(await getConfig())
  const devConfigs = await getDevServerConfigs()
  const server = new WebpackDevServer(devConfigs, compiler)

  server.startCallback(() => {
    console.log(
      `Starting server on http://${devConfigs.host}:${devConfigs.port}`
    )
  })
}

start()