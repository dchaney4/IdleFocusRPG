let timerInterval;
let elapsedTime = 0;
let isPaused = false;
let coinCountValue = 0;

const timerDisplay = document.getElementById('timer');
const stopButton = document.getElementById('stop-button');
const coinCount = document.getElementById('coin-amount');
const pauseButton = document.getElementById('pause-button');
const titleBar = document.getElementById('title-bar');
const coinContainer = document.getElementById('coin-container'); // Added reference to coin container

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval); // Clear existing interval

    if (!isPaused) elapsedTime = 0; // Reset timer if not paused

    timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = formatTime(elapsedTime);

        // Increment coin every 10 seconds and trigger animation
        if (elapsedTime % 10 === 0) { // Change 10 to 60 for one-minute intervals
            coinCountValue++;
            coinCount.textContent = `${coinCountValue}`;
            animateCoin(); // Call animation
        }
    }, 1000);

    isPaused = false;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    elapsedTime = 0;
    timerDisplay.textContent = '00:00';
    isPaused = false;
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = true;
    }
}

function animateCoin() {
    // Get positions of timer and coin container
    const timerRect = timerDisplay.getBoundingClientRect();
    const coinRect = coinContainer.getBoundingClientRect();

    // Create animated coin
    const animatedCoin = document.createElement('div');
    animatedCoin.classList.add('animated-coin');
    document.body.appendChild(animatedCoin);

    // Trigger reflow to apply animation
    requestAnimationFrame(() => {
        animatedCoin.style.transform = `translate(${coinRect.left - timerRect.left}px, ${coinRect.top - timerRect.top}px)`;
        animatedCoin.style.opacity = 0;
    });

    // Remove the animated coin after animation ends
    animatedCoin.addEventListener('transitionend', () => {
        animatedCoin.remove();
    });
}

// Event listeners for buttons
window.addEventListener('load', () => {
    startTimer();

    if (stopButton) {
        stopButton.addEventListener('click', () => {
            stopTimer();
            window.electronAPI.stopButton();
        });
    }

    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            if (!isPaused) {
                pauseTimer();
                pauseButton.innerHTML = '<span>Resume</span>';
            } else {
                startTimer();
                pauseButton.innerHTML = '<span>Pause</span>';
            }
        });
    }

    titleBar.addEventListener('click', (event) => {
        if (!event.target.classList.contains('title-button')) return;

        switch (event.target.id) {
            case 'minimize-button':
                window.electronAPI.minimizeWindow();
                break;
            case 'close-button':
                window.electronAPI.closeWindow();
                break;
        }
    });
});
