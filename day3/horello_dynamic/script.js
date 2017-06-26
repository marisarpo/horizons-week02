"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function() {
	$('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
	$('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function() {
	var parent = $(this).parent();
  	var input = parent.children('input');
	var text = input.val();

	var newListString = $(`<div class="list-container">
							  <div class="list">
							    <div class="list-header">
							      <span class="list-title">` + text + `</span>
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

	$('.add-list-form-wrapper').addClass('collapse');
	var closestContainer = $(this).closest('.list-container');
	closestContainer.before(newListString);

	$('.list-cards').sortable({
    	connectWith: '.list-cards'
  	});
})


$('.board').on('click', '.add-card', function() {
	var thisCard = $(this).siblings('.add-card-form-wrapper');
	thisCard.removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
	$('.add-card-form-wrapper').addClass('collapse')
})

$('.board').on('click', '.add-card-save', function() {
	var parent = $(this).parent();
  	var input = parent.children('input');
	var text = input.val();

	var newCard = $(`<div class="card">
					  <span class="card-more">
					    <span class="glyphicon glyphicon-align-left"></span>
					  </span>
					  <div class="card-body">` + text + `</div>
					</div>`);

	$('.add-card-form-wrapper').addClass('collapse');
	var list = $(this).closest('.list');
	var cardList = list.children('.list-cards')
	cardList.append(newCard);
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function() {
	cardBeingEdited = $(this);
	var inputSpace = cardBeingEdited.find('.card-body');
	var currName = inputSpace.text();

	var edit = $('#card-edit');
	var body = edit.find('#card-edit-body');
	body.val(currName);
	edit.modal();
})

$('.modal-dialog').on('click', '.card-edit-save', function() {
	var content = $(this).closest('.modal-content');
	var body = content.find('#card-edit-body');
	var newName = body.val();

	var inputSpace = cardBeingEdited.find('.card-body');
	inputSpace.text(newName);

	var edit = $('#card-edit');
	edit.modal('toggle')
})

$('.list-cards').sortable({
	connectWith: '.list-cards'
});


$('body').keydown(function(event) {
	var key = String.fromCharCode(event.which);
	if (key === "C") {
		$('.card:hover').remove();
	}
})