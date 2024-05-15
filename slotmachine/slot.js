// Declare global variables
let spinInterval = null;
let autoSpinInterval = null;
let autoSpinning = false;
let balance = 1000; // Initial balance of the player
let betAmount = 0; // Initial bet amount
let backgroundMusicPaused = false;

// Function to play background music
function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();
}

// Function to pause background music
function pauseBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.pause();
}

// Function to toggle background music
function toggleBackgroundMusic() {
    if (backgroundMusicPaused) {
        playBackgroundMusic();
        backgroundMusicPaused = false;
    } else {
        pauseBackgroundMusic();
        backgroundMusicPaused = true;
    }
}

// Function to simulate spinning of the slot machine
function spin() {
    if (betAmount === 0) {
        alert("Please place a bet before spinning.");
        return;
    }

    const slots = document.querySelectorAll('.slot');

    // Number of spins
    const spins = 1;

    // Milliseconds between each spin
    const interval = 0;

    // Array of symbols
    const symbols = ['1.jfif', '20.jpg', '10.jpg'];

    // Function to randomly select a symbol
    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    // Function to stop spinning and check for winning combinations
    function stopSpinning() {
        clearInterval(spinInterval);

        // Determine if the result is a win or loss based on the specified probabilities
        const isWin = Math.random() < 0.4; // 40% chance to win

        if (isWin) {
            // Set winning combination
            slots.forEach(slot => {
                slot.innerHTML = `<img src="${symbols[0]}" alt="Image">`; // Example: Set all slots to the same symbol
                slot.firstChild.style.animation = 'flip 0.6s';
            });

            showJackpotEffect();
            balance += betAmount * 2; // Double the bet amount and add it to the balance
            updateBalance(); // Update balance on the dashboard
            stopAutoSpin(); // Stop auto spin if a win occurs
            playWinningSound(); // Play the winning sound
        } else {
            // Set random symbols for a losing combination
            slots.forEach(slot => {
                slot.innerHTML = `<img src="${getRandomSymbol()}" alt="Image">`;
                slot.firstChild.style.animation = 'flip 0.6s';
            });

            balance -= betAmount; // Deduct the bet amount from the balance
            updateBalance(); // Update balance on the dashboard
        }
    }

    let spinCount = 0;
    spinInterval = setInterval(() => {
        // Set random symbols for each slot
        slots.forEach(slot => {
            slot.innerHTML = `<img src="${getRandomSymbol()}" alt="Image">`;
            slot.firstChild.style.animation = 'flip 0.6s';
        });

        spinCount++;

        // Stop spinning after the specified number of spins
        if (spinCount === spins) {
            stopSpinning();
        }
    }, interval);
}

// Function to show jackpot effect
function showJackpotEffect() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.classList.add('jackpot');
    });

    // Create and animate confetti
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after some time
    setTimeout(() => {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(confetti => {
            confetti.style.animationPlayState = 'paused';
            confetti.style.transition = 'opacity 0.5s';
            confetti.style.opacity = '0';
            confetti.addEventListener('transitionend', () => confetti.remove());
        });
        confettiContainer.innerHTML = '';
    }, 3000); // Adjust duration as needed

    // Remove jackpot effect after some time
    setTimeout(() => {
        slots.forEach(slot => {
            slot.classList.remove('jackpot');
        });
    }, 3000);
}

// Function to get random color for confetti
function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to start auto spin
function autoSpin() {
    // Check if auto spin is already running
    if (!autoSpinning) {
        autoSpinning = true;
        autoSpinInterval = setInterval(spin, 1000); // Adjust the interval as needed (milliseconds)
        updateAutoSpinButton(); // Update button text
    }
}

// Function to stop auto spin
function stopAutoSpin() {
    clearInterval(autoSpinInterval); // Clear auto spin interval
    clearInterval(spinInterval); // Clear spinning interval
    autoSpinning = false;
    updateAutoSpinButton(); // Update button text
}

// Function to toggle auto spin
function toggleAutoSpin() {
    if (!autoSpinning) {
        autoSpin(); // Start auto spin
    } else {
        stopAutoSpin(); // Stop auto spin
    }
}

// Function to update button text based on auto spinning status
function updateAutoSpinButton() {
    const autoSpinButton = document.querySelector('.auto-spin-button');
    autoSpinButton.textContent = autoSpinning ? 'Stop Auto Spin' : 'Start Auto Spin';
}

// Function to place a bet
function placeBet() {
    if (balance === 0) {
        alert("You have insufficient balance.");
        return;
    }

    const betInput = prompt("Enter your bet amount:");
    const betValue = parseInt(betInput);

    if (!isNaN(betValue) && betValue % 2 === 0 && betValue <= balance) {
        betAmount = betValue;
        updateBetAmount(); // Update bet amount on the dashboard
        balance -= betAmount; // Deduct the bet amount from the balance
        updateBalance(); // Update balance on the dashboard
    } else {
        alert("Please enter a valid even bet amount within your balance.");
    }
}

// Function to update bet amount on the dashboard
function updateBetAmount() {
    document.getElementById('bet-amount').textContent = "$" + betAmount;
}

// Function to update balance on the dashboard
function updateBalance() {
    document.getElementById('balance').textContent = "$" + balance;
}

// Function to play winning sound
function playWinningSound() {
    const audio = new Audio('audiomass-output.mp3');
    audio.play();
}

// Initialization
playBackgroundMusic(); // Start playing background music

// Add event listener for background music toggle button
document.getElementById('toggle-background-music').addEventListener('click', toggleBackgroundMusic);
