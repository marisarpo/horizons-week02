"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACe707783ac5c24804cc28b5fdf11efd25";
  this.authToken = "2095ff6e2ba55895e19cee0def10cba6";
  this.fromNumber = "+18053015318";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var trimmed = $.trim(textStr);
    if(trimmed.length === 0) {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(phoneStr.length===11) {
        for(var i=0; i<phoneStr.length; i++) {
          if(isNaN(JSON.parse(phoneStr[i]))) {
            return false;
          }
          continue;
        }
      return true;
    }
    else {
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var self = this;
    var messageInput = this.messageInputField.val();
    var phoneInput = this.phoneInputField.val();

    if(this.validateMessageField(messageInput) && this.validatePhoneField(phoneInput)) {
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            self.displayMessage(phoneInput, messageInput);
            self.messageInputField.empty();
          },
          error: function(err) {
            alert('Invalid entry');
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: "+" + phoneInput,
            Body: messageInput
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          }
      });
    }
        event.preventDefault();
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
