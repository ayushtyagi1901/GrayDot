// Get the containers
var container1 = document.getElementById("container1");
var container2 = document.getElementById("container2");
var draggedItems = []; // New array to store dragged items

// Add event listeners to enable dragging
var items = container1.getElementsByClassName("item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("dragstart", dragStart);
  items[i].addEventListener("dragend", dragEnd);
}

// Add event listeners to enable dropping
container2.addEventListener("dragover", dragOver);
container2.addEventListener("drop", drop);

// Drag and Drop Functions
function dragStart(event) {
  // Add "dragged" class to the dragged item
  event.target.classList.add("dragged");
  
  // Add the dragged item to the draggedItems array
  draggedItems.push(event.target);
}

function dragEnd(event) {
  // Remove "dragged" class from the dragged item
  event.target.classList.remove("dragged");
  
  // Remove the dragged item from the draggedItems array
  var index = draggedItems.indexOf(event.target);
  if (index > -1) {
    draggedItems.splice(index, 1);
  }
}

function dragOver(event) {
  // Prevent default to allow dropping
  event.preventDefault();
}

function drop(event) {
  // Prevent default action (open as link)
  event.preventDefault();
  
  // Remove the dragged item from the first container
  var draggedItem = document.querySelector(".dragged");
  container1.removeChild(draggedItem);
  
  // Append the dragged item to the second container
  container2.appendChild(draggedItem);
  
  // Add the dragged item to the draggedItems array
  draggedItems.push(draggedItem);
  
  // Display success message
  var successMessage = document.getElementById("successMessage");
  successMessage.innerText = "Item dropped successfully!";
}

// Reset Function
function resetContainers() {
  // Clear the second container
  container2.innerHTML = '<div class="container-title">Container 2</div>';

  // Reset the first container
  var itemsArray = Array.from(draggedItems);
  itemsArray.forEach(function (item) {
    container1.appendChild(item);
  });

  // Clear the success message
  var successMessage = document.getElementById("successMessage");
  successMessage.innerText = "";

  // Clear the draggedItems array
  draggedItems = [];
}