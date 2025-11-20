
let correctAnswer = 1;
let playCount = 0;

function makeRandomNumber(){
    correctAnswer = Math.floor(Math.random() * 100 + 1);
}

function checkAnswer(){
    let guess = document.getElementById("guess").value;
    let feedbackString = '';
    playCount++;

    if (guess > correctAnswer){
        feedbackString = 'Too high!';
        // feedbackString = `${playCount}. You guessed ${guess}:Too high!`;
    } else if (guess < correctAnswer){
        feedbackString = 'Too low!';
        // feedbackString = `${playCount}. You guessed ${guess}:Too low!`;
    } else {
        feedbackString = 'Correct! You guessed the number!';
        // feedbackString = `${playCount}. You guessed ${guess}:Correct! You guessed the number!`;
    }

    return feedbackString;
}

function playGame(){
    let guess = document.getElementById("guess").value;
    if (guess == ''){

    }
    makeRandomNumber();
    let feedbackString = checkAnswer();
}