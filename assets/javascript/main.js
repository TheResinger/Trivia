$(document).ready(function(){
    $("#mainContainer").append($("<h1>",{"text" : "Welcome to Trivia!", "id" : "welcome", "class" : "center"}));
    $("#mainContainer").append($("<button>", {"type" : "button", "id" : "start", "text" : "Click to Start", "class" : "center"}));
    $(document).on("click", "#start", game.start);
    $(document).on("click", "#playAgain", game.start);
    $(document).on("click", ".option", game.checkUserGuess);
});

var game = {
    right : 0, 
    wrong : 0, 
    noAnswer : 0,
    currentQ : 0,
    clockTime : 10,
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
        game.noAnswer = 0;
        clearInterval(game.clock);
        $("#start").remove();
        $("#welcome").remove();
        $("#mainContainer").append($("<div>",{"id" : "game"}));
        // $("#game").append($("<h3>",{"text" : "Time Left : ", "class" : "center", "id" : "remainingTime"}));
        game.next();
    },
    next :  function(){
        if(game.currentQ < Object.keys(game.questions).length)
        {
            $("#game").empty();
            game.clockTime = 10;
            $("#game").append($("<h4>",{"text" : "Time Left : ", "class" : "center", "id" : "remainingTime"}));
            $("#remainingTime").text("Time Left : " + game.clockTime);
            if(!game.clockRunning)
            {
                game.clock = setInterval(game.clockCounting, 1000);
            }
            var questionList = Object.values(game.questions)[game.currentQ];
            $("#game").append($("<div>",{"id" : "qna", "class" : "row"}));
            $("#qna").append($("<h2>",{"text" : questionList, "id" : "Question", "class" : "col s12 center"}));
            $("#qna").append($("<h2>",{"id" : "result", "class" : "col s12 center"}));
            var questionAnswers = Object.values(game.answers)[game.currentQ];
            questionAnswers.forEach(function(index, key){
                $("#qna").append($("<h4>", {"text" : index, "id" : key, "class" : "col s3 center option"}));
            });
        }
        else if(game.currentQ === Object.keys(game.questions).length)
        {
            clearInterval(game.clock);
            $("#game").empty();
            $("#game").append($("<h2>",{"text" : "Results!", "id" : "results"}));
            $("#results").append($("<h4>",{"text" : "Correct : " + game.right}));
            $("#results").append($("<h4>",{"text" : "Wrong : " + game.wrong}));
            $("#results").append($("<h4>",{"text" : "Unanswered : " + game.noAnswer}));
            $("#results").append($("<button>",{"text" : "Play Again!","id" : "playAgain"}));
        }
    },
    checkUserGuess : function(){
        var correctAnswer = Object.values(game.rightAnswers)[game.currentQ];
        var resultID;
        if ($(this).text() === correctAnswer)
        {
            console.log("correct");
            clearInterval(game.clock);
            game.right++;
            resultID = setTimeout(game.result, 5000);
            $("#result").text("Correct!");
        }
        else
        {
            clearInterval(game.clock);
            console.log("wrong");
            game.wrong++;
            resultID = setTimeout(game.result, 5000);
            $("#result").text("Wrong!");
            $("#result").append($("<p>",{"text" : "Correct Answer : " + correctAnswer}));
        }
    },
    result : function(){
        $("#qna").remove();
        $("#remainingTime").remove();
        game.currentQ++;
        game.next();
    },
    clockCounting : function(){
        if(game.clockTime > 0 && game.currentQ < Object.keys(game.questions).length){
            game.clockTime--;
            $("#remainingTime").html('<h4 class="center" id="remainingTime"> Time Left : ' + game.clockTime + "</h3>");
            console.log(game.clockTime);
        }
        else if(game.clockTime === 0)
        {
            game.noAnswer++;
            clearInterval(game.clock);
            resultID = setTimeout(game.result, 5000);
            $("#result").text("Times Up!");
            $("#result").append($("<p>",{"text" : "Correct Answer : " + Object.values(game.rightAnswers)[game.currentQ]}));
        }
    }
}

