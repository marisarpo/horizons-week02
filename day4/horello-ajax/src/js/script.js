// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
}

function createCard(name, listId) {
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5a6a65bfd8a5bd8d98c006f1', {
    data: {
    key: "9d911d316a2e6d72fe50d8ab46dcb9b2",
    token: "fcf80c853b4a546bd33f0fe1523f7175a4ed8430da718331baf250b1c82937ce",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data);
  }
});
}

function renderBoard(board) {
  $("#boardAnchor").empty().html('<div id="boardId" class="board"></div>');

  board.lists.forEach(function(list) { renderList(list) });
  board.cards.forEach(function(card) { renderCard(card) });
}

function renderList(list) {
  var wrapper = $("<div></div>");
  var listContainer = $('<div class="list-container"></div>');
  var listWrapper = $('<div class="list" data-list-id=' + list.id + ' id=' + list.id + "></div>");
  var listHeader = $('<div class="list-header"></div>');
  var listBody = $('<div class="list-cards"></div>');
  var listFooter = $('<div class="list-footer"></div>');
  var collapseCard = $('<div class="collapse add-card-form-wrapper" id=addCardForm' + list.id + '></div>');
  var wellAdd = $('<div class="well add-card-form></div>');

  wrapper.append(listContainer);
  listContainer.append(listWrapper);
  listWrapper.append(listHeader);
  listWrapper.append(listBody);
  listWrapper.append(listFooter);
  listHeader.html('<span class="list-title"></span>').text(list.name);
  listFooter.html('<button class="add-card" addcardid="' + list.id + '">Add a card...</button>')
  listFooter.append(collapseCard);
  collapseCard.append(wellAdd);
  wellAdd.html(
    '<input type="text" class="form-control" placeholder="Card title" id="addCardTitle"' + list.id + ' />\
    <button type="button" class="btn btn-default add-card-save" id="addCardBtn"' + list.id + '>Save</button>\
    <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn"' + list.id +'></span></button>'
  );

  $('#' + list.idBoard).append(wrapper.html());
}

function renderCard(card) {
  // YOUR CODE HERE
}
