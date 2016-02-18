var myFirebaseRef = new Firebase("https://quiz-buzzer.firebaseio.com/");
var isQuestionActiveRef = myFirebaseRef.child("isQuestionActive");
var isQuestionAnsweredRef = myFirebaseRef.child("isQuestionAnswered");
var isAnsweredByMe = false;
var isQuestionActive = false;
var isQuestionAnswered = false;


function onAnswerButtonClick() {
	console.log("Button Pressed");
	if(isQuestionActive) {
		if(!isQuestionAnswered) {
			console.log("I am first");
			isAnsweredByMe = true;
			isQuestionAnsweredRef.set(true);
		}
	}
}

isQuestionActiveRef.on("value", function(snapshot) {
	var isActive = snapshot.val();
	isQuestionActive = isActive;
	isAnsweredByMe = false;
	if (isActive) {
		document.getElementById('questionStatus').innerHTML = 'Active';
		document.getElementById('answeredButtonDiv').style.visibility = 'visible';
	}
	else {
		document.getElementById('questionStatus').innerHTML = 'Inactive';
		document.getElementById('answeredButtonDiv').style.visibility = 'hidden';
	}
});

isQuestionAnsweredRef.on("value", function(snapshot) {
	var isAnswered = snapshot.val();
	isQuestionAnswered = isAnswered;
	if (isAnswered) {
		document.getElementById("answerButton").style.visibility = 'hidden';
		if(isAnsweredByMe) {
			document.getElementById("answeredStatusIndicator").innerHTML = "Fast! You pressed the button first :)";
		}
		else {
			document.getElementById("answeredStatusIndicator").innerHTML = "Too slow...Somebody already pressed the buzzer :(";
		}
	}
	else {
		document.getElementById("answeredStatusIndicator").innerHTML = "Press button to answer question";
		document.getElementById("answerButton").style.visibility = '';
	}
	isAnsweredByMe = false;
});