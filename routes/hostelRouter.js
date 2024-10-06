const router = require('express').Router();
const upload = require ("../middlewares/upload");
const Authenticate = require ("../middlewares/authentication")
const {getAllHostel, createHostel, updateHostel, deleteHostel} = require("../controllers/hostelController")

router.get("/", getAllHostel);
router.post("/create", upload, createHostel);
router.patch("/update/:id",upload, updateHostel);
router.delete("/delete/:id", deleteHostel);

// router.get("/", Authenticate, getAllHostel);
// router.post("/create", Authenticate, upload, createHostel);
// router.patch("/update/:id", Authenticate, upload, updateHostel);
// router.delete("/delete/:id", Authenticate, deleteHostel);

module.exports = router;