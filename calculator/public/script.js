// calculator/public/script.js
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = Array.from(document.querySelectorAll('.buttons button'));
  const scientificButtons = Array.from(document.querySelectorAll('.scientific button'));

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.innerText === '=') {
        try {
          display.value = eval(display.value);
        } catch {
          display.value = 'Error';
        }
      } else {
        display.value += button.innerText;
      }
    });
  });

  scientificButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Implement scientific functions here
    });
  });

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const scientificToggle = document.getElementById('scientific-toggle');
  const calculator = document.querySelector('.calculator');

  // Theme Detection
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  scientificToggle.addEventListener('change', () => {
    document.querySelector('.scientific').classList.toggle('hidden');
  });
});
