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
`index.html` file and CSS goes in `css/style.css`.
- We'll be adding interactive elements such as buttons and form
fields, but we're not going to wire those elements up until tomorrow,
so for now, most of these elements won't actually do anything.
- You'll continue working with Bootstrap. This time, the required CSS
and Javascript libraries have already been included.

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

Let's get started.

## Phase 2: Lists
## Phase 3: Cards
## Phase 4: Modal
