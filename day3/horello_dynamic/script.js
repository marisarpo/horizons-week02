"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;

$('.add-list').on('click', function(){
	$('.add-list-form-wrapper').removeClass('collapse')
})

$('.add-list-cancel').on('click', function(){
	$('.add-list-form-wrapper').addClass('collapse')
})

$( '.add-list-save').on('click', function(){
	//	$('.add-list-form-wrapper').removeClass('collapse')
	var title = $(this).siblings('input').val();
	$(".add-list-form-wrapper").closest('.list-container').before(`
		<div class="list-container">
		<div class="list">
		<div class="list-header">
		<span class="list-title"> ${title} </span>
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
		</div> `)

		console.log(title);

		$('.list-cards').sortable({
			connectWith: '.list-cards'
		});
	})
	$( '.board').on('click', '.add-card', function(){
		$(this).siblings('.add-card-form-wrapper').removeClass('collapse');
	})

	$('.board').on('click', '.add-card-cancel', function(){
		$(this).closest('.add-card-form-wrapper').addClass('collapse');
	})
	$('.board').on('click', '.add-card-save', function(){
		var cardTitle = $(this).siblings('input').val();
		$(this).closest('.list').find('.list-cards').append(`
			<div class="card">
			<span class="card-more">
			<span class="glyphicon glyphicon-align-left"></span>
			</span>
			<div class="card-body">${cardTitle}</div>
			</div>`)
			$(this).closest('.add-card-form-wrapper').addClass('collapse');

		})

	$('.board').on('click', '.card', function(){
		cardBeingEdited = $(this);
		$('#card-edit').modal();
		var text = $(this).find('.card-body').text();
		$('#card-edit-body').val(text);
	})

	$('.modal-footer').on('click', '.card-edit-save', function(){
		var updatedText = $('#card-edit-body').val();
		$('.card-body').text(updatedText);
		$('#card-edit').modal('hide');
	})

	$('.list-cards').sortable({
		connectWith: '.list-cards'
	});

	$('body').on('keydown', function(event){
		var key = String.fromCharCode(event.which);
			if(key ==="c"  || key==="C"){
				$('.card:hover').remove()}
		})
