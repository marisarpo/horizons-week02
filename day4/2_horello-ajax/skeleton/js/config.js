"use strict";

window.horello = window.horello || {};

horello.apiKey = "424ce43d091e80906469887476418f5b";
horello.apiToken = "d65ed174b1eb67ce67c2f2b865c5c1b76a068a49e72e764d8e587b4408485e23";
horello.apiUrl = "https://api.trello.com/1";


// $.ajax('https://api.trello.com/1/cards', {
//     data: {
//         key: '',
//         token: '',
//         idList: '',
//         due: 'null',
//         name: 'NAME HERE'
//     },
//     method: 'POST',
//     success: console.log('sdf'),
// })

// 575afcaf262c0bd4a5eb066f


// //**Add a new card using ajax in the console

// $.ajax('https://api.trello.com/1/cards', {
//   data: {
  	// //**found the syntax here I think: https://developers.trello.com/sandbox
    // key: "424ce43d091e80906469887476418f5b",
    // token: "d65ed174b1eb67ce67c2f2b865c5c1b76a068a49e72e764d8e587b4408485e23",
    // // **The instructions said to go to https://trello.com/1/boards/<BOARD_ID>
    // // ** to get the board ID, but here we need the list ID to post the card to,
    // //** so went to https://developers.trello.com/advanced-reference/board 
    // //** to find the url to get the data of lists
    // //** found the list id here: https://trello.com/1/boards/575afcaf262c0bd4a5eb066f/lists
//     idList: "575afcb6d0b6c36a4019936e",
//     pos: 'top',
//     due: "null",
//     name: "new card"
//   },
//   method: "POST",
//   success: console.log("works"),
// })