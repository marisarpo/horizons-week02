# Responsive and Bootstrap

As discussed in class, responsive web design is extremely important
due to the proliferation of web-enabled devices of all shapes and
sizes, from tiny phone screens to massive monitors and everything
in between. Did you know that 65% of Facebook traffic already comes
from mobile devices, and that more than half of Facebook's users have
_never used the site on anything but mobile?_ It's important that all
modern web pages and applications be built for a range of viewing sizes.

One of the easiest ways to build responsive web pages which work
across a wide range of device sizes is with the modern Bootstrap
framework. Bootstrap is primarily a library of intelligent CSS styles
that auto-adjust your content, moving things around to fit the screen
size. However, Bootstrap also contains a set of powerful components
including buttons, icons, bars, etc., and some Javascript to tie it
all together. In this exercise, you'll be using Bootstrap's
responsive grid system and one component.

You're going to expand on the Horello landing page you built yesterday
by adding some responsive elements to make the page function better on a
small screen.

## A few important details

- You'll be working in the `skeleton` directory. Unlike yesterday's
exercise, you'll be writing both HTML and CSS this time. HTML goes in
the `index.html` file and CSS (for phase 2) goes in `css/media.css`.
- By now you should be extremely comfortable with Chrome's Developer
Tools. If you still have any questions about it, spend some time with
a TA today. You'll continue to rely heavily upon this tool all week.

## Phase 1: Media query

While Bootstrap makes responsive web development easier, you can
build a responsive site without Bootstrap. In fact, Bootstrap's
responsive system is built on top of a fundamental CSS building block
called a media query. Let's get started with responsive by adding a
couple of media queries. In later phases, we'll see how to do
responsive with Bootstrap.

Simply put, media queries allow us to introduce bits of CSS that only
apply when a set of conditions is true, like an if statement. The most
common type of media query is based on screen size, in particular,
screen width, which is an effective way of differentiating whether a
page is being viewed on a phone, a tablet, or a larger screen. (You can
use media queries to test other conditions, such as screen orientation,
but we'll keep it simple for now.) We can introduce breakpoints which
alter the page layout above or below a certain threshold, e.g.:

![responsive]

<sub>(Image Copyright w3schools.com)</sub>

Open up the [skeleton HTML] file in your web browser and text editor.
Try shrinking the browser window down to the width of a mobile phone
and see how the page currently responds. Notice how the padding
around each of the page sections--which looks fine at large
size--seems disproportionately large when you shrink the size down,
and takes up too much space in between the content sections. Now take
a look at the [live Trello site]. Try shrinking this page down as
well, and notice how it behaves as you slowly increase the size.
First, around the width of a tablet, a little bit of padding appears;
then, around the size of a desktop browser, even more padding appears.

It's worth mentioning that, when designing and building a responsive web
page or application, you should _begin with the mobile design_ and
progressively add content and features for larger screen sizes. This is
called _progressive enhancement_ and it tends to result in a better
experience than the opposite approach (_graceful degradation_). We did
already build a landing page for desktop viewing, but that's easily
remedied. Shrink your browser down to a smaller [screen resolution], fix
things for the mobile case first, and structure your media queries to
kick in _above a certain screen size_.

Now that you've got the basic concepts, it's time to get down to
business. Try adding media queries to the [skeleton CSS] file to do
the following:

- default section padding is 0 vertical, 20px horizontal
- for a screen width greater than or equal to 650px, use 40px
vertical, 20px horizontal padding
- for a screen width greater than or equal to 900px, use 80px
vertical, 20px horizontal padding

Here's a hint: in addition to the default `section` CSS selector,
you'll need two media query selectors. Remember, order matters!

With the media queries in place, reload the page and try resizing the
browser window to see the padding appear and disappear. It should
look much better at the smallest size. Nifty, right?

Supplemental reading (optional):
- [Mobile First presentation]
- [Mobile-First Responsive Web Design]
- [Mobile First Design: Why It’s Great and Why It Sucks]

[skeleton HTML]: ./skeleton/index.html
[skeleton CSS]: ./skeleton/css/media.css
[live Trello site]: https://trello.com/
[screen resolution]: http://mediag.com/news/popular-screen-resolutions-designing-for-all/
[Using media queries]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[responsive]: ./img/responsive.png
[Mobile First presentation]: http://www.lukew.com/presos/preso.asp?26
[Mobile-First Responsive Web Design]: http://bradfrost.com/blog/web/mobile-first-responsive-web-design/
[Mobile First Design: Why It’s Great and Why It Sucks]: https://codemyviews.com/blog/mobilefirst

## Phase 2: Installing Bootstrap

This is the first project where you'll be including a third-party
library. In this phase, you'll add the Bootstrap CSS library and two
of its dependencies: the Bootstrap JS library and the jQuery library.
Take a moment to read Bootstrap's [Getting Started] section, which
contains instructions on how to download and install the necessary code.

Don't worry if this doesn't make much sense to you right now! You'll be
learning about tools like `bower` and `npm` soon (these are used in more
complex projects where you're preprocessing and compiling a bunch of
code together), and you'll go in depth with jQuery very soon (it's a
Javascript library that makes interacting with the DOM and page elements
much easier). We're going to go with the first, simplest option for now:
[Bootstrap CDN]. This just requires copying a few lines of HTML and
pasting them into your own code.

