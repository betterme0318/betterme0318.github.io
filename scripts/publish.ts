import execa from 'execa';

const publish = async () => {
  console.log('正在push代码')
  await execa('git', ['add', '.'])
  await execa('git', ['commit', '-m', 'update'])
  await execa('git', ['push'])

  console.log('正在发包')
  await execa('tnpm', ['publish', '--tag', 'beta']).stdout.pipe(process.stdout)
}

publish()