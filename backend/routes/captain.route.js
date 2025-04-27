const {Router} = require('express');
const { registerCaptain, loginCaptain, profileCaptain, logoutCaptain } = require('../controllers/captain.controller');
const Auth = require('../middlewares/auth.middleware');
const router = Router();

router.post('/register',registerCaptain)
router.get('/login',loginCaptain)
router.get('/profile',Auth,profileCaptain)
router.get('/logout',Auth,logoutCaptain)

module.exports=router