Open up the [skeleton HTML] file and find the comment that refers to
"PHASE 2". Copy and paste the [Bootstrap CDN] code here (note that
you can leave out the second part, "Optional theme", if you like as
we won't be using it). We also need to add jQuery as Bootstrap
depends upon it. Find the "jQuery" code in [Bootstrap template] and
copy that over too.

(CDN stands for [Content delivery network], and it's a mechanism that
copies and stores copies of frequently-accessed, static content, such
as images and code, across a global network of servers, reducing load
times and making pages load faster.)

Note that location matters! It's important that we load the Bootstrap
library _before_ loading our own CSS file. Remember from yesterday
that CSS selectors are applied first in order of specificity, more
specific selectors first, then in the order they're loaded, where the
last match wins. We want our selectors to override selectors of equal
specificity inside Bootstrap, so our style code must be loaded
_after_ Bootstrap.

[Getting Started]: http://getbootstrap.com/getting-started/#download
[Bootstrap CDN]: http://getbootstrap.com/getting-started/#download-cdn
[Content delivery network]: https://en.wikipedia.org/wiki/Content_delivery_network
[Getting started]: http://getbootstrap.com/getting-started/
[Bootstrap template]: http://getbootstrap.com/getting-started/#template
[live-01]: http://horizons-school-of-technology.github.io/week02/day1/1_landing_page/solution/01-title.html
[ss-01-a]: ./screenshots/01-start.png
[ss-01-b]: ./screenshots/01-full.png

Supplemental reading (optional):
- Bootstrap's [Getting started]

## Phase 3: Horizontal elements

With Bootstrap in place, let's use it to add a responsive element.
Bootstrap uses a _grid system_ to achieve responsiveness: all content
must be put inside columns, and these columns automatically stack
when the screen size changes (using media queries!). It's fully
documented at [Grid system], but unfortunately, Bootstrap's docs are
obtuse. Here's what you need to know:

- Content goes in columns (actually `div` elements with `.col-*`
classes)
- Columns live inside rows (the `.row` class)
- Rows live inside a container (the `.container` or `
.container-fluid` classes)
- Columns can have a width of one or more; there are twelve total
columns on the page, so you can split these up as you like (e.g.,
6+6, or 4+4+4, or...)
- Use `.col-sm-*` to stack a row of columns only on extra small devices
(phones); use `col-md-*` to stack on extra small and small devices
(phones and tablets)
- Putting this all together, use the class `col-sm-4` for a column of
width four (i.e., 1/3 of the page width) which stacks on extra small
devices; use the class `col-md-6` for a column of width six (i.e., 50%
page width) which stacks on small and extra small devices, etc.

Here's what the grid system looks like visually:

![grid]

<sub>(Image Copyright HappyFunCorp)</sub>

We're going to use the grid system to lay out the app buttons in the
second-to-last section of the page. We want these to be spaced out,
side by side, on larger devices, and to neatly stack vertically on
smaller devices.

You won't actually need to write any CSS to accomplish this. That's
the magic of Bootstrap! By properly arranging the elements and
applying Bootstrap responsive grid classes, the content will
magically line up.

Find the "PHASE 3" comment in the [skeleton HTML]. Follow these steps
to make the buttons responsive:

1. Add a `container-fluid` class at the top level
1. Add a `row` class inside of it
1. Choose the right `col-*` class and wrap the three buttons in it

Reload and check if the buttons are properly aligned! They should
stack nicely as the page width shrinks.

Supplemental reading (optional):
- Bootstrap's [Grid system]
- [Bootstrap layout]

[Grid system]: http://getbootstrap.com/css/#grid
[Bootstrap layout]: http://bootstrap-sass.happyfuncorp.com/bootstrap-sass/layout/README.html
[grid]: ./img/grid.jpg

## Phase 4: Menu bar

In this final phase, 

- [Screenshot][ss-01-a]
- [Live][live-01]

