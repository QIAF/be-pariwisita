const router = require('express').Router();
const upload = require ("../middlewares/upload");
const Authenticate = require ("../middlewares/authentication")
const {getAllDestination, createDestination, updateDestination, deleteDestination} = require ("../controllers/destinationController");

router.get ("/", Authenticate, getAllDestination);
router.post ("/create", upload, Authenticate, createDestination);
router.patch ("/update/:id", upload, updateDestination);
router.delete ("/delete/:id", deleteDestination);

module.exports = router;