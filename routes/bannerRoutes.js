const express = require('express');
const router = express.Router();
const { getHomeBanners, uploadBanner, deleteBanner, updateBanner } = require('../controllers/bannerControllers');
const upload = require('../config/multerConfig'); 

// banner endpoints
router.get('/', getHomeBanners);
router.post('/',upload.single('image'), uploadBanner);
router.delete('/:id', deleteBanner);
router.put('/:id',upload.single('image'), updateBanner);

module.exports = router;