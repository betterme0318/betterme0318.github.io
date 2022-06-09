import { copySync } from 'fs-extra';
import path from 'path';

const cwd = process.cwd()
copySync(path.resolve(cwd, 'build/index.html'), path.resolve(cwd, 'index.html'))