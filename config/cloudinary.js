import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dl5jlcbo3',
    api_key: '722571539771234',
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
