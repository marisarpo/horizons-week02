"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
	$(this).siblings().removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
	$(this).siblings('.form-control').val('');
	$(this).parent().parent().addClass('collapse');
})

$('.add-list-save').on('click', function(){
	var title = $(this).siblings('.form-control').val();
	var extraList = $(`<div class="list-container">
  			<div class="list">
    			<div class="list-header">
      				<span class="list-title">` + title + `</span>
    			</div>
    			<div class="list-cards"></div>
    			<div class="list-footer">
      				<button class="add-card">Add a card...</button>
      				<div class="collapse add-card-form-wrapper">
        				<div class="well add-card-form">
          					<input type="text" class="form-control" placeholder="Card title">
         					<button type="button" class="btn btn-default add-card-save"> Save </button>
          					<button type="button" class="btn btn-default add-card-cancel">
            					<span class="glyphicon glyphicon-remove"></span>
          					</button>
        				</div>
      				</div>
    			</div>
  			</div>
		</div>`)
	$('.add-list-container').parent().before(extraList);
	$( ".list-cards" ).sortable({
  		appendTo: '.list-container',
  		connectWith: '.list-cards'
	});
	$(this).siblings('.form-control').val('')
	$(this).parent().parent().addClass('collapse');
})

$('.board').on('click', '.add-card', function(){
	$(this).siblings().removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
	$(this).parent().parent().addClass('collapse');
	$(this).siblings('.form-control').val('');
})

$('.board').on('click', '.add-card-save', function(){
	var cardTitle = $(this).siblings('.form-control').val();
	var extraCard = $(`<div class="card">
  			<span class="card-more">
    			<span class="glyphicon glyphicon-align-left"></span>
  			</span>
  		<div class="card-body">`+ cardTitle + `</div>
	</div>`)
	$(this).parent().parent().parent().siblings('.list-cards').append(extraCard)
	$(this).siblings('.form-control').val('')
	$(this).parent().parent().addClass('collapse');
})

var cardBeingEdited = '';

$('.board').on('click', '.card', function(){
	cardBeingEdited = this;
	var oldText = $(cardBeingEdited).children('.card-body').text();
	$('#card-edit-body').val(oldText);
	$('#card-edit').modal();	
})

$('.card-edit-save').on('click', function(){
	var editText = $('textarea').val();
	$(cardBeingEdited).children('.card-body').text(editText);
	$('#card-edit').modal('hide');
})


$( ".list-cards" ).sortable({
  appendTo: '.list-container',
  connectWith: '.list-cards'
});

