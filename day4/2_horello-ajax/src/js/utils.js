// CAUTION: You probably don't need to make changes here for this project!

function addCard(card) {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div id="'+card.id+'" class="card" data-card-desc="'+card.desc+'" data-card-name="'+card.name+'" data-list-id="'+card.idList+'" data-card-id="'+card.id+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if (card.desc) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  }
  var cardbody = $('<div class="card-body">'+card.name+'</div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(card.name);

  $('#' + card.idList).find('.list-cards').append(wrapper.html());
}

function addList(list) {
  // Build wrappers
  var wrapper = $('<div></div>');
  var listContainer = $('<div class="list-container"></div>');
  var listWrapper = $('<div class="list" data-list-id="'+list.id+'" id="'+list.id+'"></div>');
  var listHeader = $('<div class="list-header"></div>');
  var listBody = $('<div class="list-cards"></div>');
  var listFooter = $('<div class="list-footer"></div>');

  wrapper.append(listContainer);
  listContainer.append(listWrapper);
  listWrapper.append(listHeader);
  listWrapper.append(listBody);
  listWrapper.append(listFooter);
  listHeader.append($('<span class="list-title"></span>').text(list.name));
  listFooter.append($('<button class="add-card" addCardId="'+list.id+'">Add a card...</button>'));
  listFooter.append($('\
  <div class="collapse" id="addCardForm'+list.id+'">\
    <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+list.id+'">\
      <button type="button" class="btn btn-default" id="addCardBtn'+list.id+'">Save</button>\
      <button type="button" class="btn btn-default">\
        <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+list.id+'"></span>\
      </button>\
    </div>\
  </div>\
  '));

  $('#' + list.idBoard).append(wrapper.html())
}

function refreshStatic() {
  $('.add-list').click(function(e) {
    $('#addList').collapse('toggle');
  });

  $('#addList').on('shown.bs.collapse', function (e) {
    $('#addListText').focus();
  });

  $('#addListSave').click(function(e) {
    var listName = $('#addListText').val();
    // validate input
    if (!listName) {
      alert("Please enter a list name");
      return;
    }
    createList(listName);
    $('#addListText').val('');
    $('#addList').collapse('toggle');
  });

  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });

  $('#cardEdit').on('show.bs.modal', function (e) {
    console.log("BAMS")
    var button = $(e.relatedTarget);
    var cardId = button.data('card-id');
    var listId = button.data('list-id');
    $('#modalText').val($('#'+cardId).data('cardName'));
    $('#modalBody').val($('#'+cardId).data('cardDesc'));
    $('#modalSave').data('list-id', listId);
    $('#modalSave').data('card-id', cardId);
  });

  $('#modalSave').click(function (e) {
    var title = $('#modalText').val();
    var desc = $('#modalBody').val();
    if (!title) {
      alert('Please enter a title');
      return;
    }

    var cardId = $(e.currentTarget).data('card-id');

    updateCard(title, desc, cardId);
    $('#cardEdit').modal('hide');
  });
}

function refresh() {
  $('.add-card').each(function (idx) {
    $(this).off();

    var id = $(this).attr('addCardId');

    // Open add card form
    $(this).click(function (e) {
      $('#addCardForm'+id).collapse('toggle');
    });

    $('#addCardForm'+id).off();
    $('#addCardForm'+id).on('shown.bs.collapse', function(e) {
      $('#addCardTitle'+id).focus();
    });

    // Save new card
    $('#addCardBtn'+id).off();
    $('#addCardBtn'+id).click(function (e) {
      var val = $('#addCardTitle'+id).val();
      if (!val) {
        alert('Please enter a card title');
        return;
      }

      createCard(val, id);
    });

    // Cancel
    $('#addCardCancelBtn'+id).off();
    $('#addCardCancelBtn'+id).click(function (e) {
      $('#addCardForm'+id).collapse('hide');
    });
  });

  $('.card').each(function (idx) {
    $(this).off();
    $(this).click(function (e) {
      $('#cardEdit').modal('toggle', $(this));
    });
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);

  board.lists.forEach(function(list) {addList(list)});
  board.cards.forEach(function(card) {addCard(card)});
  refresh();
}
