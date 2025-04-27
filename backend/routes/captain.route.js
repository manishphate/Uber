const {Router} = require('express');
const { registerCaptain } = require('../controllers/captain.controller');
const router = Router();

router.post('/register',registerCaptain)

module.exports=router