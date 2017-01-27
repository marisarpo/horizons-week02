

"use strict";
window.horello = window.horello || {};

///////////////////// RENDERERS /////////////////////

// Implement the methods to render the models into functioning html that will be
// injected on the page. `this` contains the element you want to render. So, on
// horello.Card.prototype.render, `this` is a card object from the models that has
// a name and a description.


// Let's start by implementing a single card. The output of this function should
// be a string containing the following HTML:
// <div class="card" data-list-id="58891d45d79747a7242eeba9" data-card-id="5889205101223f55bc95b682">
//   <span class="card-more"></span>
//   <div class="card-body">asd</div>
// </div>

horello.Card.prototype.render = function() {
  var cardHtml = '<div class="card" data-list-id='+this.listId+ 'data-card-id='+this.id+ '"<span class="card-more"></span><div class="card-body">asd</div></div>';
  return cardHtml;
};


// Now, we are going to implement the list renderer. This is where you create HTML
// for your lists. Remember to render all the cards in each list by calling the previous
// method `card.render()` for each one of the cards in a list and adding them in
// the ...cards area of each list. Note that only one list is being displayed here.
// If there were more lists, we would have to render each one of them inside the
// "list-container"

// <div class="list-container">
//   <div class="list" id="58891d45d79747a7242eeba9">
//     <div class="list-header">
//       <span class="list-title">newList</span>
//     </div>
//     <div class="list-cards">
//       ... cards go here.
//     </div>
//     <div class="list-footer">
//       <button class="add-card" addcardid="58891d45d79747a7242eeba9">Add a card</button>
//       <div class="collapse" id="addCardForm58891d45d79747a7242eeba9">
//         <div class="well add-card-form">
//           <input type="text" class="form-control" placeholder="Card title" id="addCardTitle58891d45d79747a7242eeba9">
//           <button type="button" class="btn btn-default" id="addCardBtn58891d45d79747a7242eeba9">  Save  </button>
//           <button type="button" class="btn btn-default">
//             <span class="glyphicon glyphicon-remove" id="addCardCancelBtn58891d45d79747a7242eeba9"></span>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

horello.List.prototype.render = function() {
  var listHTML = '<div class="list-container">``<div class="list" id='+ this.id +'><div class="list-header">
        <span class="list-title">newList</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card" addcardid=' +"58891d45d79747a7242eeba9">Add a card</button>
        <div class="collapse" id="addCardForm58891d45d79747a7242eeba9">
          <div class="well add-card-form">
            <input type="text" class="form-control" placeholder="Card title" id= this.title>
            <button type="button" class="btn btn-default" id="addCardBtn58891d45d79747a7242eeba9">  Save  </button>
            <button type="button" class="btn btn-default">
              <span class="glyphicon glyphicon-remove" id="addCardCancelBtn58891d45d79747a7242eeba9"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  return listHTML;
}


// Now we are going to implement the board. This is the HTML your function should
// create for the board. Remember to render all the lists in this.lists calling
// list.render(); for each one of them and adding them in the ...lists area.
// If you want to look at the final result, inspect the previous part of the
// project on the browser. In the browser, the board contains the html for the
// board + all the lists inside + all the cards inside each list.

// This is the HTML for board without lists
// <div id="board" class="board"> ...lists </div>

horello.Board.prototype.render = function() {
  var boardHTML = "";
  // YOUR CODE HERE
  return boardHTML;
};
