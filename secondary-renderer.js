let timerInterval;
let elapsedTime = 0;
const timerDisplay = document.getElementById('timer');
const stopButton = document.getElementById('stop-button');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Add leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
    // Clear any existing interval first
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    elapsedTime = 0;
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        timerDisplay.textContent = '00:00';

    }
}

function pauseTimer() {
    if (timerInterval) {
        
    }
}
// Start the timer as soon as the window loads
window.addEventListener('load', () => {
    console.log('Secondary window loaded');
    startTimer();
    
    const stopButton = document.getElementById('stop-button');
    const pauseButton = document.getElementById('pause-button');

    if (stopButton) {
        stopButton.addEventListener('click', () => {
            console.log('Stop button clicked in secondary window');
            stopTimer();
            window.electronAPI.stopButton();
        });
    } else {
        console.error('Stop button not found in secondary window');
    }
    if (pauseButton) {
        stopButton.addEventListener('click', () => {
            console.log('Pause button cliced in secondary window');
            pauseTimer();
            window.electronAPI.paueButton();
        });
    }
    else {
        console.error('Pause button not found in secondary window');
    }
});