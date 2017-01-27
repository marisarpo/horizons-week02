"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(){
  var $this = $(this);
  var name = $this.siblings('input').val();
  console.log(name);
  $this.closest('.list-container').before(listMaker(name));
  $('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
    connectWith: '.list-cards'
  })

})

function listMaker(title){
  var newList = $('<div class="list-container">');
  var list = ($('<div class= "list"></div>'));
  var listHeader = ($('<div class="list-header"><div>'));
  listHeader.append($('<span class="list-title"></span').text(title));
  var listFooter = ($('<div class="list-footer"></div>'));
  listFooter.append($('<button class="add-card"></button>').text('Add a card...'));
  var collapse1 = ($('<div class="collapse add-card-form-wrapper"></div>'));
  var well = $('<div class="well add-card-form"></div>');
  well.append($('<input type="text" class="form-control" placeholder="Card title"></button>'));
  well.append($('<button class="btn btn-default add-card-save"></button>').text('Save'));
  var cardCancel = $('<button class="btn btn-default add-card-cancel"></button>');
  cardCancel.append($('<span class="glyphicon glyphicon-remove"></span>'));
  well.append(cardCancel);
  collapse1.append(well);
  listFooter.append(collapse1);
  list.append(listHeader);
  list.append($('<div class="list-cards"></div>'));
  list.append(listFooter);
  newList.append(list);
  return newList;
}

$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function(){
  var title = $(this).siblings('input').val();
  var newCard1 = cardMaker(title);
  $(this).closest('.list').find('.list-cards').append(newCard1);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

function cardMaker(cardT){
  var newCard = $('<div class="card"></div>');
  var cardMore = $('<span class="card-more"></span>');
  cardMore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  newCard.append(cardMore);
  newCard.append($('<div class="card-body"></div>').text(cardT));
  return newCard;
}

var cardbeingEdited = null;
$('.board').on('click', '.card', function(){
  cardbeingEdited = $(this);
  var textEdit = $(cardbeingEdited).find('.card-body').text();
  console.log(this);
  $('#card-edit').modal();
  var copy = $('#card-edit-body').val(textEdit);
})
$('.card-edit-save').on('click', function(){
  var newText =$('#card-edit-body').val();
  console.log(newText);
  $(cardbeingEdited).find('.card-body').text(newText);
  $('#card-edit').modal('hide');
})

$('.list-cards').sortable({
  connectWith: '.list-cards'
})

$(document).keydown(function(e){
  console.log('yay');
  console.log(e);
  if(String.fromCharCode(e.keyCode) === 'C'){
    console.log('hi');
    $('.card:hover').remove();
  }
})
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$('.header-logo-default').click(function(){
  $('.dropdown').addClass('collapse');
})
