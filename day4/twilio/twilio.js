"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACf52031270cca8f3db811d52d031c48c2";
  this.authToken = "0988f76309cd4decbee57f8fdc7d4535";
  this.fromNumber = "+17755020414";

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
    $.trim(textStr);
    if (textStr === "") {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var valid = true;
    String.prototype.isNumber = function(){ return /^\d+$/.test(this); }
    if (!phoneStr.isNumber() || phoneStr.length !== 11) {
      valid = false;
    }
    return valid
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val()
    var number = this.phoneInputField.val();
    var outerThis = this;

    if (this.validateMessageField(message) && this.validatePhoneField(number)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          outerThis.displayMessage(number, message);
          outerThis.messageInputField.empty();
        },
        error: function(error) {
          alert("Error occurred.");
        },
        method: 'POST',
        data: {
          From: outerThis.fromNumber,
          To: number,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(outerThis.accountId + ":" + outerThis.authToken)
        }
      });
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
