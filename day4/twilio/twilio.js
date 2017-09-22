"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC4d3b5cada14db46b6e788e88448abb5b";
  this.authToken = "f6f0125876daf25d04edc111d25dc65e";
  this.fromNumber = "+18598881427";

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
    var self = this;
    self.messageSendButton.on('click', self.handleMessageSend.bind(self));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr) === '') {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length !== 11 || parseInt(phoneStr).toString() !== phoneStr) {
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();

    if (!this.validatePhoneField(phone) || !this.validateMessageField(message)) {
      alert('wtf m8');
      return false;
    }

    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function() {
        this.displayMessage(phone, message);
      }.bind(this),
      error: function(err) {
        alert('Message failed to send.');
      },
      method: 'POST',
      data: {
        From: this.fromNumber,
        To: "+" + phone,
        Body: message
      },
      headers: {
        "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
      }
    });


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
