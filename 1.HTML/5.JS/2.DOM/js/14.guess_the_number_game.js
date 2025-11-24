let correctAnswer = 1;

//페이지에 진입하자마자 정답을 생성한다.
makeRandomNumber();

autoPlay();


function makeRandomNumber() {
    //Math.random() => 0. 0 ~ 9.99
    //두자리수면 100을 곱하면 되겠다
    //2.87 => 어떻게 달까?
    //내림 => 0~99 => floor
    //올림 => 0~100 =>round
    //올림 => 1~100 ceil
    correctAnswer = Math.floor(Math.random() * 100) + 1;
}

function checkAnswer(guess) {
    let trialButton = document.getElementById("trial");

    let feedbackString = '';

    if (guess == '') {
        feedbackString = "Please Enter the number.";
        return feedbackString;
    }

    if (guess > correctAnswer) {
        feedbackString = 'Too high!';
    } else if (guess < correctAnswer) {
        feedbackString = 'Too low!';
    } else {
        feedbackString = 'Correct! You guessed the number!';
        trialButton.disabled = true;
        document.getElementById("guess").disabled = true
    }

    return feedbackString;
}



function playGame() {
    let resultDiv = document.getElementById("feed_back");
    let historyUl = document.getElementById("history");
    let guess = document.getElementById("guess").value;
    let feedbackString;

    feedbackString = checkAnswer(guess);

    let totalFeedbackString = '<b>' + feedbackString + '</b> <br/>';
    resultDiv.innerHTML = totalFeedbackString;

    let historyString = `You guessed ${guess}: ${feedbackString} <br/>`;
    let li = document.createElement('li');
    li.innerHTML = historyString;
    historyUl.appendChild(li);
}

function autoPlay() {
    let resultDiv = document.getElementById("feed_back");
    let historyUl = document.getElementById("history");
    const guesses = [10, 20, 50, 70, 80, 60, 30, 40]

    let feedbackString;
    // for (guess of guesses) {
    //     document.getElementById("guess").value = guess;
    //     feedbackString = checkAnswer(guess);

    //     let totalFeedbackString = '<b>' + feedbackString + '</b> <br/>';
    //     resultDiv.innerHTML = totalFeedbackString;

    //     let historyString = `You guessed ${guess}: ${feedbackString} <br/>`;
    //     let li = document.createElement('li');
    //     li.innerHTML = historyString;
    //     historyUl.appendChild(li);
    // }


    // for (let guess = 1; guess <= 100; guess++) {
    //     document.getElementById("guess").value = guess;
    //     feedbackString = checkAnswer(guess);

    //     console.log("입력시도: ", guess);

    //     let totalFeedbackString = '<b>' + feedbackString + '</b> <br/>';
    //     resultDiv.innerHTML = totalFeedbackString;

    //     let historyString = `You guessed ${guess}: ${feedbackString} <br/>`;
    //     let li = document.createElement('li');
    //     li.innerHTML = historyString;
    //     historyUl.appendChild(li);

    //     if (feedbackString.includes("Correct")) {
    //         break;
    //     }
    // }


    //이진탐색으로 찍기
    let numberArray = [];
    for (let i = 1; i < 101; i++) {
        numberArray.push(i);
    }
    console.log(numberArray);

    let lowIndex = 0;
    let highIndex = numberArray.length - 1
    let midIndex = Math.floor((highIndex + lowIndex) / 2);

    while (lowIndex <= highIndex) {
        console.log('midindex: ' + midIndex + ', number: ' + numberArray[midIndex]);
        
        feedbackString = checkAnswer(numberArray[midIndex]);
        let totalFeedbackString = '<b>' + feedbackString + '</b> <br/>';
        resultDiv.innerHTML = totalFeedbackString;

        let historyString = `You guessed ${numberArray[midIndex]}: ${feedbackString} <br/>`;
        let li = document.createElement('li');
        li.innerHTML = historyString;
        historyUl.appendChild(li);

        if (numberArray[midIndex] > correctAnswer) {
            highIndex = midIndex - 1;
            midIndex = Math.floor((highIndex + lowIndex) / 2);
        }
        else if (numberArray[midIndex] < correctAnswer) {
            lowIndex = midIndex + 1;
            midIndex = Math.floor((highIndex + lowIndex) / 2);
        }
        else {
            break;
        }
    }

}