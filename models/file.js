const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    emails:{
        type:String,
    }
});


//post middleware
fileSchema.post("save", async function(doc){
    try{

        console.log("kiugill",doc);

        //transpoter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });
        //send mail
         let info = await transporter.sendMail({
            from:`codehelp`,
            to:doc.emails,
            subject:"file uploaded",
            html:`<h2>hello jee</h2> <p>fileiploaded</p>`
         })
         console.log("Message sent: %s", info);


    }catch(err){
        console.log(err);
    }
})


const File = mongoose.model("File", fileSchema);
module.exports = File;