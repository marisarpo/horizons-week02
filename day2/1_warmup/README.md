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

Open the below codepen. Your goal is to use media queries so that the
three elements are laid out responsively as follows:

- On large displays (>= 900px width), they should all be laid out in a
  row.
- On medium displays (>= 650px width), two should be on the first row,
  one below on its own line.
- On small displays (< 650px width), the three should stack.

Check out the [live, working version][live].

Use this codepen: http://codepen.io/lockehart/pen/PzPzrj

Tips:
- Fill in the empty media queries in the CSS section.
- You can achieve this entirely using CSS and media queries, you don't
  need to modify the HTML.
- Make changes in Dev Tools first to see what works! You can make your
  browser window wider or smaller to view the page with different screen
  sizes.

[live]: http://horizons-school-of-technology.github.io/week02/day2/1_warmup/solution/index.html


/* media query is just an if statement 
