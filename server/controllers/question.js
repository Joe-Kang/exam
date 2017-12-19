var Question = require('mongoose').model('Question');
var Answer = require('mongoose').model('Answer');

module.exports = {

    getAllQuestions: function(request, response) {
        Question.find({}).populate('_answers').exec(function(err, results) {
            if(err) {
                console.log(err);
                response.json({"status" : "fail"});
            } else {
                console.log("got all data");
                response.json(results);
            }
        })
    },

    createNewQuestion: function(request, response) {
        newQuestion = new Question();
        newQuestion.name = request.body.name;
        newQuestion.question = request.body.question;
        newQuestion.description = request.body.description;
        newQuestion.save(function(err) {
            if(err) {
                console.log(err);
                response.json({"status" : "error"})
            } else {
                console.log("Added Question to DB");
                response.json({"status" : "success"});
            }
        })
    },

    createNewAnswer: function(request, response) {
        Question.findOne({_id: request.params.id}, function(err, question) {
            if(err) {
                console.log(err);
                response.json({"status" : "error"})
            } else {
                console.log("Added Found question!");
                newAnswer = new Answer();
                newAnswer.name = request.body.name;
                newAnswer.answer = request.body.answer;
                newAnswer.detail = request.body.detail;
                newAnswer._question = question;
                newAnswer.likes = 0;
                newAnswer.save(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added answer");
                        question._answers.push(newAnswer);
                        question.save(function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Updated question");
                                response.json({"status" : "success"});
                            }
                        })
                    }
                })
            }
        })
    },

    like: function(request, response) {
        console.log("Got here");
        Answer.update({_id: request.params.id}, {likes: request.body.likes + 1}, function(err) {
            if(err) {
                console.log(err);
                response.json({"status" : "fail"});
            } else {
                response.json({"status" : "success"});
            }
        })
    }

}