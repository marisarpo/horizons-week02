# Warmup exercise: responsive

## Time limit: 15 minutes

## Background

In class today we're going to learn about _responsive web pages._
Responsive refers to the fact that the page adapts itself to the screen
size, so that the page layout may be different on a small, mobile screen
than it is on a larger desktop screen.

The fundamental building block for responsive CSS is something called a
"media query." A media query begins with the string `@media`. It _wraps_
a CSS rule like this:

    @media ... {
      /** CSS rule here **/
    }

## Instructions

Open the skeleton file [index.html][index] in your web browser and text
editor. Your goal is to use media queries so that the three elements are
laid out responsively as follows:

- On large displays (>= 900px width), they should all be laid out in a
  row.
- On medium displays (>= 650px width), two should be on the first row,
  one below on its own line.
- On small displays (< 650px width), the three should stack.

Check out the [live, working version][live].

Tips:
- The media queries are in the skeleton HTML file, but you need to fill
  in their contents.
- You can achieve this entirely using CSS and media queries, you don't
  need to modify the HTML.
- Make changes in Dev Tools first to see what works! You can shrink and
  widen your browser to view the page with different screen sizes.

[index]: ./skeleton/index.html
[live]: http://horizons-school-of-technology.github.io/week02/day2/1_warmup/solution/index.html
