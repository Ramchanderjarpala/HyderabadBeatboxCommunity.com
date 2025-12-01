import mongoose from 'mongoose';

const homeImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
});

const HomeImage = mongoose.model('HomeImage', homeImageSchema);

export default HomeImage;