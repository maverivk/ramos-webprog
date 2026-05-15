const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);      // /api/users
router.route('/:id').put(updateUser).delete(deleteUser); // /api/users/:id
router.post('/login', loginUser);                     // /api/users/login

module.exports = router;