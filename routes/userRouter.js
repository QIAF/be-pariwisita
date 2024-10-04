const router = require('express').Router();
const authentication = require ("../middlewares/authentication");
const {login, register} = require ("../controllers/userController");

router.post ( "/login", login)
router.post ( "/register", register)
module.exports = router;