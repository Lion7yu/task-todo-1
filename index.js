const program = require('commander')

program
  .option('-x, --xxx', 'what the fuck')

program
  .command('add <taskName...>')
  .description('add a task')
  .action(function (taskName) {
    taskName.forEach((task) => {
      console.log('task %s', task);
    });
  });

  program
  .command('clear')
  .description('clear all tasks')
  .action(function (taskName) {
    taskName.forEach((task) => {
      console.log('this is clear');
    });
  });

program.parse(process.argv);

const options = program.opts();
console.log(options.xxx);