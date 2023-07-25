const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());


const fileUpload = require('express-fileupload');
app.use(fileUpload(
    {useTempFiles:true,
    tempFileDir: '/tmp/'}
));  //middleware

const db = require('./config/database');
db.connect();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


const Upload = require('./Routes/routes');
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//create a log in function
