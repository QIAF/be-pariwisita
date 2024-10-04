const router = require('express').Router();
const upload = require ("../middlewares/upload");
const { getAllRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } = require ("../controllers/restaurantController");

router.get ("/", getAllRestaurant);
router.post ("/create", upload,createRestaurant);
router.patch ("/update/:id", upload, updateRestaurant);
router.delete ("/delete/:id", deleteRestaurant);

module.exports = router;