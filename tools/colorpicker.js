/*
meta {
    "title": "Color Picker",
    "description": "A simple tool to pick a color and get its HEX code.",
    "faIcon": "fa-palette"
}
*/

document.addEventListener('DOMContentLoaded', function() {
    // Create the container for the color picker
    const container = document.createElement('div');
    container.className = 'color-picker-container text-center';

    // Create the color input element
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'form-control form-control-color';
    colorInput.id = 'colorInput';
    colorInput.value = '#ff0000'; // Default color

    // Create the label to display the selected HEX value
    const hexLabel = document.createElement('label');
    hexLabel.htmlFor = 'colorInput';
    hexLabel.className = 'form-label mt-3';
    hexLabel.innerHTML = `Selected Color: <span id="hexValue">${colorInput.value}</span>`;

    // Add event listener to update the HEX value when the color changes
    colorInput.addEventListener('input', function() {
        document.getElementById('hexValue').textContent = colorInput.value.toUpperCase();
    });

    // Append the elements to the container
    container.appendChild(colorInput);
    container.appendChild(hexLabel);

    // Append the container to the body
    document.body.appendChild(container);
});

// Styling for the color picker app
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
