const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  //读取之前的任务
  const list = await db.read()
  //往里面添加一个 title 任务
  list.push({ title, done: false })
  //存储任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}

function updateTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: "新的标题",
    default: '原：' + list[index].title
  }).then(answer => {
    list[index].title = answer.title
    db.write(list)
  })
}

function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}

function askForAction(list, index) {
  const actions = {
    markAsUndone,
    markAsDone,
    updateTitle,
    remove,
  }
  inquirer.prompt({
    type: 'list', name: 'action',
    message: '请选择操作',
    choices: [
      { name: '已完成', value: 'markAsDone' },
      { name: '未完成', value: 'markAsUndone' },
      { name: '修改标题', value: 'updateTitle' },
      { name: '删除任务', value: 'remove' },
      { name: '退出', value: 'remove' }
    ]
  }).then(answer2 => {
    const action = actions[answer2.action]
    action && action(list, index)
  })
}

function askForCreateTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: "输入要添加的任务",
  }).then(answer => {
    list.push({
      title: answer.title,
      done: false
    })
    db.write(list)
  })
}

function printTask(list) {
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [{ name: '+ 创建新任务', value: '-2' }, ...list.map((task, index) => {
        return { name: `${task.done ? '[√]' : '[_]'} ${index + 1} - ${task.title}`, value: index }
      }), { name: '退出', value: '-1' }]
    })
    .then((answer) => {
      const index = parseInt(answer.index)
      if (answer.index >= 0) {
        //选中了一个任务
        askForAction(list, index)
      }
      else if (index === -2) {
        //创建任务
        askForCreateTask(list)
      }
    });
}

module.exports.showAll = async () => {
  //读取之前的任务
  const list = await db.read()
  //打印之前的任务
  //printTasks
  printTask(list)
}