const phoneInput = document.getElementById('phone-input');
const startButton = document.getElementById('start-button');

let currentNumber = 0;
let microphoneStream;
let isStartButtonActive = true;
let previousValue = 0; // Store previous displayed value
let updateLoopId; // Store requestAnimationFrame ID

startButton.addEventListener('click', async () => {
  if (isStartButtonActive) {
    try {
      // Request microphone access, create audio context and analyser node
      microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();

      // Connect microphone stream to analyser and initialize update loop
      const source = audioCtx.createMediaStreamSource(microphoneStream);
      source.connect(analyser);

      const updatePhoneNumber = () => {
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData);

        // Calculate average sound level and update current number
        const averageSoundLevel = frequencyData.reduce((acc, val) => acc + val) / frequencyData.length;
        currentNumber = Math.round(averageSoundLevel / 70 * 9);
        if (currentNumber > 9) {
          currentNumber = 9;
        }

        // Update phone input display
        phoneInput.textContent = currentNumber;

        // Update previous value if button is not active
        if (!isStartButtonActive) {
          previousValue = currentNumber;
        }

        // Schedule next update
        updateLoopId = requestAnimationFrame(updatePhoneNumber);
      };

      updatePhoneNumber(); // Start update loop

      // Store previous displayed value and update button text/state
      previousValue = phoneInput.textContent;
      startButton.textContent = 'Set';
      isStartButtonActive = false;
    } catch (error) {
      console.error(error);
    }
  } else {
    // Stop microphone access and update phone input with stored value
    microphoneStream.getTracks().forEach(track => track.stop());
    cancelAnimationFrame(updateLoopId); // Stop update loop
    phoneInput.textContent = previousValue; // Set to previously stored value

    // Update button text and state
    startButton.textContent = 'Start';
    isStartButtonActive = true;
  }
});