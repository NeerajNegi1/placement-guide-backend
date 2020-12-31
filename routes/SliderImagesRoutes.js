const express = require('express');
const router = express.Router();

const {getSliderImages, postSliderImages, deleteSliderImage, preparationGuideImage} = require("../controllers/SliderImages")

router.get('/slider-images', getSliderImages);
router.post('/slider-images', postSliderImages);
router.post('/slider-image-delete', deleteSliderImage);


module.exports = router;