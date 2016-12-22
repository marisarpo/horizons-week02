"use strict";

$('.post').click(function() {
  var comment = prompt('Enter your comment');
  var author = prompt('Enter your name');
  console.log(comment, author);
  if (comment && author) {
    $('.comments').append(createComment(author, comment));
  }
});

function promptForComment() {
  var comment = prompt('Enter your comment');
  var author = prompt('Enter your name');
  console.log(comment, author);
  if (comment && author) {
    return createComment(author, comment);
  }
}

function createComment(author, comment, replies) {
  var elem = $('<div class="comment">');
  elem.append($('<div class="author">').text('"' + author + '" says:'));
  elem.append($('<div class="message">').text(comment));
  var controls = $('<div class="controls">');
  controls.append($('<button class="hide-replies">Hide Replies</button>'));
  controls.append($('<button class="show-replies">Show Replies</button>'));
  controls.append($('<button class="hide-replies">Hide Replies</button>'));
  elem.append(controls);
  elem.append($('<div class="replies">').append(replies));
  return elem;
}

$('.comments').append(createComment('Darwish', "What does 'this' do inside a click handler?",
    createComment('Moose', 'It points to the element that was clicked',
      createComment('Darwish', "I don't get it",
        createComment('Ricky', 'Imagine you added the same click handler to 5 different buttons. When the click handler is called, how can you tell which button was clicked? "this" is the answer!')))));
$('.comments').append(createComment('Abhi', 'Anyone wanna go lift later?'));

$('.comments').on('click', '.reply', function() {
  var $this = $(this);
  var replies = $this.closest('.comment').children('.replies');
  replies.show();
  replies.append(promptForComment());
  $this.closest('.controls').find('.show-replies').show();
  $this.closest('.controls').find('.hide-replies').hide();
});

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var replies = $this.closest('.comment').children('.replies');
  replies.hide();
  $this.hide();
  $this.closest('.controls').find('.show-replies').show();
});

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  $this.closest('.comment').children('.replies').show();
  $this.hide();
  $this.closest('.controls').find('.hide-replies').show();
});

// Bonuses
// Hide and show collapse buttons when toggling
// When replies are hidden, list how many replies have been hidden in their place
// Edit comment
// Delete comment
