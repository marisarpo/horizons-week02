"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC7ae558ad6416477a41800381e5d6f39d";
  this.authToken = "936a417af1fbdb21d8ae6fc24428a0a5";
  this.fromNumber = "16093002375";

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
    this.messageSendButton.on('click', function (event) {
      self.handleMessageSend('click');
      event.preventDefault();
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if (textStr.trim() === '') {
      return false;
    } else {
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return $.isNumeric(phoneStr) && (phoneStr.length === 10);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var self = this;
    var msg_input = this.messageInputField.val();
    var phone_input = this.phoneInputField.val();
    var triggered = false;
    if (!this.validatePhoneField(phone_input)) {
      window.alert('invalid phone input');
      triggered = true;
    }
    if (!this.validateMessageField(msg_input)) {
      window.alert('invalid message input');
      triggered = true;
    }
    if (!triggered) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          self.displayMessage(self.fromNumber, msg_input);
          self.messageInputField.val('');
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: parseInt(phone_input),
          Body: msg_input
        },
        headers: {
          "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
        },
        error: function (err) {
          window.alert('an error has occured: ', err);
        }
      })
    }
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
