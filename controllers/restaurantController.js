const { Restaurant } = require("../models");
const ApiError = require("../utils/apiError");
const handleUploadImage = require("../utils/handleUpload");

const getAllRestaurant = async (req, res, next) => {
  try {
    const allRestaurant = await Restaurant.findAll();
    res.status(200).json({
      status: "Success",
      message: "All Restaurants successfully retrieved",
      requestAt: req.requestTime,
      data: allRestaurant,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const createRestaurant = async (req, res, next) => {
  try {
    const { name, price, location, dish, rating } = req.body;
    console.log(req.body);

    const files = req.files;
    console.log(req.files);

    if (!files || !files.restaurant_picture) {
      return next(new ApiError("No file uploaded", 422));
    }
    const restaurantPicture = await handleUploadImage(files.restaurant_picture);
    const data = {
      name,
      price,
      location,
      dish,
      rating,
      restaurant_picture: restaurantPicture.imagesUrl,
    };
    const newRestaurant = await Restaurant.create(data);
    res.status(200).json({
      status: "Success",
      message: "Restaurant successfully created",
      data: newRestaurant,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, location, dish, rating } = req.body;
    const files = req.files;
    const image = files.restaurant_picture;
    if (!image) {
      return next(new ApiError("No file uploaded", 422));
    }

    const findRestaurant = await Restaurant.findOne({
      where: {
        id,
      },
    });
    if (!findRestaurant) {
      return next(new ApiError(`Restaurant with id '${id}' is not found`, 404));
    }
    const restaurantPicture = await handleUploadImage(image);
    await Restaurant.update(
      {
        name,
        price,
        location,
        dish,
        rating,
        restaurant_picture: restaurantPicture.imagesUrl,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Restaurant successfully uploaded",
      data: {
        name: name,
        price: price,
        location: location,
        dish: dish,
        rating: rating,
        rating_picture: restaurantPicture.imagesUrl,
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const deleteRestaurant = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findRestaurant = await Restaurant.findByPk(id);
    if (!findRestaurant) {
      return next(new ApiError(`Restaurant with id '${id}' not found`));
    }
    await Restaurant.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Hotel successfully deleted",
      requestAt: req.requestTime,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getAllRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
