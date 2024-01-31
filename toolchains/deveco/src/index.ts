import { Command } from 'commander';
const program = new Command();

program.name('@bifrost/deveco').description('CLI to Bifrost').version('0.0.1');

program
  .command('dev')
  .description('')
  .argument('<platform>', '')
  .option('--watch', '')
  .action((str, options) => {
    console.log(str, options);
  });

program.parse();
