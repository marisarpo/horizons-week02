"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

  $('.add-list').on('click', function(){
    $('.add-list-form-wrapper').removeClass('collapse');
  });

  $('.add-list-cancel').on('click', function(){
    $('.add-list-form-wrapper').addClass('collapse');
  })

  $('.add-list-save').on('click', function(){
    // get the sibling and get that value
    // think of how to get to where we want from where we start (on the button)
  var title = $( ".add-list-save" ).siblings('input').val()
  console.log(title);

  // begin building html with the name as a variable ~~~~
  var html = `
    <div class="list-container">
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

  // we want to place it using jquery so... make it recognizable by jquery
  var jHTML = $(html);

  // can't do this FML
  // $('.add-list-form-wrapper').before(jHTML);

  // let's do THIS stuff
  var $this = $(this);

  // now place
  $this.closest('.list-container').before(jHTML);

});

  $('.board').on('click', '.add-card', function(){
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  });

  $('.board').on('click', '.add-card-cancel', function(){
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  });

  $('.board').on('click', '.add-card-save', function() {
    // this is add card save
    // closest goes up
    // find goes down
    // form control is where the input is so get that's value
    var title = $(this).closest('.add-card-form-wrapper').find('.form-control').val();
    console.log(title);

    var card = `<div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">` + title + `</div>
    </div>`;

      $(this).closest('.list').find('.list-cards').append(card);

      $('.add-card-form-wrapper').addClass('collapse');

  });

  var cardBeingEdited = null;

  $('.board').on('click', '.card', function(){
    cardBeingEdited = $(this);
    var $this = cardBeingEdited;

    var body = $this.find('.card-body').text();
    // closes modal
    $('#card-edit').modal('toggle');

  });

$('.card-edit-save').on('click', function() {
   var text = $('#card-edit-body').val();

   $(cardBeingEdited).children('.card-body').text(text);
   $('#card-edit').modal('toggle');
  })

// yes

  $('.card-edit-cance').click(function() {
    $('#card-edit-body').val('');
    cardBeingEdited = null;
  });

  $('list-cards').sortable({
  // Configuration parameters here
  revert: false,
  items: '.card',
  connectWith: 'list-cards'
  });


  $('.board').on('click', '.card', function() {
    var $this = cardBeingEdited = $(this);
    var body = $this.find('.card-body').text();
    $('#card-edit').modal();
    $('#card-edit-body').val(body);
  });

  $('.card-edit-save').click(function() {
    var newCardBody = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').text(newCardBody);
    $('#card-edit').modal('hide');
    $('#card-edit-body').val('');
    cardBeingEdited = null;
  });
