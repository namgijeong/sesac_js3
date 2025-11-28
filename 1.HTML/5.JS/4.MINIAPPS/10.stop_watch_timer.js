const startButton = document.getElementById('start_button');
const stopButton = document.getElementById('stop_button');
const resetButton = document.getElementById('reset_button');

const minutesText = document.getElementById('minute_text');
const secondsText = document.getElementById('seconds_text');
const msText = document.getElementById('ms_text');

let timerInterval;

let timeCount = 0;
let minutes = 0;
let seconds = 0;
let ms = 0;

startButton.addEventListener('click', () => {
    if (timerInterval) {
        return;
    }
    else {
        console.log("start");
        startButton.style.backgroundColor = '#daeef0';
        stopButton.style.backgroundColor = 'lightblue';
        resetButton.style.backgroundColor = 'lightblue';

        timerInterval = setInterval(() => {
            timeCount += 1;
            //밀리세컨즈 계산
            ms = Math.floor(timeCount / 10) % 100;
            //초계산
            seconds = Math.floor(timeCount / 1000) % 60;
            //분계산
            minutes = Math.floor(timeCount / (1000 * 60));

            msText.textContent = ms.toString().padStart(2, '0');
            secondsText.textContent = seconds.toString().padStart(2, '0');
            minutesText.textContent = minutes.toString().padStart(2, '0');
        }, 1);
    }

});

stopButton.addEventListener('click', () => {
    if (!timerInterval) {
        return;
    }
    else {
        console.log("stop");
        startButton.style.backgroundColor = 'lightblue';
        stopButton.style.backgroundColor = '#daeef0';
        resetButton.style.backgroundColor = 'lightblue';

        clearInterval(timerInterval);
        //여기서 알수있는건 clearInterval시 timerInterval 변수값이 사라지는건 아니다
        console.log('stop시 timeinterval:', timerInterval);
        timerInterval = undefined;
    }
});

resetButton.addEventListener('click', () => {
    startButton.style.backgroundColor = 'lightblue';
    stopButton.style.backgroundColor = 'lightblue';
    resetButton.style.backgroundColor = '#daeef0';

    timeCount = 0;
    msText.textContent = '00';
    secondsText.textContent = '00';
    minutesText.textContent = '00';

    if (!timerInterval) {
        return;
    }
    else {
        console.log("reset");

        clearInterval(timerInterval);
        //여기서 알수있는건 clearInterval시 timerInterval 변수값이 사라지는건 아니다
        timerInterval = undefined;
    }

});