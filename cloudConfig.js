const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

//configuring(integrating) cloudinary account with our backend
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

//defining cloudinary storage (folderName,file format) on our cloudinary account to store our file 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderLust_DEV',
    allowedFormats:["png","jpg","jpeg"],
  },
});

module.exports={cloudinary,storage};

