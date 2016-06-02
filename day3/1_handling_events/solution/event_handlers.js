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

// Here's the same thing, with jQuery instead:
handlers.attachClick = function(e, fn) {
  $(e).on("click", fn);
}

// ----------------------------------------------------------------------------

// Exercise 1A. Assigning event handlers with callback functions.
// Write a function that takes an HTML element object e and a function
// fn and assigns the "mouseenter" event to fire function fn when element e
// is hovered over. This time, try doing it jQuery-style. Remember
// that jQuery is used with the $ global variable and we need a selector
// to call jQuery's .on for. 

// jQuery Documentation on .on() - https://api.jquery.com/on/

// Hint: you can pass in an existing element object to the $() selector 
// to select it.

handlers.attachHover = function(e, fn) {
  $(e).on("mouseenter", fn);
};

// ----------------------------------------------------------------------------

// Exercise 1B. Same thing as 1A - except this time, assign the passed-in
// handler 'fn' to the "mouseleave" event instead.

handlers.attachUnhover = function(e, fn) {
  $(e).on("mouseleave", fn);
};

// ----------------------------------------------------------------------------

// Exercise 1C. Do the same for the "keypress" event, and take a parameter 
// 'key' with the intended keycode of the key to listen for and a parameter
// 'fn' with a function to call if the key to listen for matches the 
// key pressed.

// Note: To determine what key was called, add a parameter "event" to get the
// "event object" returned by the event listener. The event object is full
// of properties related to the event that was just fired.

// The property of the event object we are looking for in this case is called
// event.keyCode - determine if this matches the "key" parameter passed into
// handlers.attachKeypress. Remember to only call "fn" if this is the case!

// See a full list of properties of the event object here: 
// http://www.w3schools.com/jsref/dom_obj_event.asp#table5

// Hint: To find keycodes, see: http://keycode.info - each keypress event
// has a keycode attached to it (some common ones include: space is 32,
// return is 13, tab is 9).
// Another Hint (!): Listen for the keypress event on the 'document' object 
// rather than a specific element 'e' like before.

handlers.attachKeypress = function(key, fn) {
  $(document).on("keypress", function(event) {
    if (event.keyCode === key) {
      fn();
    }
  });
};

// ----------------------------------------------------------------------------

// Exercise 2. Write a function that simulates storing data on user actions
// when a button on the defuse panel is clicked. Take a parameter id and using
// attachClick(), connect an event handler that updates the userAction variable
// on click events to increment the count for number of clicks by the ID of the
// button ("red", "blue", or "nope").

handlers.userActions = {"red": 0, "blue": 0, "nope": 0};
handlers.attachUserActionRecord = function(id) {
  // YOUR CODE HERE
  handlers.attachClick($("#" + id), function() {
    handlers.userActions[id]++;
    console.log(handlers.userActions);
  });
};

handlers.attachUserActionRecord("red"); // The red wire button
handlers.attachUserActionRecord("blue"); // The blue wire button
handlers.attachUserActionRecord("nope"); // The "run" button

// ----------------------------------------------------------------------------

// Exercise 3. Write a function that triggers the click event when hovering
// over an element for more than 2 seconds.


// TRIGGERING EVENTS
// Here's how we trigger an event on an element programmatically with jQuery:
// $(element).trigger("eventtype") 
// - where eventtype is "click", "mouseenter", etc.

// SETTING & CLEARING TIMEOUTS
// To set a timeout period for hovering over a button before we trigger the
// click event programmatically, we will use the built-in setTimeout function
// in JavaScript. Here's the format for calling setTimeout:

// setTimeout(function() {
//    doSomething();
// }, 3000);

// the function() { doSomething() } represents the action we take when
// the time 3000 (timeout duration in milliseconds) is reached.

// To track timeouts, we're going to use the return value of setTimeout().
// setTimeout returns a number ID that is used to track the timeout and can
// be used to cancel the timeout with the function clearTimeout(id).

// For example:

// var timeout = setTimeout(function() {
//    console.log("hello");
// }, 5000);
// clearTimeout(timeout);

