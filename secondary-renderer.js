let timerInterval;
let elapsedTime = 0;
let isPaused = false;
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

    if (!isPaused) {
        elapsedTime = 0;
    }

    timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = formatTime(elapsedTime);
    }, 1000);

    isPaused = false;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        timerDisplay.textContent = '00:00';
        isPaused = false;

    }
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = true;
    }
}
// Start the timer as soon as the window loads
window.addEventListener('load', () => {
    console.log('Secondary window loaded');
    startTimer();
    
    const stopButton = document.getElementById('stop-button');
    const pauseButton = document.getElementById('pause-button');
    const titleBar = document.getElementById('title-bar');

    if (stopButton) {
        stopButton.addEventListener('click', () => {
            console.log('Stop button clicked in secondary window');
            stopTimer();
            window.electronAPI.stopButton();
        });
    } else {
        console.error('Stop button not found in secondary window');
    }
    //Change wording on pause button
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            if (!isPaused) {
                console.log('Pause button clicked in secondary window');
                pauseTimer();
                pauseButton.innerHTML = '<span>Resume</span>';
            }
            else {
                console.log('Timer resumed');
                startTimer();
                pauseButton.innerHTML = '<span>Pause</span>';
            }
        });
    }
    else {
        console.error('Pause button not found in secondary window');
    }

    titleBar.addEventListener('click', (event) => {
        if (!event.target.classList.contains('title-button')) return; // Ignore clicks outside buttons
        
        switch (event.target.id) {
            case 'minimize-button':
            console.log('Minimize button clicked');
            window.electronAPI.minimizeWindow();
            break;
    
            case 'close-button':
            console.log('Close button clicked');
            window.electronAPI.closeWindow();
            break;
        }
    });
});