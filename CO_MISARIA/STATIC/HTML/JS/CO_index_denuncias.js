

// --- FAQ - Preguntas frecuentes ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
    });
});
