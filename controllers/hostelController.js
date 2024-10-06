const { Hostel } = require("../models");
const ApiError = require("../utils/apiError");
const handleUploadImage = require("../utils/handleUpload");

const getAllHostel = async (req, res, next) => {
  try {
    const allHostel = await Hostel.findAll();
    res.status(200).json({
      status: "Success",
      message: "All Hostels successfully retrieved",
      requestAt: req.requestTime,
      data: allHostel,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const createHostel = async (req, res, next) => {
  try {
    const { name, price, facility, location, rating } = req.body;
    const files = req.files;
    console.log(req.files);
    if (!files || !files.hostel_picture) {
      return next(new ApiError("No file uploaded", 422));
    }
    const hostelPicture = await handleUploadImage(files.hostel_picture);
    const data = {
      name,
      price,
      facility,
      location,
      rating,
      hostel_picture: hostelPicture.imagesUrl,
    };
    const newHostel = await Hostel.create(data);
    console.log("data", newHostel);

    res.status(201).json({
      status: "Success",
      message: "Hostel created successfully",
      data: newHostel,
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const updateHostel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, facility, location, rating } = req.body;
    console.log(req.body);

    const files = req.files;

    const image = files.hostel_picture;
    console.log(image);

    if (!image) {
      return next(new ApiError("No file uploaded", 422));
    }

    const findHostel = await Hostel.findOne({
      where: {
        id,
      },
    });
    if (!findHostel) {
      return next(new ApiError(`Hostel with id '${id}' is not found`, 404));
    }

    const hostelPicture = await handleUploadImage(image);

    await Hostel.update(
      {
        name,
        price,
        facility,
        location,
        rating,
        hostel_picture: hostelPicture.imagesUrl,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Hostel successfully updated",
      data: {
        name: name,
        price: price,
        facility: facility,
        location: location,
        rating: rating,
        hostel_picture: hostelPicture.imagesUrl,
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const deleteHostel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findHostel = await Hostel.findByPk(id);
    if (!findHostel) {
      return next(new ApiError(`Hostel with id '${id}' not found`));
    }
    await Hostel.destroy({
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
  getAllHostel,
  createHostel,
  updateHostel,
  deleteHostel,
};
