"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

var cardBeingEdited = null;
var cardHoveredOver = null;

$(document).on('ready', function() {
	$('.board').on('click','.add-list', function() {
		$('.add-list-form-wrapper').removeClass('collapse');
	})
	$('.board').on('click', '.add-list-cancel', function() {
		$('.add-list-form-wrapper').addClass('collapse');
	})
	$('.board').on('click', '.add-list-save', function() {
		var title = $(this).siblings('.form-control').val();
		var div = '<div class="list-container">\
					  <div class="list">\
					    <div class="list-header">\
					      <span class="list-title">' + title + '</span>\
					    </div>\
					    <div class="list-cards"></div>\
					    <div class="list-footer">\
					      <button class="add-card">Add a card...</button>\
					      <div class="collapse add-card-form-wrapper">\
					        <div class="well add-card-form">\
					          <input type="text" class="form-control" placeholder="Card title">\
					          <button type="button" class="btn btn-default add-card-save">\
					            Save\
					          </button>\
					          <button type="button" class="btn btn-default add-card-cancel">\
					            <span class="glyphicon glyphicon-remove"></span>\
					          </button>\
					        </div>\
					      </div>\
					    </div>\
					  </div>\
					</div>';
		$(this).closest('.list-container').before(div);
		$('.list-cards').sortable({connectWith: '.list-cards'});
	})
	$('.board').on('click', '.add-card', function() {
		$(this).next().removeClass('collapse');
	})
	$('.board').on('click', '.add-card-cancel', function() {
		$(this).closest('.add-card-form-wrapper').addClass('collapse');
	})
	$('.board').on('click','.add-card-save', function() {
		var cardTitle = $(this).closest('.add-card-form-wrapper').find('input').val();
		var div = '<div class="card">\
					  <span class="card-more">\
					    <span class="glyphicon glyphicon-align-left"></span>\
					  </span>\
					  <div class="card-body">' + cardTitle + '</div>\
					</div>';
		$(this).closest('.list-footer').siblings('.list-cards').append(div);
	})
	$('.board').on('click','.card', function() {
		cardBeingEdited = $(this);
		$('#card-edit-body').val($(this).find('.card-body').text());
		$('#card-edit').modal();
	})
	$('.board').on('click','.card', function() {
		cardBeingEdited = $(this);
		$('#card-edit-body').val($(this).find('.card-body').text());
		$('#card-edit').modal();
	})
	$('.card-edit-save').on('click', function() {
		$('#card-edit').modal('hide');
		$(cardBeingEdited).find('.card-body').text($('#card-edit-body').val())
	})
	$('.list-cards').sortable({connectWith: '.list-cards'});
	$(window).on('keydown', function(event) {
		if (event.which === 67) {
			$(cardHoveredOver).remove();
		}
	})
	$('.board').on('mouseover','.card', function() {
		cardHoveredOver = $(this);
	})
	$('.board').on('mouseout','.card', function() {
		cardHoveredOver = null;
	})
})