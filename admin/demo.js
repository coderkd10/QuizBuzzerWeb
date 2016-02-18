var myFirebaseRef = new Firebase("https://quiz-buzzer.firebaseio.com/");
var isQuestionActiveRef = myFirebaseRef.child("isQuestionActive");
var isQuestionAnsweredRef = myFirebaseRef.child("isQuestionAnswered");

function setQuestionActive() {
	isQuestionAnsweredRef.set(false);
	isQuestionActiveRef.set(true);
}

function setQuestionInactive() {
	isQuestionActiveRef.set(false);
	isQuestionAnsweredRef.set(false);
}

isQuestionActiveRef.on("value", function(snapshot) {
	var isActive = snapshot.val();
	if (isActive) {
		document.getElementById('questionStatus').innerHTML = 'Active';
		document.getElementById('answeredStatusDiv').style.visibility = 'visible';
	}
	else {
		document.getElementById('questionStatus').innerHTML = 'Inactive';
		document.getElementById('answeredStatusDiv').style.visibility = 'hidden';
	}
});

isQuestionAnsweredRef.on("value", function(snapshot) {
	var isAnswered = snapshot.val();
	if (isAnswered) {
		document.getElementById('answerStatus').innerHTML = 'Yes';
	}
	else {
		document.getElementById('answerStatus').innerHTML = 'No';
	}
});