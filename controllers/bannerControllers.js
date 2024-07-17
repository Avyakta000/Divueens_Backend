const Banner = require('../models/banner')
const { DeleteObjectCommand, } = require('@aws-sdk/client-s3');
const s3Client = require('../config/awsConfig');
// get home banner
const getHomeBanners = async (req, res) => {
    try {
        // const title = "home";
        const banners = await Banner.find();

        if (!banners.length) {
            return res.status(404).json({ message: `No banners found with the title ${title}` });
        }

        res.json(banners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// upload a banner
const uploadBanner = async (req, res) => {
    try {
        const { title, description, } = req.body;
        const imageUrl = req.file.location;
        const newBanner = new Banner({
            title,
            description,
            imageUrl,
        });

        await newBanner.save();
        res.status(201).json({ message: "Banner added successfully", newBanner });

    } catch (err) {
        res.json({ error: err.message });
    }
};

// delete a banner
const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBanner = await Banner.findByIdAndDelete(id);

        if (!deletedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        if (deleteBanner.imageUrl) {

            const key = product.imageUrl.split('/').pop();
            const deleteParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }


        res.json({ message: 'Banner deleted successfully', deletedBanner });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update a banner
const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, } = req.body;

        const updateData = { title, description, imageUrl: req.file && req.file.location };

        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        res.json({ message: 'Banner updated successfully', updatedBanner });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {

    getHomeBanners,
    uploadBanner,
    deleteBanner,
    updateBanner,
}