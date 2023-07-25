const express = require('express');
const router = express.Router();

const {localFileUpload,ImageUpload,videoUpload,imageReducer}= require('../controllers/fileUpload');

//apiroute

router.post('/localFileUpload', localFileUpload);
router.post('/ImageUpload', ImageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageReducer', imageReducer);

module.exports = router;