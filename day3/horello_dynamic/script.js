"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
//Pop down step 1

$('.board').on('click', '.add-list', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
});
//Close pop down
$('.board').on('click', '.add-list-cancel', function(){
  $('.add-list-form-wrapper').addClass('collapse');
});
//Save button
$('.board').on('click', '.add-list-save', function(){
  var $this = $(this);
  var container = $this.closest('.add-card-form');
  console.log(container);
  //can't go to siblings so go to parents and come back down
  var input = container.children('input[type="text"]');
  var title = input.val();
  var container = $this.closest('.list-container');
  container.before('<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">' +title + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>');

  $('.add-list-form-wrapper').addClass('collapse');

  $('.list-cards').sortable({
    connectWith: ".list-cards"
  }).disableSelection();
});


var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
  cardBeingEdited = this;
  $('#card-edit').modal();
  var text = $(cardBeingEdited).children('.card-body').text();
  $('#card-edit-body').val(text);
})

$('.card-edit-save').click(function(){
  var itemChanged = $(cardBeingEdited).children('.card-body');
  var value = $('#card-edit-body').val();
  itemChanged.text(value);
  $('#card-edit').modal('toggle');
})

//Remove collapse
$('.board').on('click', '.add-card', function(){
  var $this = $(this);
  var container = $this.siblings('.add-card-form-wrapper');
  container.removeClass('collapse');
});
//add collapse
$('.board').on('click', '.add-card-cancel', function(){
  var $this = $(this);
  var container = $this.closest('.add-card-form-wrapper');
  container.addClass('collapse');
});
//Add the damn card
$('.board').on('click', '.add-card-save', function(){
  var $this = $(this);
  console.log($this);
  var input = $this.siblings('input').val();
  var container = $this.closest('.list-footer').siblings('.list-cards');
  container.append('<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">'+input+'</div></div>');
  $('.add-card-form-wrapper').addClass('collapse');
})
//
//

// <div class="card">
//   <span class="card-more">
//     <span class="glyphicon glyphicon-align-left"></span>
//   </span>
//   <div class="card-body">CARD TITLE HERE</div>
// </div>`
