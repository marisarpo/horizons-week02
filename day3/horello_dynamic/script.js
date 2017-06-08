"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
	$('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
	$('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(){
	var title = $(this).siblings('input').val();
	var list = $(`<div class="list-container">
		<div class="list">
		<div class="list-header">
		<span class="list-title">${title}</span>
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
	$('.add-list-form-wrapper').before(list);
	$('.add-list-form-wrapper').addClass('collapse');

})

//PART 2
$('.board').on('click', '.add-card', function() {
	$(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
	$(this).parent().parent().addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
	var title = $(this).siblings('input').val();
	var list = $(`<div class="card">
		<span class="card-more">
		<span class="glyphicon glyphicon-align-left"></span>
		</span>
		<div class="card-body">${title}</div>
		</div>`);
	$(this).parent().parent().parent().siblings('.list-cards').append(list);
	$(this).parent().parent().addClass('collapse');
})

//PART 3
var cardBeingEdited = null;
$('.board').on('click', '.card', function() {
	cardBeingEdited = this;
	$('#card-edit').modal();
	var content = $(this).children('.card-body').text();
	$('#card-edit-body').val(content);
})

$('.card-edit-save').on('click', function() {
	var newContent = $('#card-edit-body').val();
	console.log(newContent);
	$(cardBeingEdited).children('.card-body').text(newContent);
	$('#card-edit').modal('hide');
});

//PART 4
$('.list-cards').sortable({
connectWith: ".list-cards"
});

//PART 5







