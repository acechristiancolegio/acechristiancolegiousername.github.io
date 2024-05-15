 // Function to stop spinning and check for winning combinations
 function stopSpinning() {
    clearInterval(spinInterval);

    // Get symbols for each slot
    const symbolsArray = Array.from(slots).map(slot => slot.firstChild.getAttribute('src'));

    // Check for winning combinations
    if ((symbolsArray[0] === symbolsArray[1] && symbolsArray[1] === symbolsArray[2]) ||
        (symbolsArray[0] === symbolsArray[3] && symbolsArray[3] === symbolsArray[6]) ||
        (symbolsArray[0] === symbolsArray[4] && symbolsArray[4] === symbolsArray[8]) ||
        (symbolsArray[2] === symbolsArray[4] && symbolsArray[4] === symbolsArray[6])) {
        // Any winning combination
        alert('Congratulations! You won!');
        balance += betAmount * 2; // Double the bet amount and add it to the balance
        updateBalance(); // Update balance on the dashboard
        stopAutoSpin(); // Stop auto spin if a win occurs
    } else {
        // No winning combination
        balance -= betAmount; // Deduct the bet amount from the balance
        updateBalance(); // Update balance on the dashboard
    }
}