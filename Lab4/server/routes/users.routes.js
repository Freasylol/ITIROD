const Router = require('express');
const UsersController = require('../controllers/users.controller');

const router = new Router();

router.post('/users', UsersController.createUser);
router.get('/users', UsersController.getUsers);
router.get('/users/:id', UsersController.getOneUser);
router.put('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.deleteUser);

module.exports = router;