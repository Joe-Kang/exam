var Question = require('../controllers/question.js');
var path = require("path");

module.exports = function(app) {
    app.get('/dashboard', function(request, response) {
      Question.getAllQuestions(request, response);
    })

    app.post('/createNewQuestion', function(request, response) {
      Question.createNewQuestion(request, response);
    })

    app.post('/createNewAnswer/:id', function(request, response) {
      Question.createNewAnswer(request, response);
    })

    app.post('/answer/:id', function(request, response) {
      Question.answer(request, response);
    })

    app.post('/like/:id', function(request, response) {
      console.log("going to db to like");
      Question.like(request, response);
    })

    app.all("*", (request,response) => {
      response.sendFile(path.resolve("./client/dist/index.html"))
  })
}