# Week 2, Day 3 Exercises: jQuery, how I love thee

## Inline Exercises

1. [Single click hander](http://codepen.io/moose-horizons/pen/rWbVjj?editors=1011)
1. [Many click handlers](http://codepen.io/moose-horizons/pen/WoWvpN?editors=1010)
1. [Image selector](http://codepen.io/moose-horizons/pen/ObGVwL?editors=1011) 

## Pair Programming Exercises

1. [Collapsible comment threads](comment_threads/README.md)

## Modal Alert

## Threaded conversations

TODO DELETE STUFF BELOW

## A review of the DOM

Now that you've mastered your skills in HTML and CSS from
media queries to responsive web design, it's time to put it
all together with JavaScript. Using the elements of JavaScript
you learned last week, you will be now be adding _behavior_ to
your webpages with a handy tool called the **Document Object Model** (DOM) - 
we talked about this during the lesson.

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

To make DOM manipulation and certain tasks easier over these next few
days, we're going to make use of a library called [jQuery](http://jquery.com).

Everything that we accomplish in jQuery can be done without jQuery at all,
and we will show you examples along the way of how to handle events,
make asynchronous network requests, and more with and without jQuery.

For the purposes of our projects, we will be using jQuery for simplicity
and readability.

jQuery begins with a global variable referenced by the dollar sign: `$`.
One example where jQuery comes in handy is in referring to an element or
group of elements in our HTML quickly. Compare the following:

<sub>HTML</sub>
```html
<p class="detail" id="dog">Click for a dog</p>
<p class="detail" id="cat">Click for a cat</p>
<p class="detail" id="moose">Click for a moose</p>
```

<sub>JavaScript (no jQuery)</sub>
```javascript
document.getElementsByClass("detail").forEach(function(el) {
    el.addEventListener("click", function(e) {
    // The function passed to handle a click event (the event handler)
    // can optionally take a parameter that represents information
    // related to the event (key pressed, position of mouse, time, etc.)
        alert("You clicked me! Here is your " + e.currentTarget.id);
    }); 
});

```

<sub>JavaScript (with jQuery)</sub>
```javascript
$(".detail").on("click", function(e) {
    alert("You clicked me! Here is your " + e.currentTarget.id);
});
```

As you can see, jQuery allows us to refer to all elements with the "detail"
class as simply as `$(/* selector */)` - where **selector** refers to
CSS ID's, classes, element types, or existing variables with element objects.

See more about jQuery selectors here: 
 [https://api.jquery.com/category/selectors/](https://api.jquery.com/category/selectors/)

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

## Pair programming: Making Horello dynamic


Head into [`5_making_horello_dynamic`](5_making_horello_dynamic/README.md) to get started!


