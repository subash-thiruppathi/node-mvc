const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/taskControllers');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', taskController.getTasks);
app.post('/add', taskController.addTask);
app.post('/delete', taskController.deleteTask);
app.post('/delete/:id', taskController.deleteTask);
app.post('/complete/:id', taskController.markComplete);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
