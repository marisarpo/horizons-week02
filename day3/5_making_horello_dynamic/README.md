# Making Horello dynamic

Most of the applications you worked on last week were pretty simple.
They just involved things like manipulating data, or printing
information to the console. (You need to learn to walk before you can
run, grasshopper.)

Real, fully-fledged modern applications are far more complex. Even an
app that seems relatively simple, such as iMessage/SMS/Whatsapp,
actually has hundreds (perhaps thousands) of different components that
serve different purposes and interact in complex ways. And truly complex
applications--think of Microsoft Office, or Amazon.com, or the software
that controls an airplane or a rocket--can have tens of millions of
lines of code.

You learned yesterday about the concept of _abstraction_, how we can
break a complex application down into simpler components, and organize
them into a logical hierarchy, e.g., Horello is composed of a Board that
contains Lists which each contain Cards. This is component abstraction.

There's another way that we can break down a complex application, in
terms of _function_. A large company is divided into departments such as
Human Resources, Accounting, Sales, and Marketing. A building has a
foundation, walls, doors, windows, plumbing and wiring, etc. In the same
fashion, we can break an application down into functional components.

Over the past couple of days, you built the visual components of the
Horello web application using HTML, CSS and a little Javascript. This is
called the "view."

Today we're going to begin adding the plumbing that turns your pretty
static web page into a fully-fledged, interactive, dynamic web
application.

There are still three critical missing pieces in the Horello app:

- data model
- events
- networking

The data model (a.k.a. "model") allows us to create, read, update, and
delete the data elements in the application: the lists and cards. Before
we can manipulate these objects, we need to teach the computer about
these objects. That's where the data model comes in.

Events are the wiring that ties the view to the model. It's how we make
our buttons and form fields actually do something useful: in our case,
creating and modifying cards and lists.

Finally, networking allows our application, running on a web browser on
our computer, to talk to another computer which stores, aggregates, and
manipulates data from lots of different users. This computer is called
a server, and it contains a database where our data will be persisted.
The server and the database are often referred to in the abstract as
"the cloud."

We're going to tackle the model and the events today, and we'll work on the
networking tomorrow. Our goal for today is to recreate this [live] version of
the web app.

## PART 1. Data model

Before we can make our application dynamic--allowing the user to create
and edit cards and lists--we need a way to represent those objects in the
computer's memory (and, later, we'll also need a way to pass that
information to and read it from the server). In this part, you'll set up
classes and a few helper methods to represent the application's
components: the board, lists, and cards.

Recall from last week how we define classes with properties and methods,
e.g.:

    var Person = function(name) {
      this.name = name;
    };

    Person.prototype.getName = function() {
      return this.name;
    };

In order to make the data model dynamic, so that it's easy to create new
elements and edit existing ones, we need to introduce a pair of methods
called "getters" and "setters." It's pretty self-explanatory: `get` is
used to read a property, and `set` is used to set, modify, or unset a
property.

In the case of Horello cards, for instance, for each of the card's
properties--its title and its description--we need a get method to read
the property and set method to modify it. In other words,
`Card.prototype` should contain `getTitle`, `setTitle`,
`getDescription`, and `setDescription`.

