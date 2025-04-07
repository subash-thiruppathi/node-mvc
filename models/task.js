const fs = require('fs');
const path = require('path');
const tasksPath = path.join(__dirname, '../models/tasks.json');


let tasks =  fs.readFileSync(tasksPath, 'utf-8');
tasks = JSON.parse(tasks);

function saveTasks() {
  fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
}

module.exports = {
  getAll: () => tasks,

  add: (task) => {
    tasks.push({ id: Date.now(), name: task });
    saveTasks();
  },

  delete: (id) => {
    tasks = tasks.filter(task => task.id !== parseInt(id));
    saveTasks();
  },
  toggleComplete: (id) => {
    tasks = tasks.map(task => {
      if (task.id === parseInt(id)) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    saveTasks();
  }
  
};
