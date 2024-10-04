const router = require('express').Router();
const upload = require ("../middlewares/upload");
const { getAllRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } = require ("../controllers/restaurantController");
const authentication = require('../middlewares/authentication');

// router.get ("/", getAllRestaurant);
// router.post ("/create", upload,createRestaurant);
// router.patch ("/update/:id", upload, updateRestaurant);
// router.delete ("/delete/:id", deleteRestaurant);

router.get ("/", authentication, getAllRestaurant);
router.post ("/create", authentication, upload,createRestaurant);
router.patch ("/update/:id", authentication, upload, updateRestaurant);
router.delete ("/delete/:id", authentication, deleteRestaurant);

module.exports = router;