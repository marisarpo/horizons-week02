// This is where you will write code to initially render
// the Horello dynamic landing page. We have provided functions
// in utils.js to help with this process. You should only have to
// write logic for the fetching of data (using AJAX), while
// using the given renderers to render HTML elements.

// Calls the render function when the page finishes loading. Then
// calls refreshStatic which adds event listeners to buttons and cards.
$(document).ready(function() {
  render();
  refreshStatic();
});

// Makes an AJAX request to https://api.trello.com/1/boardId and uses
// the response to render the initial Horello board (using renderBoard())
function render() {
  // YOUR CODE HERE
}
