$('#start').on('click',function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})
var questions = [{
// --- Matrix Trivia--- //
    questions:"Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}, {

    questions: "Which of these is not a scripting language?",
    answers: ["Lasso", "Ruby", "BeanShell", "PostScript"],
    correctAnswer: "PostScript"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2>Time Remaining: <span id='counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]
                +'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of Time!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>All Done!</h2>");
        $('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>");
        $('#subwrapper').append("<button id='reset'>Reset</button>");
    },
    clicked: function (e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("Good Answer!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>You Got It Right!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("Wrong!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>You Got It Wrong!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
            currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}

// --- Matrix Background --- //
var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = window.innerWidth;
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
chinese = chinese.split("");

var font_size = 10;
var columns = c.width/font_size;
var drops = [];
for(var x = 0; x < columns; x++)
    drops[x] = 1;
function draw()
{
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#0F0";
    ctx.font = font_size + "px arial";
    for(var i = 0; i < drops.length; i++)
    {

        var text = chinese[Math.floor(Math.random()*chinese.length)];
        ctx.fillText(text, i*font_size, drops[i]*font_size);
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0; drops[i]++;
    }
}
setInterval(draw, 33);


























