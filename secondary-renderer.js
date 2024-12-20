let timerInterval;
let elapsedTime = 0;
const timerDisplay = document.getElementById('timer');
const stopButton = document.getElementById('stop-button');

function startTimer() {
    // Clear any existing interval first
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    elapsedTime = 0;
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = elapsedTime;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        timerDisplay.textContent = '0';
    }
}

// Start the timer as soon as the window loads
window.addEventListener('load', () => {
    console.log('Secondary window loaded');
    startTimer();
    
    if (stopButton) {
        stopButton.addEventListener('click', () => {
            console.log('Stop button clicked in secondary window');
            stopTimer();
            window.electronAPI.stopTimer();
        });
    } else {
        console.error('Stop button not found in secondary window');
    }
});