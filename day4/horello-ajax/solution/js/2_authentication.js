"use strict";

window.horello = window.horello || {};

horello.authenticate = function() {
  // Trello auth
  var authenticationSuccess = function() {
    console.log('Successful authentication');
    board.loadData();
  };
  var authenticationFailure = function() { console.log('Failed authentication'); };
  Trello.authorize({
    type: 'popup',
    name: 'Horello',
    scope: {
      read: true,
      write: true
    },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  });
};
