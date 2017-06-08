"use strict";
// Run it on single element
$('#my-element').parallaxify();
// or globally
$.parallaxify();
var cardBeingEdited = null;
var cycle = 0;

$(document).ready( function() {

  $('.add-list').on('click', function() {
    $('.add-list-form-wrapper').removeClass('collapse');
  })

  $('.add-list-cancel').on('click', function() {
    $('.add-list-form-wrapper').addClass('collapse');
  })

  $('.add-list-save').on('click', function() {
    var title = $('.add-list-form-wrapper input').val();
    var list =
      `<div class="list-container">
        <div class="list">
          <div class="list-header">
            <span class="list-title">`+title+`</span>
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
      </div>`

    $('.add-list-form-wrapper').before(list);
    $('.add-list-form-wrapper').addClass('collapse')
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });
  })

  $('.board').on('click', '.add-card', function() {
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })

  $('.board').on('click', '.add-card-cancel', function() {
    $(this).closest('.add-card-form-wrapper').addClass('collapse');
  })

  $('.board').on('click', '.add-card-save', function() {
    var parent = $(this).closest('.add-card-form-wrapper');
    var title = parent.find('input').val();
    var currentList = parent.closest('.list-footer').siblings('.list-cards');
    currentList.append(
      `<div class="card">
        <span class="card-more">
          <span class="glyphicon glyphicon-align-left"></span>
        </span>
        <div class="card-body">`+title+`</div>
      </div>`
    )
    parent.addClass('collapse');
  })

  $('.board').on('click', '.card', function() {
    cardBeingEdited = $(this);
    $('#card-edit').modal();
    var text = cardBeingEdited.find('.card-body').text();
    $('#card-edit-body').val(text);
  })

  $('.card-edit-save').on('click', function() {
    var text = $('#card-edit-body').val();
    cardBeingEdited.find('.card-body').text(text);
    $('.modal').modal('toggle');
  })

  $('.list-cards').sortable({
    connectWith: '.list-cards'
  });

  $(document).keydown(function() {
    var letter = String.fromCharCode(event.which).toLowerCase();
    if (letter === 'c') {
      var $this = $('.card:hover');
      $this.remove();
    }
  })

  var selected = $('.selector').val();

  $('.selector').mouseleave(function() {
    selected = $('.selector').val();
    console.log(selected);
    if (selected === 'Theme 1') {
      $('.board').css('background-color', '');
      $('body').css('background-color', '');
      $('header').css('background-color', '');
      $('.board').css('background-image', 'none');
    } else if (selected === 'Theme 2') {
      $('.board').css('background-color', 'red');
      $('body').css('background-color', 'white');
      $('header').css('background-color', 'blue');
      $('.board').css('background-image', 'none');
    } else if (selected === 'Theme 3') {
      $('.board').css('background-color', 'pink');
      $('body').css('background-color', 'orange');
      $('header').css('background-color', 'green');
      $('.board').css('background-image', 'none');
    } else {
      $('.board').css('background-image', 'url(eastereggs.jpg)');
    }
  })

  // $('.notifications-dropdown').on('click', function() {
  //   console.log('hi');
  //   if ($('.notifications-dropdown option:selected').val() === 'Theme 1') {
  //     console.log('hi');
  //   }
  // })
  $.parallaxify({
        // enable parallax effect for horizontal, vertical or both directions
        horizontalParallax: true,
        verticalParallax: true,

        // enable or disable parallax effect for elements or backgrounds
        parallaxBackgrounds: true,
        parallaxElements: true,

        // set which positioning property is to be used
        // options include 'position' or 'transform' using css transformations
        positionProperty: 'position',

        // enable for responsive layouts
        // (upon orientation changes or window resizing element positions are reevaluated
        responsive: false,

        // enable or disable mouse or gyroscope data as input for the plugin
        useMouseMove: true,
        useGyroscope: true,

        // use a Low Pass Filter to smooth sensor readings (1 = no filter)
        alphaFilter: 0.9,

        // set which motion type algorithm is to be used
        // options include 'natural', 'linear', 'gaussian', or 'performance'
        motionType: 'natural',
        mouseMotionType: 'gaussian',

        // define the delta angle (0 < motionAngle < 90)
        // that is used to render max parallax in this direction
        motionAngleX: 80,
        motionAngleY: 80,

        // enable of adjustment of base position (using a Low Pass Filter)
        // (adapting to device usage while plugin is running)
        adjustBasePosition: true,
        // alpha for Low Pass Filter used to adjust average position
        alphaPosition: 0.05,
    });

    // enable parallaxify with CSS3 transformations for positioning
    $('#element').parallaxify({
        positionProperty: 'transform'
        });

    // defining your own positioning function
    $.parallaxify.positionProperty.rotate = {
        setPosition: function($element, left, originalLeft, top, originalTop) {
            $element.css('transform', 'rotateX(' + left + 'deg) rotateY(' + top + 'deg)');
        }
    };

    // using your own positioning function
    $('#other').parallaxify({
        positionProperty: 'rotate'
    });

    / enable parallaxify with natural motion (based on sensor data) and the gaussian algorithm for mouse movement
    $('#element').parallaxify({
        motionType: 'natural',
        mouseMotionType: 'gaussian'
        });

    // defining your own motion type
    // example for linear motion
    $.parallaxify.motionType.linear = {
        function(delta, deltaMax) {
            if (delta <= -deltaMax) return 1;
            if (delta >= deltaMax) return -1;
            return -delta/deltaMax;
        }
    };

    // using the linear positioning function
    $('#other').parallaxify({
        positionProperty: 'linear'
    });


  })
