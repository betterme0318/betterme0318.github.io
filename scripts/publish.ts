import execa from 'execa';

const publish = async () => {
  console.log('正在push代码')
  await execa('git', ['add', '.'])
  await execa('git', ['commit', '-m', 'update'])
  await execa('git', ['push'])
}

publish()