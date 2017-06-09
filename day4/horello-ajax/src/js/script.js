// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
$.ajaxSetup({
  data:{
    key: "0b9f4bfb69684a4b709c4af0e750ded2",
    token: "93b2d1b3ac2588e4e35c44166fb0c8ecba1c5efab0ac8805ac4438fe31004627"
  }
});


$(document).ready(function() {
  setEventListeners();
  render();
  setInterval(render, 30000);//render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax(apiUrl+'/lists', {
    method: 'POST',
    data: {
      // key: "0b9f4bfb69684a4b709c4af0e750ded2",
      // token: "93b2d1b3ac2588e4e35c44166fb0c8ecba1c5efab0ac8805ac4438fe31004627",
      name:listName,
      idBoard:  boardId//"5939c407e729682cf780f27e"
    },
    success: function(data) {
      // console.log("this should be the board",data);
      render();
    },
    error: function(err){
      alert("couldnt create new list");
    }
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(apiUrl+'/cards', {
    method: 'POST',
    data: {
      // key: "0b9f4bfb69684a4b709c4af0e750ded2",
      // token: "93b2d1b3ac2588e4e35c44166fb0c8ecba1c5efab0ac8805ac4438fe31004627",
      name:name,
      idList: listId
      // idBoard:  boardId//"5939c407e729682cf780f27e"
    },
    success: function(data) {
      // console.log("this should be the board",data);
      render();
    },
    error: function(err){
      alert("couldnt create card");
    }
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  console.log("trying to update card");
  $.ajax(apiUrl+'/cards/'+cardId, {
    method: 'PUT',
    data: {
      // key: "0b9f4bfb69684a4b709c4af0e750ded2",
      // token: "93b2d1b3ac2588e4e35c44166fb0c8ecba1c5efab0ac8805ac4438fe31004627",
      id:cardId,
      name: title,
      desc: desc,
      // boardId:  "5939c407e729682cf780f27e"
    },
    success: function(data) {
      console.log("this should be the board",data);
      render();
    },
    error: function(err){
      alert("couldnt update card");
    }
    // headers: {
    //   "Authorization": "Basic " + btoa(apiKey + ":" + apiToken)
    // }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939c407e729682cf780f27e', {
  data: {
    // key: "0b9f4bfb69684a4b709c4af0e750ded2",
    // token: "93b2d1b3ac2588e4e35c44166fb0c8ecba1c5efab0ac8805ac4438fe31004627",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    // console.log("this should be the board",data);
    renderBoard(data);
  },
  error: function(err){
    alert("couldnt render");
  }
});
}


function renderBoard(board) {
  // console.log($(boardId));
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id=${board.id} class="board"></div>`);
  // YOUR CODE HERE
  $.map(board.lists, function(val,key){
    // console.log(val);
    renderList(val);
  })
  $.map(board.cards, function(val,key){
    renderCard(val);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  console.log("thius should be board id",$(list.idBoard));
  $(`#${list.idBoard}`).append(`<div class="list-container">
  <div class="list" data-list-id=${list.id} id=${list.id}>
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=${list.id}>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`)
}

function renderCard(card) {
  // YOUR CODE HERE
  $(`#${card.idList} .list-cards`).append(`<div id=${card.id} class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
  ${card.name}
  </div>
</div>`)
}
