document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.className = 'color-picker-container text-center';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'form-control form-control-color';
    colorInput.id = 'colorInput';
    colorInput.value = '#ff0000';

    const hexLabel = document.createElement('label');
    hexLabel.htmlFor = 'colorInput';
    hexLabel.className = 'form-label mt-3';
    hexLabel.innerHTML = `Selected Color: <span id="hexValue">${colorInput.value}</span>`;

    colorInput.addEventListener('input', function() {
        document.getElementById('hexValue').textContent = colorInput.value.toUpperCase();
    });

    container.appendChild(colorInput);
    container.appendChild(hexLabel);
    document.body.appendChild(container);
});

const style = document.createElement('style');
style.innerHTML = `
    .color-picker-container {
        max-width: 300px;
        margin: 50px auto;
    }
    .form-control-color {
        width: 100%;
        height: 50px;
        padding: 5px;
    }
`;
document.head.appendChild(style);
