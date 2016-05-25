# HTML and CSS Intro: Building a landing page

Congratulations on being hired and welcome to the Horello team! As our
latest web development hire, we're relying on you to build the landing
page for our flagship product, Horello, a shared task manager. The rest
of our web team is currently on a retreat in Tahiti, but we've left
these instructions so you should have everything you need to get
started building your first web page using HTML and CSS. Your task is to
create a pixel perfect clone of [this page][live-06].

As a web developer, you'll be working closely with our designers
who will give you a set of asset files (images), specifications, and
mockups (a.k.a. "mocks", "wireframes") to show you the expected final
product.

For this project, we've provided you with a basic HTML outline and some
empty CSS files. You'll begin by applying some of the CSS styles you
learned in class this morning. Later you'll add more HTML and try some
more sophisticated HTML and CSS techniques to add images and interactive
elements to the page.

## A few important details

- You'll be working in the `skeleton` directory. Each phase of the
project is contained in HTML and CSS files prefixed with the phase
number, e.g., `1_top.html`.
- Study the mockup screenshots closely. Use an app like Preview in OS X
so that you can easily pan and zoom.
- Get very comfortable using Chrome's developer tools (⌥⌘I, or View >
Developer > Developer Tools).
- The best way to do web development is to make small, incremental
changes to the HTML and CSS and then reload in the browser to see the
changes.
- Keep the [specifications][specs] handy.

[specs]: ./SPECIFICATIONS.md

## Phase 1: Title

- [Screenshot][ss-01-b]
- [Live][live-01]

Let's begin by applying some basic styles to text. Make sure you've
cloned this repository locally, then open the first skeleton
[html][skel-01-html] and [css][skel-01-css] files in your text editor,
and open the html document in your web browser. You should see a screen
that looks like [this][ss-01-a], containing HTML which is completely
unstyled. Open up the [specs] as well.

Take a look at the goal [screenshot][ss-01-b] for this phase and take
careful note of the differences. See them?

- The text is a different font
- The text is a different size
- The text is centered
- The text is a lot more spaced out
- The color is different (slightly)

Note that, in web development, "slightly different" isn't good enough.
When we say that our goal is to create a "pixel perfect" clone of the
design specs, we mean that all of these styles--colors, spacing, fonts,
etc.--should be identical. Designers and managers are excellent at
spotting these tiny differences, so you'll have to be on your A game to
stay ahead of them!

You may have also noticed that we included another CSS file called
`00-reset.css`. Every browser comes with certain built-in, default
styles, so for consistency we want to reset some of these styles to
start with a clean slate. There are some more sophisticated tools to do
this, such as [this one][reset-1] and [this one][reset-2], but we'll
keep it simple for now.

Let's start with typography. Copy the `font-family`, `font-size`, and
`font-weight` values (use the medium font size) from the [specs] and
apply them to the CSS `body` selector. Copy the hex code for the
"default font" color from the specs and add it as a `color` property to
the `body` selector. Because of the way CSS properties
_cascade_ down to child elements, these styles will apply, by default,
to all of the text in our page.

Next, apply the large font size from the specs to the `h2` selector.
That takes care of typography. Reload the page in the browser to see
your changes. The only things left to do are to center the text and to
adjust the spacing.

In order to center the text, add the `text-align: center` property to
the `text-center` CSS class selector. Because this is a class selector,
rather than an HTML element selector, it can be applied anywhere in the
page.

Finally, let's fix the spacing. Start by adding some padding inside of
each `section` tag: add a `padding` tag to the `section` CSS element
selector based on the values in the specs. Then, we want to add some
additional spacing in the form of a margin around the paragraph text.
Add a `margin` property to the `center-paragraph` CSS class selector
based on the specs.

Note that spacing can be specified in a variety of ways in CSS. You can
specify a number followed by "px", which refers to an absolute number of
pixels. You can also use "em" instead of "px", where "1em" is equal to
the font size (in pixels) applied to the element. See [the full
list of CSS units][cssdocs] if you're curious.

Reload again to see your changes. Congrats on finishing Phase 1!

[live-01]: http://horizons-school-of-technology.github.io/week02/day1/1_landing_page/solution/01-title.html
[ss-01-a]: ./screenshots/01-title-a.png
[ss-01-b]: ./screenshots/01-title-b.png
[skel-01-html]: ./skeleton/01-title.html
[skel-01-css]: ./skeleton/css/01-title.css
[reset-1]: http://meyerweb.com/eric/tools/css/reset/
[reset-2]: https://necolas.github.io/normalize.css/
[cssunits]: http://www.w3schools.com/cssref/css_units.asp

## Phase 2: Image and button

- [Screenshot][ss-02-a]
- [Live][live-02]

CSS is a very powerful tool, and it can do a lot more than just spacing
and typography. In fact, it can be used to create some very complex,
dynamic elements such as [2d shapes], [3d transforms], and some very
nifty [effects]. In this phase, you'll begin to see some of the power
of CSS to create interactive elements.

Let's finish the first section of the landing page by adding an image
and a button. Open the phase 2 files (you can close the phase 1 files:
all of your CSS work will be applied in all future phases!) in your
text editor and web browser.

We only need to apply one style to the image: adding a bottom margin,
per the [specs]. Go ahead and apply the appropriate `margin` property
to the `img` element selector.

Next we need to add a button. Zoom in on the [screenshot][ss-02-a] and
pay close attention to a few aspects of
this button:

- it isn't a solid color, but rather, there's a color
gradient applied from top to bottom (the color gets slightly darker
towards the bottom)
- it has rounded corners, no border, and a slight drop shadow
to give it some depth
- it has bold white text with padding on all four sides
- notice (from the [live version][live-02],
since it's not visible in the screenshot) that the button color changes
when you move the mouse over it

Let's add these styles one by one. Start with the padding and the
border. Get the values from the [specs] and add a `padding` property
to the `button` class selector. Add `border: 0` and a `border-radius`
property to give it rounded corners.

To style the text, add the properties `font-weight` and `color` to
match the specs. In order to make the button respect the padding of the
previous element (the paragraph text), add `display: inline-block`
(since `a` elements are `inline` by default).

Next let's add the color gradient and the drop shadow. Grab the gradient
"start" and "end" color values and add them to the selector using this
format (replacing `START` and `END` with the relevant color hex codes):

```background: linear-gradient(to bottom, #START 0, #END 100%);```

Add the drop shadow to the selector using this format (replacing `COLOR`
with the hex code from the specs):

```box-shadow: 0 2px 0 #COLOR;```

Almost there! The final step is to add the "hover" color gradient to the
"hover" pseudo class for the `.button` class. Go ahead and add it, using
the colors from the specs and the same `linear-gradient` command as
above. Reload, check out your awesome new button, and high five your
partner!

[2d shapes]: https://css-tricks.com/examples/ShapesOfCSS/
[3d transforms]: https://desandro.github.io/3dtransforms/
[effects]: http://codepen.io/supah/full/dGLLPK/
[live-02]: http://horizons-school-of-technology.github.io/week02/day1/1_landing_page/solution/01-title.html
[ss-02-a]: ./screenshots/02-image-a.png

## Phase 3: Footer

## Phase 4: Begin adding content

## Phase 5: Clear text

## Phase 6: More advanced images

[live-06]: http://horizons-school-of-technology.github.io/week02/day1/1_landing_page/01-top.html
