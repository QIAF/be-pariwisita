const { Destination } = require("../models");
const ApiError = require("../utils/apiError");
const handleUploadImage = require("../utils/handleUpload");

const getAllDestination = async (req, res, next) => {
  try {
    const getAllDestination = await Destination.findAll();
    res.status(200).json({
      status: "Success",
      message: "All Destinations successfully retrieved",
      requestAt: req.requestTime,
      data: getAllDestination,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const createDestination = async (req, res, next) => {
  try {
    const { name, price, description, category, location, rating } = req.body;
    const files = req.files;
    console.log(req.files);
    if (!files || !files.destination_picture) {
      return next(new ApiError("No file uploaded", 422));
    }
    const destinationPicture = await handleUploadImage(
      files.destination_picture
    );
    const data = {
      name,
      price,
      description,
      category,
      location,
      rating,
      destination_picture: destinationPicture.imagesUrl,
    };
    const newDestination = await Destination.create(data);
    res.status(201).json({
      status: "Success",
      message: "Destination created successfully",
      data: newDestination,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const updateDestination = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, description, category, location, rating } = req.body;
    const files = req.files;

    const image = files.destination_picture;
    console.log(image);
    if (!image) {
      return next(new ApiError("No file uploaded", 422));
    }
    const findDestination = await Destination.findOne({
      where: {
        id,
      },
    });
    if (!findDestination) {
      return next(new ApiError(`Hostel with id '${id}' is not found`, 404));
    }
    const destinationPicture = await handleUploadImage(image);

    await Destination.update({
      name,
      price,
      description,
      category,
      location,
      rating,
      destination_picture: destinationPicture.imagesUrl,
    },{
        where: {
          id,
        },
      });
      res.status (200).json({
        status: "Success",
        message: "Destination successfully updated",
        data: {
            name: name,
            price: price,
            description: description,
            category: category,
            location: location,
            rating: rating,
            destination_picture: destinationPicture.imagesUrl
        }
      })
  } catch (err) {
     return next(new ApiError(err.message, 400));
  }
};

const deleteDestination = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findDestination = await Destination.findByPk(id);
    if (!findDestination) {
      return next(new ApiError(`Destination with id '${id}' not found`));
    }
    await Destination.destroy({
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
    getAllDestination,
    createDestination,
    updateDestination,
    deleteDestination
}