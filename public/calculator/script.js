function appendCharacter(character) {
    const display = document.getElementById('display');
    display.value += character;
  }
  
  function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
  }
  
  function calculateResult() {
    const display = document.getElementById('display');
    try {
      let expression = display.value;
  
      // Handle scientific functions
      expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
      expression = expression.replace(/sin\(/g, 'Math.sin(');
      expression = expression.replace(/cos\(/g, 'Math.cos(');
      expression = expression.replace(/tan\(/g, 'Math.tan(');
      expression = expression.replace(/log\(/g, 'Math.log10('); // log base 10
  
      // Replace exponentiation operator with `**`
      expression = expression.replace(/\^/g, '**');
  
      // Evaluate the expression
      display.value = eval(expression);
    } catch (error) {
      display.value = 'Error';
    }
  }
  