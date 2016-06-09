# Warmup exercise: events

## Time limit: 15 minutes

## Background

So far, you've learned how to use HTML and CSS to build pretty web
pages, and you've seen how to use Bootstrap to add your first
interactive elements to those pages. Today, we're going to tie it all
together by adding the plumbing. That plumbing is called _events._ We
can add an event to a DOM element (`elem`) like this:

    elem.addEventListener(event, fn);

Where `event` is an event, such as "click", that we want to attach to,
and `fn` is a function that we want to be triggered on that event. (You
can find a full list of events
[here](https://developer.mozilla.org/en-US/docs/Web/Events).)

## Instructions

1. Create a new codepen (http://codepen.io).
1. Create a button element.
1. Using the Dev Tools, attach an event listener to the button that
   displays an alert when it's pressed. (Hint 1: Use the `$0` trick we
   saw in class. Hint 2: You can display an alert with the `alert(msg)`
   function in Javascript.)
1. Now add that same event using purely Javascript. (Remove the original
   event using .removeEventListener(), or just reload the page to remove
   it.) This means adding it in the "JS" box in codepen, so that if you
   reload the page, the event is still attached to the button. (Hint:
   give the button an ID to make it easier to locate automatically in
   the DOM.)
1. (Bonus) Add a div that changes color when you move the mouse over it,
   using events (i.e., **not** using the `:hover` pseudo-selector).

[live]: http://horizons-school-of-technology.github.io/week02/day2/1_warmup/solution/index.html
