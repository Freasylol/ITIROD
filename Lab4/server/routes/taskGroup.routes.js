const Router = require('express');
const taskGroupController = require('../controllers/taskGroup.controller');

const router = new Router();

router.post('/taskGroup', taskGroupController.createTaskGroup);
router.get('/taskGroup', taskGroupController.getTaskGroups);
router.get('/taskGroup/:id', taskGroupController.getOneTaskGroup);
router.put('/taskGroup/:id', taskGroupController.updateTaskGroup);
router.delete('/taskGroup/:id', taskGroupController.deleteTaskGroup);

module.exports = router;