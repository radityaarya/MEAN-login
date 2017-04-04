const router = require('express').Router();
const controller = require('../../controllers/users.controller')

router.get('/', controller.getAllUser)
router.post('/', controller.createUser)