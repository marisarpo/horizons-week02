"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {
	var classes = ['red', 'black', 'white', 'body'];
	var cardBeingEdited = null;
	var index = 0;
	$('.add-list').on('click', function() {
		$('.add-list-form-wrapper').removeClass('collapse');
	})
	$('.add-list-cancel').on('click', function() {
		$('.add-list-form-wrapper').addClass('collapse');
	})
	$('.add-list-save').on('click', function() {
		var title = $(this).siblings('input').val();
		var newElem = $(`<div class="list-container">
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
		$(this).closest('.list-container').before(newElem);
		$('.add-list-form-wrapper').addClass('collapse');
		$(this).siblings('input').val("");
		$('.list-cards').sortable( {
			connectWith: '.list-cards'
		});
	})
	$('.add-card').on('click', function() {
		$(this).siblings('.add-card-form-wrapper').removeClass('collapse');
	})
	$('.add-card-cancel').on('click', function() {
		$(this).closest('.add-card-form-wrapper').addClass('collapse');
	})
	$('.add-card-save').on('click', function() {
		var title = $(this).siblings('input').val();
		var newElem = $(`<div class="card">
  										<span class="card-more">
										    <span class="glyphicon glyphicon-align-left"></span>
										  </span>
										  <div class="card-body">${title}</div>
										</div>`);
		$(this).closest('.list-footer').siblings('.list-cards').append(newElem);
		$(this).closest('.add-card-form-wrapper').addClass('collapse');
		$(this).siblings('input').val("");
	})
	$('.board').on('click', '.card', function() {
		cardBeingEdited = $(this);
		$('#card-edit').modal();
		var content = $(this).find('.card-body').text();
		$('#card-edit-body').val(content);
	})
	$('.card-edit-save').on('click', function() {
		var modal = $('#card-edit');
		cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
		modal.modal('toggle');
		cardBeingEdited = null;
	})
	$('.list-cards').sortable( {
		connectWith: '.list-cards'
	});
	$(document).keydown(function(event) {
		if ('C' === String.fromCharCode(event.which)) {
			$('.card:hover').remove();
		}
	})
	$('header').on('click', function() {
		$('.board').removeClass(classes[index]);
		index++;
		if (index === classes.length) {
			index = 0;
		}
		$('.board').addClass(classes[index]);
	})
})