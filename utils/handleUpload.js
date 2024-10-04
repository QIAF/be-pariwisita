const imageKit = require('../libs/imageKit');

const handleUploadImage = async (file) => {
	let imagesUrl = [];
	let imagesId = [];

	await Promise.all(
    
		file.map(async (file) => {
			const split = file.originalname.split('.');
			const extension = split[split.length - 1];

			const uploadedImage = await imageKit.upload({
				file: file.buffer,
				fileName: `user-${Date.now()}.${extension}`,
				folder: "Database",
			});
      // console.log(uploadedImage);


			imagesUrl.push(uploadedImage.url);
			imagesId.push(uploadedImage.fileId);
		})
	);

	return { imagesUrl, imagesId };
};

module.exports = handleUploadImage;


