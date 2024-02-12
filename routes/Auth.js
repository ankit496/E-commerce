const express = require('express');
const { createUser, loginUser,  checkAuth, resetPasswordRequest,resetPassword,logout } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();
//  /auth is already added in base path
router.post('/signup', createUser)
router.post('/login', passport.authenticate('local'), loginUser)
router.get('/check',passport.authenticate('jwt'), checkAuth)
router.post('/reset-password-request',resetPasswordRequest)
router.post('/reset-password',resetPassword)
router.get('/logout',logout)
exports.router = router;
