const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const authMiddleware = require('../middleware/auth');

router.param('/id', userController.getUserById);

router.get('/:id', authMiddleware.requireAuth, authMiddleware.isAuthed, userController.getUser);

router.put('/:id', authMiddleware.requireAuth, authMiddleware.isAuthed, userController.putUser);

module.exports = router;