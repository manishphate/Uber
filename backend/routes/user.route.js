const {Router} = require('express')
const router = Router();
const {registerUser}=require('../controllers/user.controller.js')

router.post('/register',registerUser)

module.exports = router