import webpack from 'webpack';
import getConfigs, { getBuilderConfigs } from './webpack/config';

const build = async () => {
  await new Promise(async (resolve, reject) => {
    webpack(await getConfigs({ isProd: true }), (err, stats) => {
      if (err || stats.hasErrors()) {
        process.stdout.write(stats.toString({ colors: true }) + '\n')
        return reject(err)
      }
      process.stdout.write(stats.toString({ colors: true }) + '\n')
      resolve(1)
    })
    
  })
}


build()