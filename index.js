const program = require('commander')

program
  .option('-x, --xxx', 'what the fuck')

program
  .command('add task')
  .description('add a task')
  .action(() => {
    console.log('hi');
  });

program.parse(process.argv);

const options = program.opts();
console.log(options.xxx);