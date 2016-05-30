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

handlers.attachAlerts = function(className, alertMessage) {
  var els = $("." + className).toArray();
  els.forEach(function(button) {
    handlers.attachClick(button, function() {
      alert(alertMessage);
    });
  });
  return els;

  /* jQuery .on Alternate Solution */
  $("." + className).on("click", function() {
    alert(alertMessage);
  });
  return $("." + className).toArray();
};

handlers.attachAlerts("cutbutton");

// ----------------------------------------------------------------------------

// Next, we'll be jumping into a concept called "event bubbling." Event bubbling
// deals with the order in which events are triggered on the document.
// Try this:

// Exercise 3A. Using attachAlerts(), write a function that alerts the message
// "You've "

