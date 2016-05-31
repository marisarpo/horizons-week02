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
details. Where possible, we've indicated where you need to make changes
or add code with comment tags.
- We'll be adding interactive elements such as buttons and form
fields, but we're not going to wire those elements up until tomorrow,
so for now, most of these elements won't actually do anything.
- You'll continue working with Bootstrap. This time, the required CSS
and Javascript libraries have already been included.
- Keep the [specifications][specs] in front of you since you'll need
it throughout the project.

[specs]: ./SPECIFICATIONS.md

## Phase 1: Board and flexbox

Let's begin with the basic Horello board layout. Spend some time
getting familiar with the live version. We have a title bar at the
top (currently empty but we'll be adding to it later), and lists,
with one or more cards each, laid out left to right. Each list has a
button at the bottom which says "Add a card..." and, all the way on
the right, there's another button which says "Add a list..."

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
It's pretty sparse: a lovely white canvas for your boundless
creativity! In this phase, we're going to complete the basic page
styling: body, header, and board, and we're going to add the first
page element.

Read the [specs] and add the appropriate CSS properties to the skeleton
CSS file (look for the PHASE 1 comments). Then look for the PHASE 1
tag in the skeleton HTML file and add the "Add a list..." button. See
if you can figure out which combination of HTML tags and CSS classes
you need for this element. Here's a hint: when in doubt, use a `div`.

Reload the page to see your changes. You should see a lovely blue
canvas with a header and a button right in the middle (the button
doesn't do anything yet--as a reminder, we'll be wiring it up
tomorrow). Pat your partner on the back for your first win and dance
an Irish jig to let everyone else know how awesome you are.

## Phase 2: Lists

As you can see on the live version, a Horello board consists of one or
more lists, each of which contains one or more cards. Let's begin
styling the first core element: the list. For this project phase,
you'll be filling in the list-related styles in the skeleton CSS file.
Find the relevant CSS selectors and fill in the missing styles, based
on the [specs]. Note that not every required CSS property is listed
in the specs. Do your best to figure out what's missing and create a
pixel perfect clone of the live version.

Then look for the PHASE 2 comment in the skeleton HTML file and add
the "Add card" button. Try creating this one using the `button` tag
(rather than a plain `div` or `span`).

Reload to see your changes. Things are starting to take shape aren't
they? Grab a strong cup of coffee to celebrate because you're going
to need the caffeine when you see what comes next.

## Phase 3: Cards

In this phase we're going to style the last core element, the card.
Continue filling in the missing styles based on the [specs]. Reload
and you should see your first card, properly styled, sitting on top
of your first list.

Next, we're going to add an icon to the card to indicate that the card
contains more text--check out how this looks on the live version. All
cards have a title, and some cards have a description as well. For the
cards that contain a description, we need a visual indication since the
description isn't visible before tapping on the card to open it up.

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
today--everything you're adding is static, meaning that it's not tied to
any real data (that will change tomorrow when things will really come to
life). But we can add more static elements to get a better sense for
what our app will look like once we've entered more data. Using the
list and card elements that you've already created, try adding
multiple lists and multiple cards with varying amounts of data, like
you see in the live version.

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

## Phase 4: Collapse



## Phase 5: Modal
