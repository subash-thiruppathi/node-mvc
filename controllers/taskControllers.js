
const taskModel = require('../models/task');
const fs = require('fs');
const path = require('path');
const tasksPath = path.join(__dirname, '../models/tasks.json');

module.exports = {
  getTasks: (req, res) => {
    const tasks = taskModel.getAll();
    res.render('index', { layout: false, tasks }); 
  },

  addTask: (req, res) => {
    const tasks = require(tasksPath);
    const newTask = {
      id: Date.now(),
      name: req.body.task
    }
    tasks.push(newTask);
    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
    res.redirect('/');
  },
  deleteTask: (req, res) => {
    console.log(req.params.id);
    console.log(req.body.id);
    const tasks = require(tasksPath);
    const updatedTasks = tasks.filter(task => task.id != req.params.id);
    fs.writeFileSync(tasksPath, JSON.stringify(updatedTasks, null, 2));
    res.redirect('/');
  },
  markComplete : (req, res) => {
    const { id } = req.params;
    taskModel.toggleComplete(id);
    res.redirect('/');
  }
};
