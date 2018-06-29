"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC23e0511a06c61356e84d58c4758af6fe";
  this.authToken = "d122e53eaf04cfd48f5b5f43700ba2f6";
  this.fromNumber = "18575765735";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.length !== 0 && textStr.trim().length !== 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var result = true;
    result = result && phoneStr.length === 11;
    for (var i = 0; i < phoneStr.length; i++) {
      var isLetter = true;
      isLetter = parseInt(phoneStr.charAt(i)) !== NaN;
      result = result && isLetter;
    }
    return result;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var messageInputField = this.messageInputField.val();
    var phoneInputField = this.phoneInputField.val();

    if (this.validateMessageField(messageInputField) && this.validatePhoneField(phoneInputField)) {
      var account = 'AC23e0511a06c61356e84d58c4758af6fe';
      var token = 'd122e53eaf04cfd48f5b5f43700ba2f6';
      var fromNumber = 18575765735;
      var toNumber = 16179212302;
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
        success: function(x) {
          this.displayMessage(fromNumber, messageInputField);
        }.bind(this),
        error: function(x) {
          alert('there was an error');
        },
        method: 'POST',
        data: {
          From: fromNumber,
          To: toNumber,
          Body: messageInputField
        },
        headers: {
          "Authorization": "Basic " + btoa(account + ":" + token)
        }
      });
    }
    event.preventDefault();
    //this.displayMessage('9999999999', 'Testing testing!');
  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
