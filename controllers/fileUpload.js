const File = require('../models/file');
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try{

         const file= req.files.file;
         console.log("File aa gyi ",file);


         let path = __dirname + '/uploads/' + Date.now() +`.${file.name.split('.')[1]}`;    

         console.log("Path is "+path);

         file.mv(path,(err)=>{console.log(err)});

         res.json({
            success: true,
            message: 'File uploaded!',
         });


    }catch(err){
        console.log(err);

    }
}


function isFileTypeSupported(type, SupportedTypes) {
    return SupportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder,quality) {

    const options = {folder}

    if(quality){
        options.quality = quality;
    }
    console.log(file.tempFilePath);
    options.resource_type = "auto";
    
    return await cloudinary.uploader.upload(file.tempFilePath,options);}



exports.ImageUpload = async (req, res) => {
    try{
        //data fetch

        const{name,tags,emails}=req.body;
        console.log(name,tags,emails);


        const file= req.files.ImageFile;

        console.log("ImageFile aa gyi ",file);

        //validation
        const SupportedTypes = ["jpeg","jpg","png"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,SupportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported"
            });
        }

        //upload to cloudinary
        const response= await uploadToCloudinary(file,"RanaImages");
        console.log("response");
        console.log(response);


        //db save

        const fileData = await File.create({
            name,
            tags,
            emails,
            imageUrl:response.secure_url,});
            
           res.json({
            success: true,
            imageUrl:response.secure_url,
            message: 'File uploaded!',});











    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message: "something went wrong",})

    }
}



//video upload

exports.videoUpload= async (req,res)=>{
    try{


        const{name,tags,emails}=req.body;
        console.log(name,tags,emails);


        const file= req.files.videoFile;

        console.log("videoFile aa gyi ",file);

        //validation
        const SupportedTypes = ["mp4","mov"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,SupportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported"
            });
        }
        console.log("File type supported");

        const response= await uploadToCloudinary(file,"RanaImages");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            emails,
            imageUrl:response.secure_url,});
            
            res.json({
                success: true,
                imageUrl:response.secure_url,
                message: 'File uploaded!',});


    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message: "something went wrong",})
    }
}



//image reducer

exports.imageReducer= async (req,res)=>{
    try{

       //data fetch

       const{name,tags,emails}=req.body;
       console.log(name,tags,emails);


       const file= req.files.ImageFile;

       console.log("ImageFile aa gyi ",file);

       //validation
       const SupportedTypes = ["jpeg","jpg","png"];

       const fileType = file.name.split('.')[1].toLowerCase();

       if(!isFileTypeSupported(fileType,SupportedTypes)){
           return res.status(400).json({
               success:false,
               message: "File type not supported"
           });
       }

       //upload to cloudinary
       const response= await uploadToCloudinary(file,"RanaImages",20);
       console.log("response");
       console.log(response);


       //db save

       const fileData = await File.create({
           name,
           tags,
           emails,
           imageUrl:response.secure_url,});
           
          res.json({
           success: true,
           imageUrl:response.secure_url,
           message: 'File uploaded!',});




    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message: "something went wrong",})
    }
}