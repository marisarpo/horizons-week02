"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').on('click', function(event){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(event){
  $('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function(event){
  var nice = $(this).siblings('input').val();
  $('.add-list-form-wrapper').before(`
    <div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${nice}</span>
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
  `)
})

$('.list-footer').on('click', '.add-card', function(event){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
 })

 $('.list-footer').on('click', '.add-card-cancel', function(event){
   $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

   $('.list-footer').on('click', '.add-card-save', function(event){
     var rude = $(this).siblings('input').val();
     var listDiv = $(this).closest('.list').find('.list-cards')
     listDiv.append(
       `<div class="card">
   <span class="card-more">
     <span class="glyphicon glyphicon-align-left"></span>
   </span>
   <div class="card-body">${rude}</div>
 </div>`)
 $('.add-card-form-wrapper').addClass('collapse')
   });


  var cardBeingEdited = null;

  $('.board').on('click', '.card', function(event){
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    $('#card-edit-body').val() = $(this).find('.card-body').text();
  })

  $('.card-edit-save').on('click', function(){
  var newCardBody = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').text(newCardBody);
    $('#card-edit').modal('hide');
    $('#card-edit-body').val('');
    cardBeingEdited = null;
  })


  $('.list-cards').sortable({
    // Configuration parameters here
      connectWith: '.list-cards'
    });

    $('.list-container').sortable({
      // Configuration parameters here
        connectWith: '.list-container'
      });
