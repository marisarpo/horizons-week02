# Horello: building your first web app

Believe it or not, by this point you've seen all of the fundamental
building blocks of the web: HTML, CSS, Javascript, the Chrome
Developer Tools, and third party libraries. You've got all of the
tools you need to begin building a real web application. You're
probably very used to running applications on your mobile phone and
on your desktop. A web app is exactly the same thing, except that it's
written using this stack of web technologies and runs in your web
browser. You're already familiar with web apps such as Gmail.

Today we're going to lay the foundations for the Horello web app. Over
the next few days, we'll add more sophisticated features such as
interactive elements, data structures and objects, reading and writing
data over the network, and authentication. Today we'll start by laying
out the look and feel of the application.

## A few important details

- You'll be working in the `skeleton/` directory. HTML goes in the
`index.html` file and CSS goes in `css/style.css`. We've provided a
basic HTML and CSS skeleton, and you'll be filling in all of the
details. For many of the places you need to add code, you'll find
comments indicating this, but _not all of these locations are marked._
- We'll be adding interactive elements such as buttons and form fields,
but we're not going to wire up those elements (i.e., make them
interactive) until tomorrow, so for now, most of these elements won't
actually do anything.
- You'll continue working with Bootstrap. This time, the required CSS
and Javascript libraries have already been included.
- Keep the [specifications][specs] in front of you since you'll need
it throughout the project.

[specs]: ./SPECIFICATIONS.md

## Phase 1: Board and Flexbox

Screenshots:
- [start][ss-01a]
- [goal][ss-01b]

