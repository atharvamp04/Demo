const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    idType: { type: String, required: true },
    enrolmentId: { type: String, required: true },
    enrolmentDate: { type: Date },
    enrolmentTime: { type: String }
});

module.exports = mongoose.model('Status', statusSchema);
