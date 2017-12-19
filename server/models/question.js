const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const questionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    question: {
        type: String,
    },
    description: {
        type: String,
    },
    _answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
}, {timestamps: true});

const Question = mongoose.model('Question', questionSchema);