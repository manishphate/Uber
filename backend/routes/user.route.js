const {Router} = require('express')
const router = Router();
const {registerUser, loginUser, getProfile, logoutUser}=require('../controllers/user.controller.js');
const Auth = require('../middlewares/auth.middleware.js');

router.post('/register',registerUser)
router.get('/login',loginUser)
router.get('/profile',Auth,getProfile)

router.get('/logout',Auth,logoutUser)

module.exports = router