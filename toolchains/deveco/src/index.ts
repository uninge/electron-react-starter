import { Command } from 'commander';
const program = new Command();
import devElectron from './electron/dev';
import buildElectron from './electron/build';

program.name('@bifrost/deveco').description('CLI to Bifrost').version('0.0.1');

program
  .command('dev')
  .description('')
  .argument('<platform>', '')
  .option('--watch', '')
  .action((str, options) => {
    console.log(str, options);
    devElectron();
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
