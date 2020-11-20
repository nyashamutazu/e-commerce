const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const indexValidation = require('../validator/index')

router.get('/sign-out', authController.getUserSignOut);

router.post('/sign-up', indexValidation.userSignupValidator , authController.postUserSignUp);
router.post('/sign-in', authController.postUserSignIn)

module.exports = router;