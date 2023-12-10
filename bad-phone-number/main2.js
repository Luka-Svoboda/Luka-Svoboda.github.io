const phoneInput = document.getElementById('phone-input');
const startButton = document.getElementById('start-button');

let isRecording = false;
let currentNumber = 0;
let minimumYellThreshold = 8; // Minimum average volume for increase
let maximumYellThreshold = 1; // Maximum average volume for decrease
let changeThreshold = 4; // Minimum relative volume change for update
let increaseRate = 1; // Rate of increment per update (adjust for desired speed)

// Update the phone number on the screen
const updateNumber = () => {
    phoneInput.textContent = currentNumber;
};

// Start recording audio
startButton.addEventListener('click', () => {
    if (!isRecording) {
        isRecording = true;
        startButton.textContent = 'Stop Yelling';

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                const microphone = audioCtx.createMediaStreamSource(stream);

                microphone.connect(analyser);

                const interval = setInterval(() => {
                    if (isRecording) {
                        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(frequencyData);

                        const averageVolume = frequencyData.reduce((acc, curr) => acc + curr, 0) / frequencyData.length;

                        // Calculate relative volume difference
                        const volumeDifference = Math.abs((averageVolume - minimumYellThreshold) / (maximumYellThreshold - minimumYellThreshold));

                        // Update number only if change exceeds threshold and increase gradually
                        if (volumeDifference > changeThreshold) {
                            if (averageVolume > minimumYellThreshold) {
                                currentNumber += increaseRate;
                            } else if (averageVolume < maximumYellThreshold) {
                                currentNumber -= increaseRate;
                            }

                            // Clamp number within 0-9 range
                            currentNumber = Math.min(Math.max(currentNumber, 0), 9);

                            updateNumber();
                        }
                    } else {
                        clearInterval(interval);
                    }
                }, 50);

                // Stop recording on stop button click
                startButton.addEventListener('click', () => {
                    isRecording = false;
                    startButton.textContent = 'Start Yelling';
                    clearInterval(interval);
                });
            });
    } else {
        isRecording = false;
        startButton.textContent = 'Start Yelling';
    }
});
