const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/authcheck', authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Authenticated'
    });
});

module.exports = router;