// Function to handle the "Add" button click
document.getElementById('addButton').addEventListener('click', function() {
    var textInput = document.getElementById('textInput');
    var text = textInput.value.trim();
  
    if (text !== '') {
      var existingText = JSON.parse(localStorage.getItem('storedText')) || [];
      existingText.push({ text: text, completed: false });
      localStorage.setItem('storedText', JSON.stringify(existingText));
  
      displayStoredText();
      textInput.value = '';
    } else {
      alert('Please enter some text!');
    }
  });
  
  // Function to display stored text in the list
  function displayStoredText() {
    var displayList = document.getElementById('displayList');
    displayList.innerHTML = '';
  
    var storedText = JSON.parse(localStorage.getItem('storedText')) || [];
  
    storedText.forEach(function(item, index) {
      var listItem = document.createElement('li');
      listItem.textContent = item.text;
  
      if (item.completed) {
        listItem.classList.add('completed');
      }
  
      var deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = '&#10006;';
      deleteButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevents the li click event from firing
        storedText.splice(index, 1);
        localStorage.setItem('storedText', JSON.stringify(storedText));
        displayStoredText();
      });
  
      var tickMark = document.createElement('span');
      tickMark.classList.add('tick-mark');
      tickMark.innerHTML = '&#10003;';
  
      listItem.appendChild(deleteButton);
      listItem.appendChild(tickMark);
      displayList.appendChild(listItem);
  
      listItem.addEventListener('click', function() {
        item.completed = !item.completed;
        storedText[index] = item;
        localStorage.setItem('storedText', JSON.stringify(storedText));
        displayStoredText();
      });
    });
  }
  
  // Display stored text when the page loads
  displayStoredText();
  
  // Retain the entered text in the input field after refreshing the page
  document.getElementById('textInput').value = localStorage.getItem('inputText') || '';
  document.getElementById('textInput').addEventListener('input', function() {
    localStorage.setItem('inputText', this.value);
  });
  