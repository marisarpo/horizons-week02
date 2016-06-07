# Inline exercise: Bootstrap

## Time limit: 10 minutes
## Instructions

We're going to revisit the codepen from the warmup exercise. Your
challenge is to do the same thing using Bootstrap. To recap:

- On large displays (>= 900px width), the elements should all be laid
  out in a row.
- On medium displays (>= 650px width), two should be on the first row,
  one below on its own line.
- On small displays (< 650px width), the three should stack.

http://codepen.io/lockehart/pen/PzPzrj



<p>The challenge: use media queries to change how these three elements are
  laid out as the screen size changes
</p>
<ul>
  <li>On large displays (>= 900px width), they should all be laid out in a
    row.</li>
  <li>On medium displays (>= 650px width), two should be on the first row,
    one below on its own line.</li>
  <li>On small displays ( <650px width), the three should stack.</li>
</ul>

<div class="row">
<div class="col-xs-12 col-sm-6 col-lg-4">First</div>
<div class="col-xs-12 col-sm-6 col-lg-4">Second</div>
<div class="col-xs-12 col-sm-12 col-lg-4">Third</div>
</div>

<!-- so you want to make sure you add the rows to 12  -->
<style>
.col-xs-5 col-sm-6 col-lg-4 {
  padding: 15px 50px;
  margin: 10px;
  border: 2px solid black;
  text-align: center;
  background-color: #ff6666;
}

@media (min-width: 650px) {
}

@media (min-width: 900px) {
}
</style>