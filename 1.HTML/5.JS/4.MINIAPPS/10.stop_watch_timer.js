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

startButton.addEventListener('click',() => {
    timerInterval = setInterval(() => {
        timeCount += 1;
        //밀리세컨즈 계산
        ms = Math.floor(timeCount / 10) % 100;
        //초계산
        seconds = Math.floor(timeCount / 1000) % 60;
        //분계산
        minutes = Math.floor(timeCount / (1000* 60));

        msText.textContent = ms.toString().padStart(2,'0');
        secondsText.textContent = seconds.toString().padStart(2,'0');
        minutesText.textContent = minutes.toString().padStart(2,'0');
    },1);
});

stopButton.addEventListener('click', () => {
    console.log('stop 눌림');
    clearInterval(timerInterval);
});

resetButton.addEventListener('click', () => {
    stopButton.click();

    timeCount = 0;
    msText.textContent = '00';
    secondsText.textContent = '00';
    minutesText.textContent = '00';
})