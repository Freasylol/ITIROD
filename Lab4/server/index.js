const express = require('express');
const usersRouter = require('./routes/users.routes');
const taskGroupRouter = require('./routes/taskGroup.routes');
const taskRouter = require('./routes/task.routes');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('../client'));
app.use(express.json());
app.use(cors());

app.use('/', usersRouter);
app.use('/', taskGroupRouter);
app.use('/', taskRouter);


app.listen(PORT, () =>  console.log(`Server started on ${PORT}`));