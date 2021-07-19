const mongoose = require('mongoose');
const schema = mongoose.Schema;

const kings = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }
)

const Kings = mongoose.model("Kings", kings);
module.exports = Kings;