// The above code will not call console.log("hello"), because the timeout
// is cleared immediately after. Note that the variable 'timeout' is a 
// number, and it is used to identify the timeout to clear for clearTimeout().

// With timeouts and programmatic event triggers, use attachHover() to 
// create a timeout with time of 2 seconds for manually triggering a click
// and store the ID of the timeout in a property of handlers.hoverTimeoutNums 
// by the ID of the button element ("red", "blue", or "nope").
// Use attachUnhover() to clear the timeout by accessing the corresponding
// property of handlers.hoverTimeoutNums and passing it into clearTimeout().

handlers.hoverTimeoutNums = {"red": 0, "blue": 0, "nope": 0};
handlers.attachHoverClick = function(id) {
  var el = $("#" + id);
  handlers.attachHover(el, function() {
    handlers.hoverTimeoutNums[id] = setTimeout(function() {
      el.trigger("click");
    }, 2000);
  });
  handlers.attachUnhover($("#" + id), function() {
    clearTimeout(handlers.hoverTimeoutNums[id]);
  }); 
}

handlers.attachHoverClick("red");
handlers.attachHoverClick("blue");
handlers.attachHoverClick("nope");

// ----------------------------------------------------------------------------

// Exercise 4. Write a function that finds all elements with the class "button" 
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

// Exercise 5. Write a function that takes a jQuery-selected element/group
// of elements and attaches event listeners for clicks to the buttons with class
// ".innerbutton" and their parents - the event handler function for the click
// event should look lke the following:

// PUT THIS CODE IN YOUR EVENT HANDLER
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
// again, they will cause the same set of events to pop through. Why is this?

// When we attached alerts to the ".innerbutton" class elements and its parents,
// we assigned an event listener and handler for every one of its parents, 
// the div under those first "cutbuttons" was also given the click event - this
// is why the alert is still shown for "bad choice!" (event is called for
// the innermost element first), but then we also get the events fired for 
// the parent elements. 

// ----------------------------------------------------------------------------

// Exercise 4A. Ceasefire!
// We want to prevent this behavior of the event selectors bubbling up to 
// the parent divs when we click the 'cutbutton'(s). One way to do this is by
// calling the stopPropagation() method on the event object in the parameter
// of the click handler. Scroll back up to your handlers.attachAlertsToClass()
// function, and you should have created something that calls attachClick()
// as follows (your variable names may differ):

    // handlers.attachClick(button, function(e) {
    //   alert(alertMessage);
    //   EXERCISE 4 CODE HERE
    // });

// Note: If you don't yet have an 'e' variable inside the callback function
// (the function passed in as the second argument of attachClick), go ahead
// and add it.

// The 'e' variable represents our event object we described earlier, with
// properties like ".keycode" - remember from the first attachKeypress()
// function?

// This time, we want to call the .stopPropagation() method on the event
// object 'e' - add that where your Exercise 4 code goes (inside of the 
// attachAlertsToClass() function, not here!)

// CODE SHOULD GO IN attachAlertsToClass() ABOVE

// ----------------------------------------------------------------------------

// Exercise 4B. Ceasefire, Part Two
// After you see event bubbling once, it might start to get annoying to
// see an alert for every element and its parent. Before we continue to
// add more event-driven behavior to our buttons, let's undo the work of
// attachAlertsWithParents() with detachAlertsWithParents(). The approach
// is largely going to be the same, but this time, you want to use jQuery's
// built-in .off() function to detach the event handlers we've set on 
// .innerbutton and its parents. 

// Example of .off()
// $('red').on('click', function() { alert("Bad choice!"); });
// $('red').off('click');

// In the example above, $('red') will no longer do anything when clicked because
// we have detached its event handler from it.

handlers.detachAlertsWithParents = function(elements) {
  var currentElement = elements;
  while (currentElement.get(0) !== document) {
    currentElement.off("click");
    currentElement = currentElement.parent();
  }
  return;
};

handlers.detachAlertsWithParents($(".innerbutton"));

// ----------------------------------------------------------------------------

// Exercise 5 - Event Delegation