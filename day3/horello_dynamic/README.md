# Making Horello dynamic

TODO introduction

1. Add list
1. Add card
1. Edit card
1. **Bonus:** Drag and drop cards
1. **Bonus:** Delete card by hovering and hitting <kbd>c</kbd>

## Part 1: Add list

### Goal

The goal of this step to be able to add new lists to our board with 
the *Add a list...* button.

When you're done, your app should look like this:

![](https://cl.ly/1c2h2Q3v3U0P/Screen%20Recording%202017-01-08%20at%2009.44%20PM.gif)

### Steps

1. When the `.add-list` button is clicked, make the `.add-list-form-wrapper` div
  visible by removing the `collapse` CSS class from it. `collapse` is a CSS
  class provided by Bootstrap for easily setting `display: none` on an element.
  <br>
  You can remove CSS classes using `$.removeClass()`:

  ```javascript
  $('YOUR SELECTOR HERE').removeClass('collapse')
  ```

1. When the `.add-list-cancel` button is clicked, hide the
   `.add-list-form-wrapper` div by adding the `collapse` CSS class
   back to it.
  <br>
  You can add CSS classes using
  [jQuery `.addClass()`](https://api.jquery.com/addclass/):

  ```javascript
  $('YOUR SELECTOR HERE').addClass('collapse')
  ```

1. When the `.add-list-save` button is clicked:
  1. Read the user provided *title* from the `input` element inside
     `.add-list-form-wrapper` using
     [jQuery `.val()`](https://api.jquery.com/val/).
  1. Create a list element with the *title* containing no cards and insert it
    before the `.add-list-form-wrapper` elements using
    [jQuery `.before()`](https://api.jquery.com/before/).
    <br>
    List HTML should be like:

    ```html
    <div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">LIST TITLE GOES HERE</span>
        </div>
        <div class="list-cards"></div>
        <div class="list-footer">
          <button class="add-card">Add a card...</button>
          <div class="collapse add-card-form-wrapper">
            <div class="well add-card-form">
              <input type="text" class="form-control" placeholder="Card title">
              <button type="button" class="btn btn-default add-card-save">
                Save
              </button>
              <button type="button" class="btn btn-default add-card-cancel">
                <span class="glyphicon glyphicon-remove"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ```

## Part 2: Add card

### Goal

The goal Part to is t o be able to add new cards to each list with the *Add
a card...* buttons.

When you're done, your app should look like this:

![](https://cl.ly/2s1W2M2I1Y0t/Screen%20Recording%202017-01-08%20at%2009.46%20PM.gif)

### Steps

1. When any `.add-card` button is clicked, find the `.add-card-form-wrapper`
   element for the **current list** and make it appear by removing the
   `collapse` CSS class.
  <br>
  Just like we did with comment threads we're going to use `$(this)` to find the
  right element relative to the current button. This time around we'll use
  [$.siblings()](https://api.jquery.com/siblings/) to jump
  to the 
  <br>
  You can remove CSS classes using
  [jQuery `.removeClass()`](https://api.jquery.com/removeclass/):

  ```javascript
  $(this).siblings('YOUR SELECTOR HERE')
    .removeClass('CSS CLASS TO REMOVE HERE')
  ```

1. When any `.add-card-cancel` button is clicked, hide the
   `.add-card-form-wrapper` div for the **current list** by adding the
   `collapse` CSS class back to it.
  <br>
  Inspect the page to figure out how to traverse from the `.add-card-cancel`
  to the `.add-card-form-wrapper`.
  <br>
  You can add CSS classes using
  [jQuery `.addClass()`](https://api.jquery.com/addclass/):
1. When the `.add-card-save` button is clicked:
  1. Read the user provided *card title* from the `input` element inside
    the **current** `.add-card-form-wrapper` using
    [jQuery `.val()`](https://api.jquery.com/val/).
  1. Create a new card element with the *card title* and append it to the
    **current** `.list-cards` element with
    [$.append()](http://api.jquery.com/append/)
    <br>
    Card HTML should be like:

    ```html
    <div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">CARD TITLE HERE</div>
    </div>`
    ```
  1. Now that the card has been created, hide the `.add-card-form-wrapper` div
     for the **current list** by adding the `collapse` CSS class back to it.
1. Make sure all click handlers for `.add-card`, `.add-card-cancel` and
  `.add-card-save` work for newly created lists. Use event delegates for achieve
  this goal:

  ```javascript
  $('.board').on('click', 'TARGET SELECTOR HERE', function() {
  })
  ```

## Part 3: Edit card

### Goal

The goal of this part is to make it possible to change card titles
by clicking on each card and using a modal form.

When you're done, your app should look like this:

![](https://cl.ly/2E3J2x320r3B/Screen%20Recording%202017-01-08%20at%2009.48%20PM.gif)

### Steps

TODO

## Bonus: Reorder cards using drag and drop

### Goal

TODO

When you're done, your app should look like this:

![](https://cl.ly/300r1W3G1D3G/Screen%20Recording%202017-01-08%20at%2009.53%20PM.gif)

### Steps

TODO

## Double Bonus: Delete cards using the keyboard

TODO
