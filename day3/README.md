# JavaScript, jQuery, and the DOM: Making your app dynamic

## A review of the DOM

Now that you've mastered your skills in HTML and CSS from
media queries to responsive web design, it's time to put it
all together with JavaScript. Using the elements of JavaScript
you learned last week, you will be now be adding _behavior_ to
your webpages with a handy tool called the **Document Object Model** (DOM) 
- we talked about this during the lesson.

As a review, the DOM is a JavaScript object accessible in a web
browser to dynamically update its contents. For example:

<sub>HTML</sub>

```html
<h3 id="heading">Hello!</h3>
```

<sub>JavaScript</sub>

```javascript
var name = "Horizons";
document.getElementById("heading").innerHTML = "Hello," + name + "!";
```

would result in:
### Hello Horizons!

The `document` object allows us to access these elements and manipulate 
them as easily as changing JavaScript properties, and the changes are
updated automatically on your webpage.

## A review of jQuery

TODO - introduce jQuery library

## Individual exercises: Handling events

We'll be starting today's exercises by learning how to respond to events 
triggered by the user's browser - from detecting clicks on certain HTML elements
to picking up each character 

In JavaScript, we can add an event listener by using the following format: 

<sub>HTML</sub>

```html
<button id="btn">Don't press me</button>
```

<sub>JavaScript</sub>

```javascript
document.getElementById("btn").addEventListener("click", function() {
	alert("nice");
));
```

This will cause the function we pass in to `addEventListener` (which in this case
pops an alert) to fire when the event we pass in (the "click" event) is triggered
by the element we are adding the event handler to (the button with ID "btn").

Now head over to the folder `1_handling_events` within this directory and begin
creating events of your own!

## Pair programming: Building Horello with CRUD

TODO - introduce flow for CRUD operations on Horello

## Pair programming: Handling events in Horello
