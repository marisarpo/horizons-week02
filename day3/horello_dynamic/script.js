"use strict";

var cardBeingEdited = null;

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function(){
	$('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
	$('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(){
	var title = $('.add-list-form-wrapper input').val();
	$('.add-list-form-wrapper').addClass('collapse');

	//(`{variable}`)
	var new_element = (`
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
</div>`);

	$('.add-list-form-wrapper').closest(".list-container").before(new_element);
})

$('.board').on('click','.add-card',function(){
	var $this = $(this);
	var addCardDiv = $this.siblings(".add-card-form-wrapper");
	addCardDiv.removeClass('collapse');
})

$('.board').on('click','.add-card-cancel',function(){
	var $this = $(this);
	var addCardDiv = $this.parent().parent();
	addCardDiv.addClass('collapse');
})

$('.board').on('click','.add-card-save',function(){
	var $this = $(this);
	var their_input = $this.siblings('input').val();

	var new_element = (`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body"> ${their_input} </div>
</div>`)

	$this.parent().parent().parent().siblings('.list-cards').append(new_element);
	$this.parent().parent().addClass('collapse');
})

$('.board').on('click','.card',function(){
	cardBeingEdited = $(this);
	$('#card-edit').modal();
	var card_text = cardBeingEdited.find('.card-body').text(); //initial card text
	console.log(card_text);
	$('#card-edit-body').val(card_text);
	
	$('.card-edit-save').on('click',function(){
		card_text = $("#card-edit-body").val(); //text on the card after mods
		cardBeingEdited.find('.card-body').text(function(){ return card_text});	
	})
})

$('.list-container').sortable({
	
})








