const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const imageController = require('../controllers/image.controller');
const uploadfile = require('../middleware/multer.middleware');


const router = express.Router();

router.get('/:id', authMiddleware.authenticate, userController.getUser);
router.post('/search', authMiddleware.authenticate,userController.searchUser);
router.post('/upload', uploadfile.single("img"),imageController.uploadimg);

module.exports = router;