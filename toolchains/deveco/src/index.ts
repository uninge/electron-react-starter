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
  .option('--watch', '')
  .action((platform, options) => {
    if (platform === 'electron') {
      devElectron();
    } else if (platform === 'web') {
      devWeb();
    } else {
      console.log(platform, options);
    }
  });

program
  .command('build')
  .description('')
  .argument('<platform>', '')
  .action((str, options) => {
    console.log(str, options);
    buildElectron();
  });

program.parse();
