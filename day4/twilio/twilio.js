"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC72981249d1a5337bf543bf5b7f0ca54d';
  this.authToken = '998a8d315304d5006556b8ffad38d64e';
  this.fromNumber = +3523534528;

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
    // YOUR CODE HERE
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return textStr.trim().length > 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var arr = phoneStr.split("");
    var valid = arr.length === 10;

    for (var i = 0; i < arr.length; i++) {
      if(isNaN(parseInt(arr[i], 10))){
        valid = false;
      }
    }
    return valid;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var myMessage = this.messageInputField.val();
    var myPhoneNum = this.phoneInputField.val();
    var self = this;
    if(self.validateMessageField(myMessage) && self.validatePhoneField(myPhoneNum)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          self.displayMessage(myPhoneNum, myMessage);
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: myPhoneNum,
          Body: myMessage
        },
        headers: {
          "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
        }
      });
    }
    event.preventDefault();
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
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
