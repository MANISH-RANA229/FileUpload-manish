const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect =() => {
    try{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret:process.env.CLOUDINARY_SECRET,
    
    })
}catch(err){
    console.log(err);
    process.exit(1);
}
    
    
    }