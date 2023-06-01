const Router = require('express');
const UsersController = require('../controllers/users.controller');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/users', UsersController.createUser);
router.get('/users', UsersController.getUsers);
router.get('/users/:id', UsersController.getOneUser);
router.put('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.deleteUser);
router.post('/users/reg', UsersController.registration);
router.post('/users/login', UsersController.login);
router.get('/auth', authMiddleware, usersController.check)
// router.post('/api/sendemail', usersController.sendEmail);

module.exports = router;