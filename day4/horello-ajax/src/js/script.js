// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
        url: 'https://api.Trello.com/1/lists/',
        method: 'post',
        data: {
          key: "cb8fd97ceba049c43c0ae096466b9729",
          token: "37ca7459b68102a109c04cbb79b416739e5bd0db093e5d512a9c6c6efcfca820",
          name: listName,
          idBoard: "5939d473e20ca86c08a13ed1"
        },
        success: render
    })
}

function createCard(name, listId) {
  $.ajax({
        url: 'https://api.Trello.com/1/cards/',
        method: 'post',
        data: {
          key: "cb8fd97ceba049c43c0ae096466b9729",
          token: "37ca7459b68102a109c04cbb79b416739e5bd0db093e5d512a9c6c6efcfca820",
          name: name,
          idList: listId
        },
        success: render
    })
}

function updateCard(title, desc, cardId) {
        $.ajax({
              url: 'https://api.Trello.com/1/cards/'+cardId,
              method: 'put',
              data: {
                key: "cb8fd97ceba049c43c0ae096466b9729",
                token: "37ca7459b68102a109c04cbb79b416739e5bd0db093e5d512a9c6c6efcfca820",
                name: title,
                desc: desc
              },
              success: render
          })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939d473e20ca86c08a13ed1', {
  data: {
    key: "cb8fd97ceba049c43c0ae096466b9729",
    token: "37ca7459b68102a109c04cbb79b416739e5bd0db093e5d512a9c6c6efcfca820",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    console.log(data)
    renderBoard(data)
   }
});

}

function renderBoard(data) {
  $("#boardAnchor").empty()
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`)

data.lists.forEach(function(element) {
  renderList(element)
})

  data.cards.forEach(function(element) {
    renderCard(element)
  })

console.log($(".board").find(".list"))
}


function renderList(list) {
  $("#boardAnchor .board").append(`<div class="list-container">
  <div class="list" data-list-id="${list.id}" id="${list.id}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list.id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`)
}

function renderCard(card) {
$("#"+card.idList).find(".list-cards").append(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`)
}
