const program = require('commander')
const api = require('./index')

program
  .option('-x, --xxx', 'what the fuck')

program
  .command('add <taskName...>')
  .description('add a task')
  .action(function (taskName) {
    taskName.forEach((task) => {
      api.add(task)
    });
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear()
  })

program.parse(process.argv);

const options = program.opts();
