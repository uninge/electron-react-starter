import { Command } from 'commander';
const program = new Command();
import devElectron from './electron/dev';
import buildElectron from './electron/build';
import devWeb from './web/dev';

program.name('@bifrost/deveco').description('CLI to Bifrost').version('0.0.1');

program
  .command('dev')
  .description('')
  .argument('<platform>', '')
  .action((platform, options) => {
    process.env.NODE_ENV = 'development';
    process.env.BABEL_ENV = 'development';

    if (platform === 'electron') {
      import('./electron/dev').then((module) => {
        module.default();
      });
    } else if (platform === 'web') {
      import('./web/dev').then((module) => {
        module.default();
      });
    } else {
      console.log('--->>>dev', platform, options);
    }
  });

program
  .command('build')
  .description('')
  .argument('<platform>', '')
  .action((platform, options) => {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';

    if (platform === 'electron') {
      import('./electron/build').then((module) => {
        module.default();
      });
    } else if (platform === 'web') {
      import('./web/build').then((module) => {
        module.default();
      });
    } else {
      console.log('--->>>build', platform, options);
    }
  });

program.parse();
