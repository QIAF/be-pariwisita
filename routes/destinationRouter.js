const router = require('express').Router();
const upload = require ("../middlewares/upload");
const Authenticate = require ("../middlewares/authentication")
const {getAllDestination, createDestination, updateDestination, deleteDestination} = require ("../controllers/destinationController");

// router.get ("/", getAllDestination);
// router.post ("/create", upload, createDestination);
// router.patch ("/update/:id", upload, updateDestination);
// router.delete ("/delete/:id", deleteDestination);

router.get ("/", Authenticate, getAllDestination);
router.post ("/create",  Authenticate, upload, createDestination);
router.patch ("/update/:id",  Authenticate, upload, updateDestination);
router.delete ("/delete/:id",  Authenticate, deleteDestination);

module.exports = router;