// Romantic letter content
const letterLines = [
    "From the moment I met you, my world changed completely.",
    "Your smile lights up even my darkest days, and your laughter",
    "is the most beautiful melody I've ever heard.",
    "Every day with you feels like a new adventure, filled with",
    "love, joy, and countless precious moments.",
    "You are not just my partner, but my best friend, my confidant,",
    "and the love of my life. Thank you for being you.",
    "I promise to love you today, tomorrow, and always."
];

const signature = "Forever yours, with all my love ❤️";

// Typing animation function
function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                resolve();
            }
        }, speed);
    });
}

// Function to add typing cursor
function addTypingEffect(element) {
    element.classList.add('typing');
}

// Function to remove typing cursor
function removeTypingEffect(element) {
    element.classList.remove('typing');
    element.classList.add('completed');
}

// Main animation sequence
async function startLetterAnimation() {
    // Wait a moment before starting
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Type each line with a delay between them
    for (let i = 0; i < letterLines.length; i++) {
        const lineElement = document.getElementById(`line${i + 1}`);
        addTypingEffect(lineElement);
        await typeText(lineElement, letterLines[i], 80);
        removeTypingEffect(lineElement);
        
        // Pause between lines
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Type the signature
    const signatureElement = document.getElementById('signature');
    addTypingEffect(signatureElement);
    await typeText(signatureElement, signature, 100);
    removeTypingEffect(signatureElement);
    
    // Wait a moment then show surprise
    await new Promise(resolve => setTimeout(resolve, 2000));
    showSurprise();
}

// Function to show the surprise
function showSurprise() {
    const surpriseContainer = document.getElementById('surprise');
    surpriseContainer.classList.add('show');
    
    // Add click event to close surprise
    surpriseContainer.addEventListener('click', (e) => {
        if (e.target === surpriseContainer) {
            hideSurprise();
        }
    });
    
    // Add escape key to close surprise
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideSurprise();
        }
    });
}

// Function to hide the surprise
function hideSurprise() {
    const surpriseContainer = document.getElementById('surprise');
    surpriseContainer.classList.remove('show');
}

// Add some interactive effects
function addInteractiveEffects() {
    // Add hover effect to letter container
    const letterContainer = document.querySelector('.letter-container');
    letterContainer.addEventListener('mouseenter', () => {
        letterContainer.style.transform = 'scale(1.02)';
        letterContainer.style.transition = 'transform 0.3s ease';
    });
    
    letterContainer.addEventListener('mouseleave', () => {
        letterContainer.style.transform = 'scale(1)';
    });
    
    // Add click effect to hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            heart.style.animation = 'none';
            heart.style.transform = 'rotate(-45deg) scale(1.5)';
            heart.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                heart.style.animation = 'float 6s ease-in-out infinite';
                heart.style.transform = 'rotate(-45deg) scale(1)';
            }, 300);
        });
    });
}

// Create additional floating hearts during typing
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.opacity = '0.8';
    
    document.body.appendChild(heart);
    
    // Animate the heart floating up
    let position = window.innerHeight;
    const floatInterval = setInterval(() => {
        position -= 2;
        heart.style.top = position + 'px';
        heart.style.transform = `translateX(${Math.sin(position / 50) * 20}px)`;
        
        if (position < -50) {
            clearInterval(floatInterval);
            document.body.removeChild(heart);
        }
    }, 16);
}

// Start floating hearts periodically during animation
function startFloatingHearts() {
    const heartInterval = setInterval(() => {
        createFloatingHeart();
    }, 3000);
    
    // Stop after letter is complete
    setTimeout(() => {
        clearInterval(heartInterval);
    }, (letterLines.length * 2000) + 5000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    addInteractiveEffects();
    startFloatingHearts();
    startLetterAnimation();
});

// Add some sparkle effects
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '16px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add sparkles on mouse move over letter
document.querySelector('.letter-container').addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) { // 10% chance to create sparkle
        createSparkle(e.clientX, e.clientY);
    }
});