$('#start').on('click',function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(Neo){
    game.clicked(Neo);
})

$(document).on('click','#reset',function(){
    game.reset();
})
var questions = [{
// --- Matrix Trivia--- //
    question:"Which of these characters is not a member of the Resistance?",
    answers: ["Neo", "Spoon boy", "Trinity", "Morpheus"],
    correctAnswer: "Spoon boy"
}, {

    question: "The Matrix was the first film to employ this groundbreaking" +
    " type of cinematography?",
    answers: ["Lasso", "Dolby Digital", "Long-shot", "Bullet-time"],
    correctAnswer: "Bullet-time"
}, {

    question: "Which of these charcters is not a Program?",
    answers: ["Agent Thompson", "Agent Smith", "The Architect", "The Keymaker"],
    correctAnswer: "The Keymaker"
}, {

    question: "Which of these characters is not an Exile?",
    answers: ["Rama Kandra", "Chuang Tzu", "Persephone", "The Elements"],
    correctAnswer: "Chuang Tzu"
}, {

    question: "Which color of pill did Neo ingest?",
    answers: ["Red", "Orange", "Yellow", "Blue"],
    correctAnswer: "Red"
}, {

    question: "The Matrix was released in what year?",
    answers: ["1997", "1998", "1999", "2000"],
    correctAnswer: "1999"
}, {

    question: "Who are the Resistance fighters searching for?",
    answers: ["The Keymaker", "The One", "BeanShell", "The Oracle"],
    correctAnswer: "The Oracle"
}, {

    question: "Which ship is captained by Morpheus?",
    answers: ["Nebuchadnezzar", "Icarus", "Vigilant", "Mjolnir"],
    correctAnswer: "Nebuchadnezzar"
}];
// --- variables/functions ---//
var game = {
    questions: questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("Times up!");
            game.timeUp();
        }
    },

    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2>Time Remaining: <span id='counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-' 
                +i+'"data-name="'+questions[game.currentQuestion].answers[i]
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
        $('#subwrapper').html('<h2>畄 Times up, The Matrix won this one! 畄</h2>');
        $('#subwrapper').append('<h3>甴 The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },

    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>甾 Well Done! 甾</h2>");
        $('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>");
        $('#subwrapper').append("<button id='reset'>Try again?</button>");
    },

    clicked: function (Neo){
        clearInterval(timer);
        if($(Neo.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },

    answeredCorrectly: function(){
        console.log("Good Answer!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>甹 Correct! 甹</h2>');
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
        $('#subwrapper').html('<h2>界 Incorrect! 界</h2>');
        $('#subwrapper').append('<h3>甴 The Correct Answer Was: '+questions[game.
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


























