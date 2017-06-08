"use strict";

var cardBeingEdited = null

var backgrounds = ["rgb(0,121,191)", "Cyan", "DarkSeaGreen", "LightSalmon", "url('img/bogdan-dada-156739.jpg')", "url('img/koushik-c-141142.jpg')", "url('img/Meeting-2340_CLIPCHAMP_keep.mp4')"]
var index = 1

$('.add-list').on('click', function() {
    $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
    $('.add-list-form-wrapper').addClass('collapse');
})


$('.add-list-save').on('click', function() {
  var title = $('.add-list-form-wrapper').find('input').val()
  var newElement = $(`<div class="list-container">
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
  $(this).closest('.list-container').before(newElement)
})

$('.add-list').on('click', function() {
    $('.add-list-form-wrapper').removeClass('collapse');
})





$('.board').on('click', '.add-card', function() {
  var $this = $(this);
  var fotterDiv = $this.closest('.list-footer');
  var wrapperDiv = fotterDiv.children('.add-card-form-wrapper')
    wrapperDiv.removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
    var $this = $(this);




    var formWrap = $this.parent().parent()
    formWrap.addClass('collapse');
  })


  $('.board').on('click', '.add-card-save', function() {
    var $this = $(this);
    var formWrap = $this.parent().parent();
    var title = formWrap.find('input').val();

    var newCard = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+ title +`</div>
</div>`
var listFooter = $this.closest('.list-footer');
var listCard = listFooter.siblings(".list-cards")
listCard.append(newCard);
var formWrapper = $this.closest('.add-card-form-wrapper');
formWrapper.addClass('collapse')
  })

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  var cardContent = cardBeingEdited.find('.card-body').text()
  $('#card-edit-body').val(cardContent)
  $("#card-edit").modal()
// var userInput = $("#card-edit").closest('modal-body').val()
    })


$('body').on('click', '.card-edit-save', function() {
  cardBeingEdited.find('.card-body').text($('#card-edit-body').val())
  $('#card-edit').modal('toggle')
        })

$('.list-cards').sortable ({
        connectWith: ('.list-cards')// Configuration parameters here
    });

$(document).on('keydown', function(/*event the happens*/) {
var charCode = event.keyCode
var letter = String.fromCharCode(charCode)


if (letter === 'C') {
  console.log("You pressed C")
var onCard = $('.card:hover')
onCard.remove()

  }
});

$(document).on('click', '.header-logo', function() {
  if(index>backgrounds.length-1) {index = 0}
  if (index == 4 || index == 5 ) {
    $('.board').css('background-image', backgrounds[index])
    $('.board').css('background-size', '100%')
  }
  else if (index>5 ) {

$(".board").before(`<div class="container">
              <video class="vid" autoplay muted loop>
                    <source src="img/Meeting-2340_CLIPCHAMP_keep.mp4">
              </video>
            </div>`)

  } else {
    $('.board').css('background', backgrounds[index])
  }
  index++
})
