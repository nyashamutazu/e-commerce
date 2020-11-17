const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const authMiddleware = require('../middleware/auth');

router.param('id', userController.getUserById);

router.get('/secret/:id', authMiddleware.requireAuth, authMiddleware.isAuthed, (res, req, next) => {

});

module.exports = router;