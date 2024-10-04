const router = require("express").Router();

const hostelRouter = require ("./hostelRouter");
const destinationRouter = require ("./destinationRouter");
const restaurantRouter = require ("./restaurantRouter");
const userRouter = require ("./userRouter");

router.use("/api/v1/hostel", hostelRouter);
router.use("/api/v1/destination", destinationRouter);
router.use("/api/v1/restaurant", restaurantRouter);
router.use("/api/v1/user", userRouter);

module.exports = router;