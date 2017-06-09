"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC1b4be69ce2eeb90716138d545a8abac8";
  this.authToken = "f6cb4c696c41c2ae573f02dd50cec6bf";
  this.fromNumber = "+15612208943";

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
    var clickFun = this.handleMessageSend.bind(this);
    this.messageSendButton.on('click', clickFun);
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (textStr.trim()
      .length === 0) {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var isValidNumber = true;
    if (phoneStr.match(/^[0-9]+$/) === null) {
      isValidNumber = false;
    }
    if (phoneStr.length !== 11) {
      isValidNumber = false;
    }
    return isValidNumber;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    console.log(message);
    var self = this;
    event.preventDefault();
    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          self.displayMessage(phone, message);
          self.messageInputField.val("");
        },
        error: function(x) {
          console.log('error', x);
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
      })
    }
  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>')
      .addClass('message');
    var senderElem = $('<span></span>')
      .addClass('sender')
      .text(sender);
    var bodyElem = $('<p></p>')
      .text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
