"use strict";

window.horello = window.horello || {};

horello.apiKey = "7b4448e785fa10aa56b731990b873c49";
horello.apiToken = "bd3d9596b944d3944231ce0e7ac19e6bdb481ef3a83dac32402303a322975bc6";
horello.apiUrl = "https://api.trello.com/1";


// $.ajax(horello.apiUrl + "/boards/" + '575ac89d19234734f14f8a28' + "/lists", {
//     data: {
//       key: horello.apiKey,
//       token: horello.apiToken
//     },
//     success: function (data) {
//       console.log("Successfully loaded lists for board " + '575ac89d19234734f14f8a28');
//       data.forEach(function (data2) {
//         horello.List.fromJSON(data2);
//       });
//     }.bind(this),
//     error: function (err) {
//       console.error("Error loading lists for board " + '575ac89d19234734f14f8a28' + ": " + JSON.stringify(err));
//     }.bind(this)
//   }
// );