const {Router} = require('express');
const { registerCaptain, loginCaptain } = require('../controllers/captain.controller');
const router = Router();

router.post('/register',registerCaptain)
router.get('/login',loginCaptain)

module.exports=router