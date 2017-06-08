"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function () {
	var colors = ["gradient", "image1", "image2", "image3", "image4"]
	var colorIndex = 0;
	var cardBeingEdited = null;
	var cardHover = null;

	$('.add-list').on('click', function() {
		var $this = $(this);
		$this.siblings('.add-list-form-wrapper').removeClass('collapse');
	})

	$('.add-list-cancel').on('click', function() {
		var $this = $(this);
		$this.closest('.add-list-form-wrapper').addClass('collapse');
	})

	$('.add-list-save').on('click', function() {
		var $this = $(this);
		var title = $this.siblings('input').val();
		var container = $this.closest('.list-container');

		container.before(`<div class="list-container">
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
			</div>`)

		$this.closest('.add-list-form-wrapper').addClass('collapse');
		$('.list-cards').sortable({
			connectWith: '.list-cards'
		})

		$this.siblings('input').val("");
	})

	//click to open add card
	$('.board').on('click', '.add-card', function() {
		var $this = $(this);
		$this.siblings('.add-card-form-wrapper').removeClass('collapse');
	})

	//cancel new card
	$('.board').on('click', '.add-card-cancel', function() {
		var $this = $(this);
		$this.parent().parent().addClass('collapse');		
	})

	//add new card 
	$('.board').on('click', '.add-card-save', function() {
		var $this = $(this);
		var title = $this.siblings('input').val();
		var footer = $this.parent().parent().parent();
		footer.siblings('.list-cards').append(`<div class="card">
							<span class="card-more">
								<span class="glyphicon glyphicon-align-left"></span>
							</span>
							<div class="card-body">${title}</div>
						</div>`)
		$this.closest('.add-card-form-wrapper').addClass('collapse');
		$this.siblings('input').val("");
	})

	//open modal
	$('.board').on('click', '.card', function() {
		var $this = $(this);
		cardBeingEdited = $this;
		var modal = $('#card-edit');

		modal.modal();

		var cardText = $this.children('.card-body').text();
		$('#card-edit-body').val(cardText);
	})

	//save new card
	$('#card-edit').on('click', '.card-edit-save', function() {
		var $this = $(this);
		var modal = $('#card-edit');

		var modalText = $('#card-edit-body').val();
		cardBeingEdited.children('.card-body').text(modalText);

		modal.modal('toggle');
		cardBeingEdited = null;
	})

	//drag and drop cards
	$('.list-cards').sortable({
		connectWith: '.list-cards'
	})	

		
	$(document).keydown(function(c) {
		if('C'===String.fromCharCode(c.which)){
			prompt("Click ok to delete card");
			$('.card:hover').remove();
		}
	})

	$('header').on('click', function() {
		$('.board').removeClass(colors[colorIndex]);
		colorIndex++;
		if (colorIndex === colors.length) 
			colorIndex = 0;

		$('.board').addClass(colors[colorIndex]);
	})
})









