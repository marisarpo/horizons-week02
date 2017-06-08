"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$(document).ready(function(){

  //part1
  $(".add-list").on('click',function(event){
    var alfw = $(this).siblings('.add-list-form-wrapper');
    alfw.removeClass('collapse');
  });

  $('.add-list-cancel').on("click", function(event){
    var alfw = $(this).closest('.add-list-form-wrapper');
    alfw.addClass('collapse');
  });

  $('.add-list-save').on('click', function(event){
    var title = $(this).siblings('.form-control').val();
    var newList = $(`<div class="list-container">
    <div class="list">
    <div class="list-header">
    <span class="list-title">`+title+`</span>
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
    </div>`);
    var alfw = $(this).closest('.list-container');
    alfw.before(newList);
  });

  //Part 2
  $('.board').on('click', ".add-card", function(event){
    var acfw = $(this).siblings('.add-card-form-wrapper');
    acfw.removeClass('collapse');
  });
  $('.board').on("click",'.add-card-cancel', function(event){
    var acfw = $(this).closest('.add-card-form-wrapper');
    acfw.addClass('collapse');
  });
  $('.board').on("click",'.add-card-save', function(event){
    var title = $(this).siblings('.form-control').val();
    var newCard = $(`<div class="card">
    <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
    </span>
    <div class="card-body">`+title+`</div>
    </div>`)
    var listCards = $(this).closest('.list-footer').siblings('.list-cards');
    listCards.append(newCard);
    var acfw = $(this).closest('.add-card-form-wrapper');
    acfw.addClass('collapse');
  });
  //part 3
  var cardBeingEdited = null;
  $('.board').on('click','.card',function(event){
    cardBeingEdited = $(this);
    var cardEdit = $('#card-edit');

    cardEdit.modal();
    var cardValue = cardBeingEdited.children().eq(-1).text();
    $('#card-edit-body').val(cardValue);

  });
$(".modal").on('click',".card-edit-save",function(event){
  var modal = $(this).closest('.modal');
  // get text from modal
  var editedText = modal.find('#card-edit-body').val();
  console.log(editedText);
  // modify the card
  cardBeingEdited.find('.card-body').text(editedText);
  modal.modal('toggle');
});

//Part 4
 $('.list-cards').sortable({
   connectWith:'.list-cards'
 });

 //Part 5
 $('.card').hover(function(event){
   $(this).toggleClass('removal');

 });

 $(document).on('keydown',function(event){
   if(event.which === 67){
     $('.removal').remove();
   }
 });

 // Part 6
 $(".header-logo").on('click', function(event){
  //  var r = Math.floor(Math.random(0,257));
  //  var g = Math.floor(Math.random(0,257));
  //  var b = Math.floor(Math.random(0,257));


   $("body").css("background-color","red");
 })
});
