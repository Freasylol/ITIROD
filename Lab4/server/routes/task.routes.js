const Router = require('express');
const taskController = require('../controllers/task.controller');

const router = new Router();



router.post('/task', taskController.createTask);
router.get('/task', taskController.getTask);
router.get('/task/:id', taskController.getOneTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;