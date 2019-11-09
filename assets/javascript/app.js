var triviaQuestions = [{
	question: "What City is the Vatican?",
	answerList: ["Barcelona", "Paris", "Rome", "Florence"],
	answer: 2
},{
	question: "The Left Bank generally refers to the Left Bank of the Seine in which city??",
	answerList: ["Paris", "London", "Amsterdam", "Prague"],
	answer: 0
},{
	question: "What country is famous for pasta",
	answerList: ["Spain", "Italy", "Ireland", "Greece"],
	answer: 1
},{
	question: "When is the Mexican holiday Dia de los Muertos celebrated??",
	answerList: ["May", "August", "December", "October"],
	answer: 3
},{
	question: "How do you say 'Hello' in German?",
	answerList: ["Ciao", "Hallo", "Sveiki", "Hola"],
	answer: 1
},{
	question: "In what city could you expect to try currywurst?)",
	answerList: ["Mosul", "Berlin", "Mogadishu", "Beirut"],
	answer: 1
},{
	question: "You're craving an amazing deep dish pizza. Which city is your best bet?",
	answerList: ["Rome", "Chicago", "Venice", "NYC"],
	answer: 1
},{
	question: "What is the currency in Spain??",
	answerList: ["Euro", "Peso", "Real", "Peseta"],
	answer: 0
},{
	question: "You're craving a delicious shrimp po'boy, which city is your best bet?'?",
	answerList: ["Rotterdam", "Cape Town", "New Orleans", "Rio De Janeiro"],
	answer: 2
},{
	question: "A sparkling wine should only be called champagne if it comes from a certain region of?",
	answerList: ["France", "California", "Italy", "Spain"],
	answer: 0
},{
	question: "How do you say 'Thank You' in Italian?",
	answerList: ["Grazie", "Graicas", "Vino", "Merci"],
	answer: 0
},{
	question: "In which country is there the highest population of Portuguese speakers??",
	answerList: ["Portugal", "Zambia", "Paraguay", "Brazil"],
	answer: 3
},{
	question: "What do they call the subway system in London?",
	answerList: ["The tube", "The Metro", "The T", "Subway"],
	answer: 0
},{
	question: "Where is this Guiness beer brewed??",
	answerList: ["Belgium", "Ireland", "Slovakia", "Denmark"],
	answer: 1
},{
	question: "'Which country is best known for its delicious seafood paella??",
	answerList: ["Spain", "Italy", "Austria", "Israel"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}