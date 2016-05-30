'use strict';

window.handlers = {};

// Welcome! As mentioned in the README, this is how we would attach
// an event listener without jQuery.

// In this function, we pass in an element object (specified by e) and
// attach an event handler (specified by a function fn) to fire when 
// the click event is called on the element. 

handlers.attachClick = function(e, fn) {
  e.addEventListener('click', fn);
};

// ----------------------------------------------------------------------------

// Exercise 1A. Assigning event handlers with callback functions.
// Write a function that takes an HTML element object e and a function
// fn and assigns the "hover" event to fire function fn when element e
// is hovered over. This time, try doing it jQuery-style. Remember
// that jQuery is used with the $ global variable and we need a selector
// to call jQuery's .on for. 

// Hint: you can pass in an existing element object to the $() selector 
// to select it.

handlers.attachHover = function(e, fn) {
  // YOUR CODE HERE
  $(e).on("hover", fn);
};

// Exercise 1B. Do the same for the "keypress" event, and make sure to
// take a parameter key with the "keycode" of the key to match along with
// the event (e) and function (fn) to call when the event is triggered.
// Listen for the keypress event on the 'document' object rather than a
// specific element e like before.

// Hint: To find keycodes, see: http://keycode.info - each keypress event
// has a keycode attached to it (some common ones include: space is 32,
// return is 13, tab is 9).

handlers.attachKeypress = function(key, fn) {
  // YOUR CODE HERE
  $(document).on("keypress", function(event) {
    if (event.keyCode === key) {
      fn();
    }
  });
};


// ----------------------------------------------------------------------------

// Exercise 2. Write a function that finds all elements with the class "button" 
// and attaches a click event that fires each time any of the buttons are clicked.
// Take parameters className and alertMessage and return an array of the elements 
// you found and attached to.

// Hint: Trigger JavaScript alerts with the built-in function 
// alert("your message")!

// You can convert a jQuery selector referring to multiple elements to an
// array with .toArray() and use handlers.attachClick() to attach your events
// as needed, or you can directly use jQuery's .on(). Your pick!

// ex. handlers.attachAlerts('btn') 
//     -> [ <button class="btn" id="1">Button 1</button>,
//          <button class="btn" id="2">Button 2</button>,
//          <button class="btn" id="2">Button 3</button> ]

handlers.attachAlertsToClass = function(className, alertMessage) {
  var els = $("." + className).toArray();
  els.forEach(function(button) {
    handlers.attachClick(button, function(e) {
      alert(alertMessage);

      // Exercise 4 Solution!
      e.stopPropagation();
    });
  });
  return els;

  /* jQuery .on Alternate Solution */
  $("." + className).on("click", function(e) {
    alert(alertMessage);

    // Exercise 4 Solution!
    e.stopPropagation();
  });
  return $("." + className).toArray();
};

handlers.attachAlertsToClass("cutbutton", "Bad choice!");

// ----------------------------------------------------------------------------

// Next, we'll be jumping into a concept called "event bubbling." Event bubbling
// deals with the order in which events are triggered on the document.
// Try this:

// Exercise 3. Write a function that takes a jQuery-selected element/group
// of elements and attaches event listeners for clicks to the buttons with class
// ".innerbutton" and their parents - the event handler function for the click
// event should look lke the following:

// $(e.currentTarget).css("backgroundColor", "green");
// alert("You've reached " + $(e.currentTarget).attr("description"));
// $(e.currentTarget).css("backgroundColor", "");

// This will highlight the element you're on in green, display the alert,
// and remove the background.

// Note: $(selector).attr(XX) is a way of getting the value of a certain
// HTML element's attribute - for example, you may get the class name of an
// element through $(selector).attr("class"). We've added description attributes
// to .innerbutton's and its parents.

// Hint: You can use check if the current element is the outermost one
// (the document object) by using `$(element).get(0) == document`.
// If you're iterating through the parents of an element beginning
// with .innerbutton, use this and $(selector).parent() to access
// the next outermost element in the DOM hierarchy.

// Bonus: You may write also this recursively by continually calling 
// attachAlertsWithParents() with .parent() after attaching the
// click handler.
handlers.attachAlertsWithParents = function(elements) {
  var currentElement = elements;
  while (currentElement.get(0) !== document) {
    currentElement.on("click", function(e) {
      $(e.currentTarget).css("backgroundColor", "green");
      alert("You've reached " + $(e.currentTarget).attr("description"));
      $(e.currentTarget).css("backgroundColor", "");
    });
    currentElement = currentElement.parent();
  }
  return;
  
  /* Alternate solution with recursion */
  if (elements.length == 0 || elements.get(0) === document) return;
  elements.on("click", function() {
    // Notice how we could have used $(e.currentTarget) again,
    // but we don't - thanks to recursion!
    elements.css("backgroundColor", "green");
    alert("You've reached " + elements.attr("description"));
    elements.css("backgroundColor", "");
  });
  handlers.attachAlertsWithParents(elements.parent());
  return;
};

handlers.attachAlertsWithParents($(".innerbutton"));

// ----------------------------------------------------------------------------

// Did you notice how the order of the click events "bubbled" outward from
// innermost element all the way out to the document object? That's because
// JavaScript events applicable to multiple elements are fired in order of
// how deeply nested they are - the event handler for ".innerbutton" will be
// called before the event handler for its parent ".panel-body", even though
// both were clicked. 

// You might have also noticed that if you tried to click on the first buttons






