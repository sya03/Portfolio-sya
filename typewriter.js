document.addEventListener('DOMContentLoaded', function() {
    const typewriterText = document.querySelector('.typewritter-text');
    const words = ["Web Designer", "UI/UX Specialist", "developer ","Digital Creator", "Visual Designer","Interactive Designer","Frontend Developer"];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = '';
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayBetweenWords = 2000;

    function type() {
        if (isDeleting) {
            currentWord = words[wordIndex].substring(0, letterIndex--);
        } else {
            currentWord = words[wordIndex].substring(0, letterIndex++);
        }

        typewriterText.textContent = currentWord;

        if (!isDeleting && letterIndex === words[wordIndex].length) {
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
        }
    }

    type();
});