/* dynamic-post.js */


// Selecting DOM elements
const postForm = document.querySelector('#post-form');
const postTitleInput = document.querySelector('#post-title');

const addCodeExplanationBtn = document.querySelector('#add-code-explanation');
const codeExplanationsContainer = document.querySelector('#code-explanations-container');

const addConsoleSimulationBtn = document.querySelector('#add-console-simulation');
const consoleSimulationsContainer = document.querySelector('#console-simulations-container');

const addCodeExampleBtn = document.querySelector('#add-code-example');


// Initializing variable to keep track of element order
var nextElementOrderId = 0;



// Function to add a console line to a given container
function addConsoleLine(consoleLinesContainer) {
    const consoleLineWrapper = document.createElement('div');
    consoleLineWrapper.classList.add('console-line');
    // Creating and appending line type select element
    const lineTypeSelect = document.createElement('select');
    lineTypeSelect.classList.add('line-type');
    const inputOption = document.createElement('option');
    inputOption.value = 'console-line-input';
    inputOption.textContent = 'Console Input';
    const outputOption = document.createElement('option');
    outputOption.value = 'console-line-output';
    outputOption.textContent = 'Console Output';
    lineTypeSelect.appendChild(inputOption);
    lineTypeSelect.appendChild(outputOption);
    consoleLineWrapper.appendChild(lineTypeSelect);

    // Creating and appending console line content input element
    const consoleLineContent = document.createElement('input');
    consoleLineContent.type = 'text';
    consoleLineContent.placeholder = 'Enter console line content';
    consoleLineContent.classList.add('console-line-content');
    consoleLineWrapper.appendChild(consoleLineContent);

    // Appending console line wrapper to container
    consoleLinesContainer.appendChild(consoleLineWrapper);
}

// Event listener for add code explanation button
addCodeExplanationBtn.addEventListener('click', () => {
    const codeExplanationWrapper = document.createElement('div');
    codeExplanationWrapper.classList.add('code-explanation');

    // Creating code explanation wrapper element
    const codeExplanationTitleLabel = document.createElement('label');
    codeExplanationTitleLabel.textContent = 'Code Explanation Title';
    codeExplanationWrapper.appendChild(codeExplanationTitleLabel);

    // Creating and appending code explanation title label and input elements
    const codeExplanationTitle = document.createElement('input');
    codeExplanationTitle.type = 'text';
    codeExplanationTitle.placeholder = 'Enter code explanation title';
    codeExplanationTitle.classList.add('code-explanation-title');
    codeExplanationWrapper.appendChild(codeExplanationTitle);

    // Creating and appending code explanation content label and textarea elements
    const codeExplanationContentLabel = document.createElement('label');
    codeExplanationContentLabel.textContent = 'Code Explanation Content';
    codeExplanationWrapper.appendChild(codeExplanationContentLabel);

    const codeExplanationContent = document.createElement('textarea');
    codeExplanationContent.rows = '5';
    codeExplanationContent.placeholder = 'Enter code explanation content';
    codeExplanationContent.classList.add('code-explanation-content');
    codeExplanationWrapper.appendChild(codeExplanationContent);

    // Set the correct data-order-id attribute for code explanation elements
    nextElementOrderId++;
    codeExplanationWrapper.setAttribute('data-order-id', nextElementOrderId);

    // Appending code explanation wrapper to container
    codeExplanationsContainer.appendChild(codeExplanationWrapper);
});

// Event listener for add console simulation button
addConsoleSimulationBtn.addEventListener('click', () => {

    // Creating console simulation wrapper element
    const consoleSimulationWrapper = document.createElement('div');
    consoleSimulationWrapper.classList.add('console-simulation');

    // Creating and appending add console line button element
    const addConsoleLineBtn = document.createElement('button');
    addConsoleLineBtn.textContent = 'Add Console Line';
    addConsoleLineBtn.type = 'button';
    addConsoleLineBtn.classList.add('add-console-line');
    consoleSimulationWrapper.appendChild(addConsoleLineBtn);

    const consoleLinesContainer = document.createElement('div');
    consoleLinesContainer.classList.add('console-lines-container');
    consoleSimulationWrapper.appendChild(consoleLinesContainer);

    addConsoleLineBtn.addEventListener('click', () => {
        addConsoleLine(consoleLinesContainer);
    });
    addConsoleLine(consoleLinesContainer);

    nextElementOrderId++;
    consoleSimulationWrapper.setAttribute('data-order-id', nextElementOrderId);
    consoleSimulationsContainer.appendChild(consoleSimulationWrapper);
});

// Event listener for add code example button
addCodeExampleBtn.addEventListener('click', () => {
    const codeExampleWrapper = document.createElement('div');
    codeExampleWrapper.classList.add('code-example');

    // Creating and appending code example content label and input elements
    const codeExampleContentLabel = document.createElement('label');
    codeExampleContentLabel.textContent = 'Code Example Content';
    codeExampleWrapper.appendChild(codeExampleContentLabel);

    const codeExampleContent = document.createElement('textarea');
    codeExampleContent.rows = '5'; // Set the number of rows for the textarea
    codeExampleContent.placeholder = 'Enter code example content';
    codeExampleContent.classList.add('code-example-content');
    codeExampleWrapper.appendChild(codeExampleContent);

    // Set the correct data-order-id attribute for code example elements
    nextElementOrderId++;
    codeExampleWrapper.setAttribute('data-order-id', nextElementOrderId);

    // Appending code example wrapper to the same container as code explanations
    codeExplanationsContainer.appendChild(codeExampleWrapper);
});

// Handle form submission
postForm.addEventListener('submit', async event => {
    event.preventDefault();
    const post = {
        title: postTitleInput.value,
        codeExplanations: [],
        consoleSimulations: [],
        codeExamples: []
    };

    // Add code explanations to post
    const codeExplanationElements = document.querySelectorAll('.code-explanation');
    codeExplanationElements.forEach(element => {
        const orderId = parseInt(element.getAttribute('data-order-id'));
        console.log('Element:', element);
        const titleElement = element.querySelector('.code-explanation-title');
        console.log('Title Element:', titleElement);
        const title = titleElement.value;
        console.log('Title:', title);
        const content = element.querySelector('.code-explanation-content').value;
        post.codeExplanations.push({
            order_id: orderId,
            title: title,
            content: content
        });
    });

    // Add console simulations to post
    const consoleSimulations = document.querySelectorAll('.console-simulation');
    consoleSimulations.forEach(simulation => {
        const orderId = parseInt(simulation.dataset.orderId);
        const consoleLines = Array.from(simulation.querySelectorAll('.console-line'));
        const consoleSimulation = consoleLines.map(line => ({
            type: line.querySelector('.line-type').value,
            content: line.querySelector('.console-line-content').value
        }));
        post.consoleSimulations.push({ order_id: orderId, lines: consoleSimulation });
    });

    // Add code examples to post
    const codeExampleContents = document.querySelectorAll('.code-example-content');
    codeExampleContents.forEach(content => {
        const orderId = parseInt(content.closest('.code-example').dataset.orderId);
        post.codeExamples.push({
            order_id: orderId,
            content: content.value
        });
    });

    console.log(post);

    // Send post to server and handle response
    try {
        const response = await fetch('/dynamic-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });


        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const result = await response.json();
        console.log('Post submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting post:', error);
    }
});