(If you're curious why we need getters and setters in the first place,
rather than just directly modifying the class data elements, the short
answer is that we're providing ourselves extra flexibility: in case we
later decide to change the way we retrieve or modify the data in
question, in case we need to do more than just get or set the data
value, etc. For more information read
[Why use getters and setters?](http://stackoverflow.com/questions/1568091/why-use-getters-and-setters).)

Open up [1_horello_data_model.html] and [1_data_model.js] and follow the
instructions in the comments to create the necessary classes and helper
methods to satisfy the tests.

[1_data_model.js]:./skeleton/js/1_data_model.js
[1_horello_data_model.html]:./skeleton/1_horello_data_model.html
[live]: http://horizons-school-of-technology.github.io/week02/day3/5_making_horello_dynamic/skeleton/3_horello_events.html

This part has three phases:

- PHASE 1. Card
- PHASE 2. List
- PHASE 3. Board

## PART 2. Render

You crushed that data model didn't you? We know. We knew you'd find that
a piece of cake. That's why we've cooked up something extra special for
you in this next part. Extra special as in "extra friggin' crazy hard."
Crazy hard like Chuck Norris's abs of steel.

Now that the data model is in place, we need to tie it to the view. In
other words, we need to take the data in the model and turn it into
visual components on the screen that the user can view and interact
with. This process is known as _rendering._

Take a look at the HTML from the [solution to yesterday's
project][previous]. Find the `card` class and look at the HTML that's
used to render a card. It looks like this:

    <div class="card" data-toggle="modal"
         data-target="#cardEdit">
            <span class="card-more">
                <span class="glyphicon glyphicon-align-left"></span>
            </span>
        <div class="card-body">
           (card title here)
        </div>
    </div>

Our goal in this part of the project is to turn a `Card` object, which
you defined in the previous part, into HTML like this. Note that you'll
have to replace `(card title here)` with the actual title of the
card--that's the dynamic part!

You'll accomplish this using jQuery, which allows you to quickly and
easily create HTML elements and tie them together on the fly. You'll be
using the [`jQuery(html)`][jquery] syntax (which can also be written
`$(...)`) and the [append] function.

To get started, open up [2_horello_render.html] in your browser and
[2_render.js] in your text editor.

Take a look at `horello.Card.prototype.render` in [2_render.js], which
has been partly filled in for you as an example. Go ahead and complete
this function, then fill in all of the other `render()` functions based
on this example. Here are a few tips:

- Cards have dynamic titles and descriptions. The description isn't
  displayed before you tap on a card, but the `card-more` icon should
  only be displayed if the card has a description.
- Lists have a dynamic title, and a dynamic list of Cards.
- The Board has a dynamic list of Lists.

This part has three phases, which you can follow in [2_render.js].

- PHASE 1. Card
- PHASE 2. List
- PHASE 3. Board

[2_render.js]:./skeleton/js/2_render.js
[2_horello_render.html]:./skeleton/2_horello_render.html
[previous]: http://horizons-school-of-technology.github.io/week02/day2/2_horello/solution/index.html
[jquery]: http://api.jquery.com/jQuery/#jQuery2
[append]: http://api.jquery.com/append/

## PART 3. Events

At this point you're probably thinking, come on guys, I agreed to spend
all summer with you, and all I've got so far is a headache from lack of
sleep, a nifty T-shirt, and a half-baked app that looks pretty but
doesn't even do anything yet. Oh, wait, you don't have a T-shirt yet, do
you? I guess that leaves you with just a half-baked app. But wait,
there's more! Your half-baked app is about to become three-quarters
baked!

Let's recap: you have a view, laying out each of the components of the
application (cards, lists, and a board). And now you have a data
structure in place to store the app data, and that data structure can
render the data to the view. The last piece is wiring everything up so
that the buttons and forms in the app do what you expect. For example,
tapping "Add a list", entering a list title, and hitting "Save" should
cause a new list to be created, and it should cause that list to appear
on the board.

We can accomplish this using events. Recall from today's lecture and
from the last exercise how events work: we attach them to an _element,_
for a particular _event_ (e.g., "click"), and when they're triggered
they execute a _function._

To get started, open up [3_horello_events.html] in your browser and
[3_events.js] in your text editor.

### PHASE 1. Static events: add list button

Our app has two types of events: static events and dynamic events.
Static events are connected once, when the page is loaded, and they
never change because the elements they refer to never change. For
example, the "Add a list..." button on the main board never disappears
and its function never changes. It always does precisely the same thing
(it reveals a hidden form that lets you add a new list).

Dynamic events, on the other hand, change as the elements they're
connected to change. For example, tapping on a card brings up a modal
that lets you edit that card. But we can't create that event until the
card is created, and if the card is removed, we have to remove the
corresponding event. We refer to this type of event as a dynamic event.

In this phase of the project we're going to start by wiring up the
static events. The events are configured in a function called
`horello.mountStatic` in [3_events.js]. ("Mount" refers to the action of
attaching, or mounting, the dynamic view data that you generated in the
last section into the DOM so that you can see and interact with it.)

Find that function and add the events per the instructions. One event
has been configured for you as an example. You'll add the events using
the [jQuery on][on] method. Here are some tips:

- Recall from the Bootstrap Javascript plugins docs that we saw yesterday
  that you can make the Bootstrap elements, such as the collapse and
  modal, activate using Javascript (yesterday we did it using HTML
  tags). For e.g. collapse, see [Bootstrap collapse
  usage][collapse]. You'll need to make these work using Javascript this
  time.
- Some other jQuery methods that you may find useful include [val],
  [data], and [focus].
- You can add events (using [on]) with different types of jQuery
  selectors. jQuery selectors work the same way as CSS selectors. For
  instance, `$('.myClass')` will select _all elements with the CSS class
  `myClass`_. Think carefully about how to select the relevant elements
  (the first few have been filled in to get you started).
- Consider when, how, and how often you need to mount the board.

[on]: http://api.jquery.com/on/
[collapse]: http://getbootstrap.com/javascript/#collapse-usage
[val]: http://api.jquery.com/val/
[focus]: https://api.jquery.com/focus/

### PHASE 2. Adding IDs

One of the problems we face as we begin to add events to our application
is how to reuse one app element to display, or modify, different data
elements. This is a very common pattern: in the phone book app in your
smartphone, if you tap on someone's name, a screen appears that lets you
view that contact. If you tap "edit", a form appears that lets you edit
the contact. These views--the "view contact" screen and the "edit
contact" form--are always the same, i.e., they are each a single
component of the application, but they can be used to view and edit data
for any data item.

In Horello we face this challenge with the modal. We use the same modal
to view, and edit, every card, meaning that the content of the
modal--the card title and description--has to also be dynamic, depending
which card the user clicked! jQuery solves this problem using data
elements.

A [jQuery data element][data] allows us to attach arbitrary data to any
HTML element. There are a few ways to do this, including:

- Adding a `data-something="value"` tag to the element's HTML, which
  causes it to have a data element called "something" with a value of
  "value".
- Calling `.data('something', 'value')` on the jQuery selector, which
  has precisely the same effect.

This is where those list and card IDs come in. We can't easily pass
around actual List and Card objects, and we can't easily store them in
our DOM, but we can easily pass around their IDs, attach them to
elements in the DOM, and refer to them inside of events easily enough.
Spend a few minutes thinking about which events will require IDs, and
about how to pass the required data to these events.

Go back to the `render` methods you wrote, and attach `data-*`
properties to the elements as necessary--you'll need them for the next
phase.

Here are some hints:
- Don't confuse list ID and card IDs with the `id` HTML tag used for
  CSS/jQuery selectors! These concepts have nothing to do with each
  other.

[data]: https://api.jquery.com/jquery.data/

### PHASE 3. Create card

Let's now set up the events to wire up the "Add a card..." button and
form. This one is a bit trickier since we can't just do this once, when
the board is mounted, as we did for the "Add a list..." button. Why not?

Because we'll be adding cards to our lists! And each time we add a card,
we need to wire up its controls. That makes these events dynamic. Find
the `horello.mount` function in [horello.js]. This function can be
called multiple times, when our data changes, so we need to add events
which _depend upon the data_ here.

Fill in the missing event selectors inside this function. Note that each
button for each card needs to have a unique (CSS) ID so that you can
display the right form. You also need to make sure that the (data) IDs
you added in the last phase are being passed around properly so that
you're adding the card to the right list. (Again, don't confuse these
two kinds of IDs.)

### PHASE 4. Edit card

The final step for this project is wiring up the functionality that lets
you edit a card. When the user taps on a card, the app should display a
modal with a form that's pre-populated with the current data for that
card (title and description). If the user edits that data and hits Save,
the data should be validated (they cannot remove the card title), the
card data should be updated in memory and on the board, and the modal
should dismiss.

This is the trickiest part because, as described above, and unlike the
"Add a card..." forms, we use a single modal component to modify all
cards. We'll leave the design and implementation of these events up to
you.

When you finish this step, whirl around the room like a ballerina to let
your classmates know how amazing you are. Seriously. You just finished
your first fully-fledged dynamic web application. If your mom could see
you now!

But we don't rest on our laurels for long. That's not how we roll here.
Because tomorrow we're on to bigger and better things: adding networking
to your app.

[3_events.js]:./skeleton/js/3_events.js
[3_horello_events.html]:./skeleton/3_horello_events.html