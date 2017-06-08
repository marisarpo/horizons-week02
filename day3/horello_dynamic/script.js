"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$(document).ready(function(){
	$('.add-list').on('click', function(){
		$('.add-list-form-wrapper').removeClass('collapse')
	})

	$('.add-list-cancel').on('click', function(){
		$('.add-list-form-wrapper').addClass('collapse')
	})

	$('.add-list-save').on('click', function(){
		var title = $(this).siblings('input').val()
		$(this).siblings('input').val('');
  		var listHTML = `
	    <div class="list-container">
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
	              <button type="button" class="btn btn-default add-card-save">Save
	                  </button>
	              <button type="button" class="btn btn-default add-card-cancel"><span
	                          class="glyphicon glyphicon-remove"></span>
	                  </button>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>`;
		$(this).closest('.list-container').before($(listHTML));
  		$('.add-list-form-wrapper').addClass('collapse');
	})

	$('.board').on('click', '.add-card', function() {
  		$(this).siblings('.add-card-form-wrapper').removeClass('collapse');
	});


	$('.board').on('click', '.add-card-cancel', function() {
  		$(this).siblings('input').val('');
  		$(this).closest('.add-card-form-wrapper').addClass('collapse');
	});

	$('.board').on('click', '.add-card-save', function(){
		var title = $(this).siblings('input').val()
		$(this).siblings('input').val('');
  		var card = `
  		<div class="card">
  			<span class="card-more">
    			<span class="glyphicon glyphicon-align-left"></span>
  			</span>
  			<div class="card-body">${title}</div>
		</div>`;
		$(this).closest('.list').find('.list-cards').append(card);
  		$(this).closest('.add-card-form-wrapper').addClass('collapse')
	});

	var cardBeingEdited = null;

	$('.board').on('click', '.card', function(){
		cardBeingEdited = $(this);
		$('#card-edit').modal()
		var body = $(this).find('#card-body').text()
		$('#card-edit-body').val(body)

	});

	$('.card-edit-save').on('click',function(){
		var temp = $('#card-edit-body').val();
		cardBeingEdited.find('.card-body').text(temp);
		$('#card-edit').modal('hide')
		$('#card-edit-body').val('');
		cardBeingEdited = null
	});

	$('.card-edit-cancel').on('click',function(){
		$('#card-edit').modal('hide')
		cardBeingEdited = null
	});

	$('.list-cards').sortable({
	  revert: false,
	  items: '.card',
	  connectWith: '.list-cards'
	});


	$(document).keypress(function(event){
		if(event.charCode === 99){
			$('.card:hover').remove();
		}
	})

	$('.header-logo').on('click', function(){
		
		var colors =['red', 'white', 'green', 'orange']
		$('body').css('background-color', colors[Math.floor(Math.random()*(colors.length))])
	
	})




	
	

})


