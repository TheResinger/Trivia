$(document).ready(function(){
    $("#mainContainer").append($("<h1>",{"text" : "Welcome to Trivia!", "id" : "welcome", "class" : "center"}));
    $("#mainContainer").append($("<button>", {"type" : "button", "id" : "start", "text" : "Click to Start", "class" : "center"}));
    $("#start").on("click", game.start);
    $(document).on("click", ".option", game.checkUserGuess);
});

var game = {
    // Set variables
    right : 0, //Answers Right
    wrong : 0, //Answers Wrong
    currentQ : 0,
    clockTime : 10,  // 10 Second timer
    clockRunning : false,
    clock : '',
    questions : {
        1 : "Which has NOT been a Nissan slogan?",
        2 : "What is the luxury division of Nissan? ",
        3 : "What is the motorsports and performance division of Nissan?",
        4 : "What was the first year of production for the Nissan 350Z?",
    },
    answers : {
        1 : ["Life is a journey. Enjoy the ride.", "Moving Forward.", "Everything you want, nothing you don’t.", "Built for the Human Race."],
        2 : ["Infiniti", "Lexus", "Audi", "Acura"],
        3 : ["NISMO", "None of these", "NISSPORT", "NMCRT"],
        4 : ["2004", "2000", "2006", "2002"],
    },
    rightAnswers : {
        1 : "Moving Forward.",
        2 : "Infiniti",
        3 : "NISMO",
        4 : "2002",
    },
    start : function(){
        game.currentQ = 0;
        game.right = 0;
        game.wrong = 0;
        $("#start").remove();
        $("#welcome").remove();
        $("#mainContainer").append($("<div>",{"id" : "game"}));
        $("#game").append($("<h3>",{"text" : "Time Left : " + game.clockTime, "class" : "center"}));
        game.next();
    },
    next :  function(){
        game.clockTime = 20;
        var questionList = Object.values(game.questions)[game.currentQ];
        $("#game").append($("<div>",{"id" : "qna", "class" : "row"}));
        $("#qna").append($("<h1>",{"text" : questionList, "id" : "Question", "class" : "col s12 center"}));
        $("#qna").append($("<h1>",{"id" : "result", "class" : "col s12 center"}));
        var questionAnswers = Object.values(game.answers)[game.currentQ];
        questionAnswers.forEach(function(index, key){
            $("#qna").append($("<h4>", {"text" : index, "id" : key, "class" : "col s3 center option"}));
        });
    },
    checkUserGuess : function(){
        var correctAnswer = Object.values(game.rightAnswers)[game.currentQ];
        var resultID;
        if ($(this).text() === correctAnswer)
        {
            console.log("correct");
            game.right++;
            resultID = setTimeout(game.result, 5000);
            $("#result").text("Correct!");
        }
        else
        {
            console.log("wrong");
        }
    },
    result : function(){
        $("#qna").remove();
        game.currentQ++;
        game.next();
    },
    clockRunning : function(){

    }
}

