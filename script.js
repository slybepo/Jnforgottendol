// Ensures DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const bubbleContainer = document.querySelector('.neon-bubbles');

    // Random bubble creation function
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 60 + 20; // Random size between 20px to 80px
        const xStart = Math.random() * 100; // Start position on X-axis
        const yStart = Math.random() * 100; // Start position on Y-axis
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${xStart}vw`;
        bubble.style.top = `${yStart}vh`;

        bubbleContainer.appendChild(bubble);

        // Remove the bubble after its animation completes
        setTimeout(() => {
            bubble.remove();
        }, 10000); // Remove after 10 seconds
    }

    // Create a bubble every 300ms
    setInterval(createBubble, 300);
});

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Array of words to cycle through
    const words = ['users', 'nice persons', 'developers', 'creative minds'];
    let wordIndex = 0;

    // Grab the element
    const changingWord = document.getElementById('changing-word');

    // Check if element exists
    if (!changingWord) {
        console.error('Element with id "changing-word" not found.');
        return;  // Exit if the element is not found
    }

    // Function to change the word with fade-in/out effect
    function changeWord() {
        // Fade out current word
        changingWord.style.opacity = 0;
        setTimeout(() => {
            // Update word
            wordIndex = (wordIndex + 1) % words.length;
            changingWord.textContent = words[wordIndex];
            // Fade in new word
            changingWord.style.opacity = 1;
        }, 1000); // Wait for fade out before changing text
    }

    // Start the word change every 3 seconds
    setInterval(changeWord, 3000);
});

// Initia
