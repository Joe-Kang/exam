const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const answerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    answer: {
        type: String,
    },
    detail: {
        type: String,
    },
    likes: {
        type: Number,
    },
    _question: [{type: Schema.Types.ObjectId, ref: 'Question'}],
}, {timestamps: true});

const Answer = mongoose.model('Answer', answerSchema);