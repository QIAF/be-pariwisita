const router = require('express').Router();
const upload = require ("../middlewares/upload");
const Authenticate = require ("../middlewares/authentication")
const {getAllHostel, createHostel, updateHostel, deleteHostel} = require("../controllers/hostelController")

router.get("/", Authenticate, getAllHostel);
router.post("/create", Authenticate, upload, createHostel);
router.patch("/update/:id",upload, updateHostel);
router.delete("/delete/:id", deleteHostel);

module.exports = router;