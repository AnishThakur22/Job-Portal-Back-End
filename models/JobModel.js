const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: false,
        trim: true,
        default: "N/A"
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
