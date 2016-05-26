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

For this project, we've provided you with a basic HTML outline, some
empty CSS files, and [specifications][specs]. You'll begin by applying
some of the CSS styles you learned in class this morning. Later you'll
add more HTML and try some more sophisticated HTML and CSS techniques to
add images and interactive elements to the page.

## A few important details

- You'll be working in the `skeleton` directory. Each phase of the
project is contained in HTML and CSS files prefixed with the phase
number, e.g., `1_top.html`.
- Study the mockup screenshots closely. Use an app like Preview in OS X
so that you can easily pan, zoom, and measure things.
- Get very comfortable using Chrome's Developer Tools (⌥⌘I, or View >
Developer > Developer Tools).
- The best way to do web development is to make small, incremental
changes to the HTML and CSS and then reload in the browser to see the
changes. When you get comfortable using the power Developer Tools,
you'll see how to test individual changes in real time without
changing your code.
- Keep the [specs] handy as you'll need them throughout this project.

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

Take a close look at the skeleton HTML. There are some fundamental HTML
tags such as `html`, `head`, `body`, and `meta`. Two stylesheets have
been included using the `link` tag. Finally, we've defined one `section`
with some content. (Note that `section` is an HTML5 [semantic tag], and
that you could have used the non-semantic `div` tag instead here.)

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
page (and it's been applied to the paragraph text).

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
[semantic tag]: http://www.w3schools.com/html/html5_semantic_elements.asp

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
to the `img-title` class selector. We use a class selector here because,
while we want to add a margin to this particular image, we don't
necessarily want that style to apply to all images throughout the page
(as you'll see later).

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
above. You may need to adjust the `color` property here too. Reload,
check out your awesome new button, and high five your partner!

[2d shapes]: https://css-tricks.com/examples/ShapesOfCSS/
[3d transforms]: https://desandro.github.io/3dtransforms/
[effects]: http://codepen.io/supah/full/dGLLPK/
[live-02]: http://horizons-school-of-technology.github.io/week02/day1/1_landing_page/solution/01-title.html
[ss-02-a]: ./screenshots/02-image-a.png

## Phase 3: Footer

- [Screenshot][ss-02-a]
- [Live][live-02]

As a next step, let's add a straightforward footer to our landing page
with some catch-all links such as Pricing, Jobs, and Blog, and a
copyright notice. See the samples for the complete list, and notice the
formatting: the footer links are evenly spaced, they're underlined,
they have a different color and font size from the rest of the document,
and the color is different when you move your mouse over them (hover).

Take a look at the skeleton [html][html-3] and [css][css-3] files. The
footer links
have been added as links inside an unordered list (`ul`), which is
currently appearing as a bulleted list. The css file contains a bunch
of empty "footer" selectors, such as "footer a". This compound selector
matches all `a` tags _inside a `footer` tag_, so these styles will only
apply to the contents of the `footer`.

Let's start by fixing the spacing. We need
to apply the same `padding` property (that's currently applied to the
`section` tag) to the `footer` as well. The `section` selector has been
copied to the top of this phase's CSS file. You can apply a set of
properties to multiple selectors by specifying the list selectors
separated by commas. Replace "`section`" (line 1) with
"`section, footer`" here
to apply the `padding` property to the `footer` tag selector.

To fix the font size and color, grab the smallest font size, and the
appropriate color, from the [specs] and add them to the `footer`
selector. Do the same to set the `footer a` and `footer a:hover` styles.

Finally, we need to format the list properly. By default, `ul` list
elements get left padding. To override this, set `padding` to zero on
the `footer ul` selector. To display the list elements side by side, set
`display: inline-block` on `footer li`. To space them out, grab the
spacing value from the specs and add it as a horizontal margin on the
same selector. Refresh to see your changes and do a backflip! Well done!

[html-3]: ./skeleton/03-footer.html
[css-3]: ./skeleton/css/03-footer.css

## Phase 4: Content

With those basics in place, let's add another section in between the
title and the footer with some text and an image. With the scaffolding
we already have in place, this is going to be easier than you think.

Take a look at the [html][html-4] for this phase, and you'll see that
we've added another `section` tag in the middle, with some paragraph
text and an image. You need to fill in the new `background-dark-blue`
and `layout-fill-img` CSS class selectors.

Grab the font and background colors for this section from the [specs]
and place these inside the `background-dark-blue` selector.

Styling the image will be a little harder. You'll need to use three CSS
properties here in `layout-fill-img`. Let's walk through them in order.

1. `padding` - this is used to add extra space _inside_ the element (and
the border, if there is one). It's often interchangeable with `margin`,
but unlike using a margin, padding is never collapsed into the margin of
vertically adjacent elements. Grab the "Content full-width image
padding" sizes from [specs] and add them as `padding`.
1. `max-width` - the hardest part of styling images is to get the size
right. The thing to keep in mind is that, if the size of the browser
window changes (or if someone views your page on a smaller screen on
e.g. a mobile device), your image may be shrunk down a great deal. In
this case, do you want the image to stay the same size? Do you want to
replace it with a smaller image, or make it disappear entirely? We'll
cover this topic in more depth tomorrow when we discuss responsive web
pages. For now, add the property `max-width: 100%`. This has the
counterintuitive effect of shrinking the image down to fit the browser
window (100% here refers to the size of the window, not the native image
size).
1. `box-sizing` - we have another challenge with the image size. We set
its width to 100%, but the CSS [box model] _excludes_ margin and padding
from its width calculation by default. This would be fine if we had no
margin or padding, but since we have a lot of padding, and we want the
image to fill 100% of the space _inside the padding_, we need to change
the box sizing behavior. Add `box-sizing: border-box` to accomplish
this. (You can read more on [box sizing] here if you're so inclined.)

Reload one more time to see your lovely, perfectly-sized and spaced
image with text around it. Booyah! The end is in sight.

[html-4]: ./skeleton/04-footer.html
[css-4]: ./skeleton/css/04-footer.css
[box model]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model
[box sizing]: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing

## Phase 5: Float and Clear

In this phase we're going to add another content section, and show you
one way to combine text and images using the `clear` property. In the
skeleton [html][html-5] file we've added one short new section with an
image and some more paragraph text, which currently appears below the
image. There'a a single new CSS class selector in the corresponding
[css][css-5] file called `img-float-left`.

The `float` property allows text (and other inline elements) to flow
around an image. The image can be "floated" to the left or to the right
of the text, which causes it to shifted to the left or the right side of
its container (or alongside another floated element). Float is often
used to create an entire web page layout with a sidebar, e.g.:

![web page layout with sidebar][sidebar]

(Image © CSS TRICKS)

The corresponding `clear` property is used when you have content that
should appear below the floated element, rather than alongside it, which
is the default behavior. Read [All About Floats] for a full explanation.
For our purposes, we're going to float an image to the left of the
paragraph text, then clear the element that comes after.

You've probably figured out by now from the name of the `img-float-left`
class what property needs to be added. Add the property to float the
image to the left, refresh and take a look.

The text has moved up next to the image, but there's currently no
margin between the two. You could fix this by adding a `margin` or
`padding` to the image or the text. To keep things simple, go ahead
and add a margin to the right of the image per the [specs].

The final step is to clear the float to fix the layout of the following
elements. There are lots of ways you could do this, but in case we
decide to float additional elements on our page, let's add a generic
clear property in such a way that it resets the style for every page
section, so that any float applied to a section is self-contained within
that section. The easiest way to do that is to add a `clear: both`
property to the `section` element selector.

Refresh once more and do a cartwheel because you just finished phase
five, just one more to go! 🎉

Supplemental reading (optional):

- [All About Floats]

[html-5]: ./skeleton/05-clear.html
[css-5]: ./skeleton/css/05-clear.css
[All About Floats]: https://css-tricks.com/all-about-floats/
[sidebar]: https://css-tricks.com/wp-content/csstricks-uploads/web-layout.png

## Phase 6: More advanced layout and images

In this (final!) phase we're going to add a last content section with
text, some app store badges (because all real startups have apps,
right?), a new button, and one more image. We'll use a different set of
properties to style these buttons and image, and we'll show you how to
control horizontal spacing of text and images.

Open up the [html][html-6] and [css][css-6] skeleton files and take a
look. One final section has been added to the HTML, with several
images and some more paragraph text. Take a look at the [target
screenshot][ss-06-a] as well. Our goal is to place the image to the
right of and slightly above the text, with the app store buttons, and
an additional text button, perfectly aligned below the text. The text
should occupy two-thirds of the width.

### Step 1: Text

Let's dive in and make it happen. We'll start with the general
layout, then style the text, then add the app store buttons, and
finally we'll correctly position the large image.

Play around with the [live][live-06] version of the page to get a
sense not just for how this section looks, but for how it behaves when
you change the width of the browser window. This is one of the great
challenges of web development: you are by definition developing for a
wide range of devices and possible screen sizes. Take a moment now to
resize the section and note the behavior. (This would be a good time
to learn how to zoom in and out using the Developer Tools's "device
mode": ⌘⇧M.)

You should have noticed a few important things:

- the text is left-aligned
- at a "normal" window width (on a laptop or small monitor), the text
occupies two-thirds of the width
- the image appears to the right of the text, starting about
two-thirds of the way across the screen, with a margin between text
and image
- as you shrink the width, the text first moves to the left, then
hits a left margin and spreads vertically instead; the image gets
smaller and the right part is always cut off
- as you increase the width, the image on the right first comes fully
into view, then as you continue to increase the width the text
section remains centered

Now that you've got a solid grasp of the desired behavior, let's
begin styling!

First, set the `background-color` property of the
`background-light-blue` class per the specs. Next, set `max-width` on
`layout-grid-frame`. Fixing the max width like this allows us to center
the text section as the width grows. Set `max-width` on the
`layout-twothirds-left` class selector as well.

Reload in the browser. We now have a content container of the right
width with text filling the left two-thirds. You won't be able to see
the container box in the browser since elements are transparent by
default. This is a good time to make sure you know how to make
individual HTML elements visible in the browser. Without being able to
see the precise effects of each of your changes in the browser, you're
flying blind! You can temporarily set a `background-color` and/or a
`border` property on the container to make it visible. You can also use
the powerful Chrome Developer Tools to add temporary styles (these
aren't saved when the page is reloaded), or to highlight individual
elements. Make sure you can see the container we're styling clearly.

The container box is still too far to the left. To center it, add
`margin: 0 auto`. The "0" value sets no vertical margin; the "auto"
value applies the same horizontal margin to left and right, effectively
centering the element.

### Step 2: Buttons

With the text properly styled, let's style the buttons on the line
below. Our goal is to make them the exact same height and align them,
and obviously to turn the text link into a button. Let's start with
the text button.

Try to style the button on your own, as we did before. Here's a hint:
you'll need to use three properties on `outline-link`:

- border
- border-radius
- padding

You can go ahead and set color properties, per the specs, on the `a`
and `a:hover` selectors to set the colors for this button. (Bonus
question: how would you add styles to only this one button rather
than applying them to all `a` links throughout the page?)

Next, fix the height of the app store badges using the
`.app-store-link img` compound selector. Note that you may need to
play around with the `outline-link` styles to get the text button to
be the exact same height.

You'll notice that the buttons aren't vertically aligned. To fix
this, set `display: inline-block` and `vertical-align: top` on all of
the buttons. Finally, use `margin` to space the buttons out
horizontally per the spec. Reload and you should see the text and
buttons appear correctly. The last step is to style the image.

### Step 3: Image

The first important thing to notice about the image layout is that the
image needs to be positioned to the right and slightly above the text.
We could float the image to the right, as we did in the previous
section, but we need to place the image past the right margin of the
page, and above the section padding. The easiest way to do this is using
absolute positioning, which allows us to reposition an element _relative
to a containing block_ (the property value is misleading, as the
positioning is relative not absolute; `position: relative` instead sets
the position _relative to the default position for the element itself_).

In order to anchor the absolutely positioned element, we first need
to mark the containing block using `position: relative`. The
containing block has the class `layout-grid-frame`, and the block to
be absolutely positioned has the class `layout-callout-right`. Set
the `position` properties for these classes, then use the `top` and
`left` properties on `layout-callout-right` per the [specs] to
position the image.

Reload the page and take a look. Everything may seem to be laid out
correctly, but there's still one big issue. Can you find it? Hint:
try zooming out.

If it's not immediately obvious: your page now has a horizontal
scrollbar, since the image that we absolutely positioned to the right
flows off the right edge of the page. There's an easy way to fix
that, using `overflow: hidden`. See if you can figure out the right
place to add this property, and why it belongs there.

Reload one last time, and... drumroll please... you did it!
Congratulations! You've just finished building your first landing
page. You're that much closer to world domination.

[html-6]: ./skeleton/06-advanced.html
[css-6]: ./skeleton/css/06-advanced.css
[live-06]: http://horizons-school-of-technology.github.io/week02/day1/1_landing_page/01-top.html
[ss-06-a]: ./screenshots/06-image-a.png
[css positioning]: http://www.w3schools.com/css/css_positioning.asp