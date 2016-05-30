'use strict';

window.handlers = {};

handlers.attachClick = function(e, fn) {
  e.addEventListener('click', fn);
};

// ----------------------------------------------------------------------------

// Exercise 1A. Assigning event handlers with callback functions.
// Write a function that takes an HTML element object e and a function
// fn and assigns the "hover" event to fire function fn when element e
// is hovered over.

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

// Exercise 2. Using attachClick(), write a function that finds all
// elements with the class "button" and attaches a click event thert each time 
// any of the buttons are clicked. Return an array of the elements you 
// attached to.

// Hint: Trigger JavaScript alerts with the built-in function 
// alert("your message")!

// ex. handlers.attachAlerts('btn') 
//     -> [ <button class="btn" id="1">Button 1</button>,
//          <button class="btn" id="2">Button 2</button>,
//          <button class="btn" id="2">Button 3</button> ]

handlers.attachAlerts = function(className) {
  var els = $("." + className).toArray();
  els.forEach(function(button) {
    handlers.attachClick(button, function(e) {
      alert(e.currentTarget.id);
    });
  });
  return els;
};

handlers.attachAlerts("btn");

// ----------------------------------------------------------------------------
