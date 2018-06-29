"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACfb74d5a521f81bca7f5deb92bafc9d64";
  this.authToken = "95964432761f372e41b1b59246e4da63";
  this.fromNumber = +12673676281;

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
    var self = this;
    self.messageSendButton.on('click', function(event) {
      event.preventDefault();
      self.handleMessageSend();
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.trim() !== "" || textStr.trim() !== " ";
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return phoneStr.length === 11 && !isNaN(phoneStr);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var message = this.messageInputField.val();
    var phoneNum = this.phoneInputField.val();
    alert("yo");

    if (this.validateMessageField(message) && this.validatePhoneField(phoneNum)) {
      var self = this;
      alert("YO");
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          alert("yo");
          self.displayMessage(phoneNum, message);
        },
        error: function(err) {
          alert("Error! " + err);
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: phoneNum,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
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
