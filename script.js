const typingText = document.querySelector('.typing-box p');
const inputField = document.querySelector('.input-field');
const timeEl = document.querySelector('.time span b');
const mistakesEl = document.querySelector('.mistake span');
const wpmEl = document.querySelector('.wpm span');
const cpmEl = document.querySelector('.cpm span');
const tryAgainBtn = document.querySelector('.btn');

const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "A journey of a thousand miles begins with a single step. Lao Tzu reminds us that great things start with small beginnings.",
    "To be or not to be, that is the question. A famous soliloquy from William Shakespeare's play Hamlet.",
    "All that glitters is not gold. This proverb teaches us that appearances can be deceptive and true value lies within.",
    "In the middle of difficulty lies opportunity. Albert Einstein's words encourage a positive outlook during challenging times.",
    "The only thing we have to fear is fear itself. A powerful quote from Franklin D. Roosevelt's inaugural address."
];

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakeCount = 0;
let isTyping = false;

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const paragraph = paragraphs[randomIndex];
    typingText.innerHTML = '';
    for (const char of paragraph) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    typingText.addEventListener('click', () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    const typedValue = inputField.value;
    if (charIndex >= characters.length || timeLeft <= 0) {
        clearInterval(timer);
        return;
    }
    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    let currentMistakes = 0;
    for (let i = 0; i < characters.length; i++) {
        characters[i].classList.remove('correct', 'incorrect', 'active');
        if (i < typedValue.length) {
            if (typedValue[i] === characters[i].innerText) {
                characters[i].classList.add('correct');
            } else {
                characters[i].classList.add('incorrect');
                currentMistakes++;
            }
        }
    }
    charIndex = typedValue.length;
    if (charIndex < characters.length) {
        characters[charIndex].classList.add('active');
    }
    mistakeCount = currentMistakes;
    mistakesEl.innerText = mistakeCount;
    updateStats();
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeEl.innerText = timeLeft;
    } else {
        clearInterval(timer);
        inputField.disabled = true;
    }
}

function updateStats() {
    let correctChars = charIndex - mistakeCount;
    let cpm = ((correctChars) / (maxTime - timeLeft)) * 60;
    cpm = cpm < 0 ? 0 : Math.round(cpm);
    cpmEl.innerText = cpm;
    let wpm = Math.round(cpm / 5);
    wpmEl.innerText = wpm;
}

function resetGame() {
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakeCount = 0;
    isTyping = false;
    timeEl.innerText = timeLeft;
    mistakesEl.innerText = 0;
    wpmEl.innerText = 0;
    cpmEl.innerText = 0;
    inputField.value = "";
    inputField.disabled = false;
    loadParagraph();
    inputField.focus();
}

loadParagraph();
inputField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);
