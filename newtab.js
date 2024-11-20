const MAX_ROWS = 20;  // Maximum number of rows to show

window.onload = function() {
  const container = document.getElementById("container");

  // Function to create rows of textboxes, copy buttons, and clear buttons
  function createRows() {
    for (let i = 0; i < MAX_ROWS; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      const input = document.createElement("input");
      input.type = "text";
      input.id = `inputText${i}`;
      input.placeholder = `Enter text for row ${i + 1}`;

      // Check if there's saved text in localStorage
      const savedText = localStorage.getItem(`row${i}`);
      if (savedText) {
        input.value = savedText;  // Set the saved text in the textbox
      }

      const copyButton = document.createElement("button");
      copyButton.id = `copyButton${i}`;

      // Create an image element for the copy icon
      const copyImg = document.createElement("img");
      copyImg.src = "copy-icon.png";  // Path to custom copy icon
      copyImg.alt = "Copy Icon";
      copyImg.style.width = "20px";  // Size of the icon
      copyImg.style.height = "20px"; // Size of the icon

      copyButton.appendChild(copyImg); // Add the icon to the "Copy" button

      // Create the "Clear" button
      const clearButton = document.createElement("button");
      clearButton.id = `clearButton${i}`;

      // Create an image element for the clear icon
      const clearImg = document.createElement("img");
      clearImg.src = "clear-icon.png";  // Path to your custom clear icon
      clearImg.alt = "Clear Icon";
      clearImg.style.width = "20px";  // Size of the icon
      clearImg.style.height = "20px"; // Size of the icon

      clearButton.appendChild(clearImg); // Add the icon to the "Clear" button

      row.appendChild(input);
      row.appendChild(copyButton);
      row.appendChild(clearButton);
      container.appendChild(row);

      // Add event listener for the "Copy" button
      copyButton.addEventListener("click", function() {
        copyToClipboard(i);  // `i` is the row index
      });

      // Add event listener for the "Clear" button
      clearButton.addEventListener("click", function() {
        clearText(i);  // `i` is the row index
      });

      // Save text to localStorage whenever the textbox content changes
      input.addEventListener('input', function() {
        localStorage.setItem(`row${i}`, input.value);
      });
    }
  }

  // Function to copy the text to the clipboard
  function copyToClipboard(rowIndex) {
    const inputElement = document.getElementById(`inputText${rowIndex}`);
    const textToCopy = inputElement.value;

    // Create a temporary input element to copy the text
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

  }

  // Function to clear the text in the textbox for a given row
  function clearText(rowIndex) {
    const inputElement = document.getElementById(`inputText${rowIndex}`);
    inputElement.value = "";  // Clear the text in the input field
    localStorage.removeItem(`row${rowIndex}`);  // Remove saved text from localStorage
  }

  // Function to clear all rows
  function clearAll() {
    for (let i = 0; i < MAX_ROWS; i++) {
      const inputElement = document.getElementById(`inputText${i}`);
      inputElement.value = "";  // Clear the text in each input field
      localStorage.removeItem(`row${i}`);  // Remove all saved text from localStorage
    }
  }

  // Add event listener for the "Clear All" button
  document.getElementById("clearAllButton").addEventListener("click", clearAll);

  createRows();  // Call the function to create the rows when the page loads
};
