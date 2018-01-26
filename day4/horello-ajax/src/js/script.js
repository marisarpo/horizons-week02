// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
	setEventListeners();
	render();
});

function createList(listName) {
	$.ajax(`${apiUrl}/lists`, {
		type: 'POST',
		data: {
			key: "ca4e9946521029881278c22e42ce0e33",
			token: "a7ed73ba9c339c9ae16e63ad8a8e15f68f2fa62c564a46041a5fbcdd9d8930db",
			name: listName,
			idBoard: boardId
		},
		success: function (result) {
			// alert("success?");
			render();
		},

		error: function (err) {
			alert("no new list rip");
		}
	});
}

function createCard(name, listId) {
	$.ajax(`${apiUrl}/cards`, {
		type: 'POST',
		data: {
			key: "ca4e9946521029881278c22e42ce0e33",
			token: "a7ed73ba9c339c9ae16e63ad8a8e15f68f2fa62c564a46041a5fbcdd9d8930db",
			name: name,
			idList: listId
		},
		success: function (result) {
			// alert("success?");
			render();
		},

		error: function (err) {
			alert("no new card rip");
		}
	});}

function updateCard(title, desc, cardId) {
	$.ajax(`${apiUrl}/cards/${cardId}`, {
		type: 'PUT',
		data: {
			key: "ca4e9946521029881278c22e42ce0e33",
			token: "a7ed73ba9c339c9ae16e63ad8a8e15f68f2fa62c564a46041a5fbcdd9d8930db",
			name: title
			// desc: desc
		}, 
		success: function (result) {
			// alert("success?");
			render();
		},

		error: function(err) {
			alert("no update rip");
		}
	});}

function render() {
	$.ajax('https://api.Trello.com/1/boards/5a6a5f0ea3ea868d5aea936e', {
		data: {
			key: "ca4e9946521029881278c22e42ce0e33",
			token: "a7ed73ba9c339c9ae16e63ad8a8e15f68f2fa62c564a46041a5fbcdd9d8930db",
			cards: 'all',
			lists: 'all'
		},
		success: function (data) { renderBoard(data); }
	});
}

function renderBoard(board) {
	$("#boardAnchor").empty();
	$("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);
	board.lists.forEach(function(list) {
		renderList(list);
	});

	board.cards.forEach(function(card) {
		renderCard(card);
	});

}

function renderList(list) {
	let htmlList = `<div class="list-container">
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
						<button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
						<button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	$(`#${list.idBoard}`).append(htmlList);
}

function renderCard(card) {
		let newCard = `<div id="${card.id}" class="card" 
			data-card-desc="${card.desc}" 
			data-card-name="${card.name}" 
			data-list-id="${card.idList}" 
			data-card-id="${card.id}">
				<div class="card-body">
						${card.name}
				</div >
			</div >`;

	$(`#${card.idList}`).find('.list-cards').append(newCard);

}