Let's begin with the basic Horello board layout. Spend some time getting
familiar with the [live version][live]. We have a title bar at the top
(currently empty but we'll be adding to it later), and lists, with one
or more cards each, laid out left to right. Each list has a button at
the bottom which says "Add a card..." and, all the way on the right,
there's another button which says "Add a list..."

Pay particular attention to the nouns in the previous paragraph. We
have a board composed of lists which, in turn, are composed of cards.
These nouns, and this hierarchical structure, are important for two
reasons. First, as you've probably guessed by now, we'll build our page
layout, components, HTML and CSS using this hierarchy. Second, these
components will form the basis for our app's _data model_ which will
be introduced in depth tomorrow. One of the most powerful tools we
have as developers is _abstraction_: the ability to break down complex
tasks and applications into a managable, hierarchical set of simple
components. You should approach every engineering task with this
mindset.

Let's get started. Load up the skeleton HTML file in your web browser.
You should see something that looks like [this][ss-01a]. It's pretty
sparse: a lovely white canvas for your boundless creativity! In this
phase, we're going to complete the basic page styling: body, header, and
board, and we're going to add the first page element.

Read the [specs] and add the appropriate CSS properties to the [skeleton
CSS] file (look for the PHASE 1 comments). Then look for the PHASE 1
tag in the [skeleton HTML] file and add the "Add a list..." button. See
if you can figure out which combination of HTML tags and CSS classes
you need for this element. Here's a hint: when in doubt, use a `div`.

Recall what we learned in lecture this morning about Flexbox (refresh
your memory by reading
[this][flexbox]). By default, elements on a web page flow from top to
bottom. There are a few ways to place things side by side,
horizontally. You saw two of them yesterday: `float` and `position:
absolute`. Those work well for one-off, static elements such as
images and buttons, but they don't lend themselves to large amounts
of dynamic content such as text or, in our case, lists and cards (by
"dynamic" we mean that you'll be creating, editing, and deleting
cards and lists, and moving them around--and you can't absolutely
position something that moves around!). This is where responsive
layout tools such as Flexbox come in handy. Flexbox is a more natural
way to lay out content flexibly and dynamically.

Turning on Flexbox is as easy as adding the `display: flex` property
to an element. Turn on Flexbox for the top-level board (so the lists
are displayed next to one another), and for list (so the cards are
displayed vertically). Make sure that `flex-direction` is set correctly!

Reload the page to see your changes. You should see a lovely blue
canvas with a header and a button right in the middle (the button
doesn't do anything yet--as a reminder, we'll be wiring it up
tomorrow). Pat your partner on the back for your first win and dance
an Irish jig to let everyone else know how awesome you are.

[ss-01a]: ./img/ss-01a.png
[ss-01b]: ./img/ss-01b.png
[skeleton HTML]: ./skeleton/index.html
[skeleton CSS]: ./skeleton/css/style.css
[live]: http://horizons-school-of-technology.github.io/week02/day2/2_horello/solution/index.html
[flexbox]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

Supplemental reading (optional):
- [A Complete Guide to Flexbox][flexbox]

## Phase 2: Lists

Screenshots:
- [goal][ss-02a]

As you can see on the live version, a Horello board consists of one or
more lists, each of which contains one or more cards. Let's begin
styling the first core element: the list. For this project phase,
you'll be filling in the list-related styles in the skeleton CSS file.
Find the relevant CSS selectors and fill in the missing styles, based
on the [specs]. Note that not every required CSS property is listed
in the specs. Do your best to figure out what's missing and create a
pixel perfect clone of the [live version][live].

Then look for the PHASE 2 comment in the [skeleton HTML] file and add
the "Add card" button. Try creating this one using the `button` tag
(rather than a plain `div` or `span`).

Reload to see your changes. Things are starting to take shape aren't
they? Grab a strong cup of coffee to celebrate because you're going
to need the caffeine when you see what comes next.

[ss-02a]: ./img/ss-02a.png

## Phase 3: Cards

Screenshots:
- [goal (single card, single list)][ss-03a]
- [goal (multiple cards, multiple lists)][ss-03b]

In this phase we're going to style the last core element, the card.
Continue filling in the missing styles based on the [specs]. Reload
and you should see your first card, properly styled, sitting on top
of your first list.

Next, we're going to add an icon to the card to indicate that the card
contains more text--check out how this looks on the [live version][live]
All cards have a title, and some cards have a description as well. For
the cards that contain a description, we need a visual indication since
the description isn't visible before tapping on the card to open it up.

Bootstrap ships with a handy set of icons, called [glyphicons], that
we can use throughout our app. Take a look at the list of icons and
you should see lots that looks familiar: icons for sending mail,
lists and grids of content, volume, etc. For now we'll stick with
the icons built in to Bootstrap, but there are many other fantastic
resources for icons--see a few of our favorites, below.

Find the `glyphicon-align-left` icon and add it at the bottom left
corner of the card, like in the live version. Use the `.card-more` class
to style the element. Since you made it this far--by now you're a
veritable HTML rockstar--you'll have to figure out where to put the HTML
for the icon on your own.

Take a moment to reload and behold your work thus far. Your first card
and list are fully styled. Up to this point--and for the rest of
today--the elements you've added aren't tied to any real data (that will
change tomorrow when things will really come to life). But we can add
more hardcoded elements to get a better sense for what our app will look
like once we've entered more data. Using the list and card elements that
you've already created, try adding multiple lists and multiple cards
with varying amounts of data, like you see in the live version.

Think your web app looks awesome? You ain't seen nuthin' yet! Lace up
your coding shoes because things are about to get a little cray-cray.

- Icon resources (optional):
  - [Glyphicons][glyphicons-orig]
  - [fontawesome]
  - Google's [material] icon set
  - [the noun project]

[glyphicons]: http://getbootstrap.com/components/#glyphicons
[fontawesome]: http://fontawesome.io/
[material]: http://materializecss.com/icons.html
[glyphicons-orig]: http://glyphicons.com/
[the noun project]: https://thenounproject.com/
[ss-03a]: ./img/ss-03a.png
[ss-03b]: ./img/ss-03b.png

## Phase 4: Collapse

Screenshots:
- [goal (collapsed)][ss-04a]
- [goal (expanded)][ss-04b]

So far, you've been adding static HTML and CSS elements to a web page.
That's about to change, and things will never be the same. You can build
web _pages_ using static elements, but by definition an application is
_interactive._ Once you go interactive, you never go back. Let's go
ahead and add our first dynamic, interactive element to this baby so
that it really starts to feel like an app.

Take a moment to check out how the "Add a list..." and Add a card..."
buttons work on the [live version][live]. When you tap the button, a
form slides out that lets you enter the title of the new list or card.
For now, we're just going to style these forms and add the "collapse"
action that shows and hides the form.

Javascript was originally designed to add interactive elements such as
these to web pages, and we're going to use it for that original purpose.
Bootstrap ships with a number of custom jQuery plugins: small, useful
pieces of Javascript that allow us to quickly add interactive elements
to our app. Today, we're going to add a couple of the elements without
touching the Javascript ourselves (this is part of what makes Bootstrap
so popular and so powerful). Starting tomorrow, you'll see how to add
these interactions yourself.

We're going to use a Bootstrap plugin called [Collapse]. Take a moment
to read the description and the sample code, and to play with the
examples. In the [Usage] section, you'll see that the plugin can be used
either via Javascript or using simple "data attributes". Let's stick
with the data attributes approach for now. You can add these attributes
to an HTML element such as `div` to get the desired behavior.

Go ahead and recreate these two buttons and forms: "add list" and "add
card". You're on your own creating the HTML and styles to add these
forms, but here are a few tips:

- Put the form inside a Bootstrap [Well] component to set it off from
the rest of the list.
- Use Bootstrap's [Forms] CSS for the text input.
- Use Bootstrap's button classes and glyphicons for the buttons. See
[Glyphicon Examples].
- Tie the button that triggers the collapse to the hidden content
using the `data-target` or `href` attributes on the button and the `id`
attribute on the target.

With everything in place, reload and tap the buttons to see the
expand/collapse in action. One step closer to building your first killer
app and world domination!

[Collapse]: http://getbootstrap.com/javascript/#collapse
[Usage]: http://getbootstrap.com/javascript/#collapse-usage
[Well]: http://getbootstrap.com/components/#wells
[Forms]: http://getbootstrap.com/css/#forms
[Glyphicon Examples]: http://getbootstrap.com/components/#glyphicons-examples
[ss-04a]: ./img/ss-04a.png
[ss-04b]: ./img/ss-04b.png

## Phase 5: Modal

Screenshots:
- [goal][ss-05a]

Now that you've had a taste of interactive elements, we're going to
enter the major leagues with an even bigger, even more interactive-er
element, a modal. A modal is a way to temporarily present information,
or an interactive form, on top of existing content without navigating
away from that content (this is part of a larger topic called routing
that you'll explore more in the coming weeks). From an information
architecture standpoint, the content in the modal is _subordinate to_
the main content. (Read more about the concept at [Modal window].)

We're going to use the modal component from (you guessed it!) Bootstrap.
Take a look at Bootstrap's [Modals] component, in particular the sample
code and live demo. Then look at the behavior on the [live Horello
page][live]: try tapping on a card, and you'll see a modal appear. This
modal lets you edit the card title and description (the body of the
card). Note that, again, the static elements on the page aren't yet tied
to a real data model, so the data on the modal may not match the data on
the card you tap on.

Your turn! Use Bootstrap's [sample modal code] to add a modal to the
app with a text input for the card header and another for the card
description. You can use stick with the default modal styles for now,
no need to do custom styling.

Reload your page to see the working modal. Cool, right? Now you have
another arrow in your kickass web quiver that you can use to crush
the next few projects.

Go for a run, have a beer, watch some Game of Thrones, do whatever it
takes to unwind, then get some sleep because, trust me, you're going to
need it when you see what comes tomorrow.

Oh, and watch this video because you're awesome and you deserve it:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=XQ7z57qrZU8
" target="_blank"><img src="http://img.youtube.com/vi/XQ7z57qrZU8/0.jpg"
alt="watch me" width="480" height="360" border="10" /></a>

Supplemental reading (optional):
- [Modal window]

[Modal window]: https://en.wikipedia.org/wiki/Modal_window
[Modals]: http://getbootstrap.com/javascript/#modals
[sample modal code]: http://getbootstrap.com/javascript/#modals-examples
[ss-05a]: ./img/ss-05a.png