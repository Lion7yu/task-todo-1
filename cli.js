const { parseAsync } = require('commander');
const program = require('commander')
const api = require('./index')
program
  .option('-x, --xxx', 'what the fuck')

program
  .command('add <taskName...>')
  .description('add a task')
  .action(function (taskName) {
    taskName.forEach((task) => {
      api.add(task).then(() => { console.log('添加成功') }, () => { console.log('添加失败') })
    });
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => { console.log('清除完毕') }, () => { console.log('清除失败') })
  })

program
  .command('showAll')
  .description('show all tasks')
  .action(() => {
    api.showAll()
  })

program.parse(process.argv)

const options = program.opts();

