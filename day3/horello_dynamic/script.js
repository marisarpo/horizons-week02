"use strict";

// YOUR JAVASCRIPT CODE GOES HERE



$('.add-list').on('click', function(){
	$('.add-list-form-wrapper').removeClass('collapse')
})

$('.add-list-cancel').on('click', function(){
	$('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function(){
	var input1 = $('.add-list-form-wrapper input').val();
	$('.add-list-container').parent().before(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title"> ${input1} </span>
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
	$('.add-list-form-wrapper').addClass('collapse')
})


$('.board').on('click', '.add-card', function(){
	$(this).siblings('.add-card-form-wrapper').removeClass('collapse')
})

$('.board').on('click', '.add-card-cancel', function(){
	$(this).closest('.add-card-form-wrapper').addClass('collapse')
})

$('.board').on('click', ".add-card-save", function(){
	var input1 = $(this).siblings("input").val();
	$(this).closest('.list-footer').siblings(".list-cards").before(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${input1}</div>
</div>`);

	$(this).closest('.add-card-form-wrapper').addClass('collapse')
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
	cardBeingEdited = $(this);
	$("#card-edit").modal();
	$('#card-edit-body').val($(cardBeingEdited).children(".card-body").text());
})

$('.modal').on('click', '.card-edit-save', function(){
	$(cardBeingEdited).children(".card-body").text($('textarea').val());
	$("#card-edit").modal("hide");
})

$('.list-cards').sortable({
	appendTo: '.list-container',
	connectWith: '.list-cards'
  // Configuration parameters here
  });

