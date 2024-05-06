const form = document.getElementById('nameForm');
const nameInput = document.getElementById('name');
const newForm = document.getElementById('newForm');
const bttn = document.getElementById('bttn');
let newbttn = '';
let newInfo = '';
let hasForm = false;
// Assuming the ID is correct
let prevInput = '';
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission
  bttn.disabled = true;
  newForm.textContent = '';
  // Disable the submit button to prevent multiple submissions
  const prompt = nameInput.value;

  if (!prompt) {
    console.error('Please enter some text in the prompt field.');
    return;
  }
  prevInput = prompt;
  nameInput.value = '';
  const newElement = document.createElement('p');
  newElement.classList.add(
    'flex',
    'flex-col',
    'space-y-6',
    'w-full',
    'max-w-md',
    'mx-auto',
    'p-2',
    'my-8',
    'rounded-md',
    'bg-white'
  ); // Add all class names
  newElement.innerHTML = 'Loading ...';
  newForm.appendChild(newElement);

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Set content type
      body: JSON.stringify({ prompt }), // Send data as JSON
    });

    const data = await response.json();
    const { message, AIfrom } = data;
    console.log(AIfrom);

    // Create a new element (e.g., paragraph) to hold the HTML content
    newForm.textContent = ''; // Clear the loading text
    const newElement = document.createElement('p'); // You can change 'p' to any other HTML element

    // Set the innerHTML of the new element with the AIfrom data (assuming it's HTML)
    newElement.innerHTML = AIfrom;

    // Append the new element to the newForm div to display it
    newForm.appendChild(newElement);

    nameInput.textContent = 'Enter your form description here';
    console.log('Response from server:', data);
  } catch (error) {
    console.error('Error sending data:', error);
  } finally {
    bttn.disabled = false; // Re-enable the submit button

    intializeNew();
  }
});

function intializeNew() {
  newbttn = document.getElementById('newbttn');
  newInfo = newForm.querySelector('textarea:last-child');
  console.log('bttn', newbttn);
  console.log('info', newInfo);
  newbttn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('clicked');
    console.log(newInfo.value);
    let prompt = 'user says '+newInfo.value + ' is most important in context of ' + prevInput +' dont ask personal info'; 
    console.log('prompt', prompt);
    bttn.disabled = true;
    newbttn.disabled = true;

    newForm.textContent = '';
    // Disable the submit button to prevent multiple submissions

    if (!prompt) {
      console.error('Please enter some text in the newInfo field.');
      return;
    }
    prevInput = prompt;
    nameInput.value = '';
    newInfo.value = '';
    const newElement = document.createElement('p');
    newElement.classList.add(
      'flex',
      'flex-col',
      'space-y-6',
      'w-full',
      'max-w-md',
      'mx-auto',
      'p-2',
      'my-8',
      'rounded-md',
      'bg-white'
    ); // Add all class names
    newElement.innerHTML = 'Loading ...';
    newForm.appendChild(newElement);

    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set content type
        body: JSON.stringify({ prompt }), // Send data as JSON
      });

      const data = await response.json();
      const { message, AIfrom } = data;
      console.log(AIfrom);

      // Create a new element (e.g., paragraph) to hold the HTML content
      newForm.textContent = ''; // Clear the loading text
      const newElement = document.createElement('p'); // You can change 'p' to any other HTML element

      // Set the innerHTML of the new element with the AIfrom data (assuming it's HTML)
      newElement.innerHTML = AIfrom;

      // Append the new element to the newForm div to display it
      newForm.appendChild(newElement);

      nameInput.textContent = 'Enter your form description here';
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      bttn.disabled = false; // Re-enable the submit button
      newbttn.disabled = false;
      intializeNew();
    }
  });
}
