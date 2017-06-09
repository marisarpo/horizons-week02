"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC172b7dbf1f09f1bfffb4afb3bddc3454';
  this.authToken = 'bd5a1e2d36e6f1f945e2457b9d646c8b';
  this.fromNumber = '+12156077612';

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
    this.messageSendButton.on('click', function(event) {
      self.handleMessageSend(event);
    })
  },

  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var newStr = $.trim(textStr);
    return (newStr.length >= 1);
  },

  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    //var newStr = phoneStr.slice(1, phoneStr.length);
    if (phoneStr.length !== 10)
      return false;
    if (typeof(parseInt(phoneStr)) !== "number")
      return false;
    return true;
  },

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var self = this;
    var phoneTxt = self.phoneInputField.val();
    var messageTxt = self.messageInputField.val();
    var phoneVal = self.validatePhoneField(phoneTxt);
    var messageVal = self.validateMessageField(messageTxt);

    if (phoneVal === false) {
      console.log("The phone number is not valid");
      return;
    };

    if (messageVal === false) {
      console.log("The message is not valid");
      return;
    };

    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
      success: function(x) {
        self.displayMessage(messageTxt);
        self.messageInputField.empty()
      },
      method: 'POST',
      data: {
        From: self.fromNumber,
        To: phoneTxt,
        Body: messageTxt
      },
      headers: {
        "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
      }
    });

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
