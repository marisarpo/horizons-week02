"use strict";

var cardBeingEdited = null;

$('.add-list').on('click',function(){
var $this = $(this);
$this.siblings().removeClass('collapse');
});

$('.add-list-cancel').on('click',function(){
var $this = $(this);
$this.closest('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click',function(){
var $this = $(this);
var title = $this.siblings('input').val();

$this.closest('.add-list-form-wrapper').before($(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">`+ title +`</span>
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
</div>`))
})

$('.board').on('click', '.add-card', function(){
var $this = $(this);
$this.siblings().removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function(){
var $this = $(this);
$this.closest('.add-card-form-wrapper').addClass('collapse');
});


$('.board').on('click', '.add-card-save', function(){
var $this = $(this);
var title = $this.siblings('input').val();
$this.parents('.list').children('.list-cards').append($(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+ title +`</div>
</div>`))
$this.closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').text(cardBeingEdited[0].innerText);

})

$('.card-edit-save').on('click', function(){
var $this = $(this);
cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
var modal = $('#card-edit');
modal.modal('hide');
})


  $('.list-cards').sortable({
    connectWith: '.list-cards'
    });



// YOUR JAVASCRIPT CODE GOES HERE
