let correctAnswer = 1;
// let playCount = 0;

//페이지에 진입하자마자 정답을 생성한다.
makeRandomNumber();

function makeRandomNumber(){
    correctAnswer = Math.floor(Math.random() * 100 + 1);
}

function checkAnswer(guess){
    let feedbackString = '';

    if (guess == ''){
        feedbackString = "Please Enter the number.";
        return feedbackString;
    }

    if (guess > correctAnswer){
        feedbackString = 'Too high!';
    } else if (guess < correctAnswer){
        feedbackString = 'Too low!';
    } else {
        feedbackString = 'Correct! You guessed the number!';
    }

    return feedbackString;
}



function playGame(){
    let resultDiv = document.getElementById("feed_back");
    let historyUl = document.getElementById("history");
    let guess = document.getElementById("guess").value;

    //playCount++;

    let feedbackString = checkAnswer(guess);

    let totalFeedbackString = '<b>'+feedbackString+'</b> <br/>';
    resultDiv.innerHTML = totalFeedbackString;

    let historyString = `You guessed ${guess}: ${feedbackString} <br/>`;
    let li = document.createElement('li');
    li.innerHTML = historyString;
    historyUl.appendChild(li);
}