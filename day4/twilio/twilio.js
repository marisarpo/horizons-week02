"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC52e4557573d9b187790fc3676209150a";
  this.authToken = "f25e59129d2ec4a18b04ebe3584683dc";
  this.fromNumber = "+13609002061";

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
  initialize: function () {
    this.messageSendButton.on('click',
      this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function (textStr) {
    if ($.trim(textStr).length > 0) {
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function (phoneStr) {
    var num = parseInt(phoneStr);
    if (num.toString().length === 10) {
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function (event) {
    event.preventDefault();
    var messenger = this;
    var msg = this.messageInputField.val();
    var num = this.phoneInputField.val();
    if (this.validateMessageField(msg) && this.validatePhoneField(num)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + messenger.accountId + '/SMS/Messages', {
        success: function (x) {
          messenger.displayMessage(num, msg);
          messenger.messageInputField.val('');
        },
        method: 'POST',
        data: {
          From: messenger.fromNumber,
          To: messenger.fromNumber,
          Body: 'Congratulations your Twillio account is working!'
        },
        headers: {
          "Authorization": "Basic " + btoa(messenger.accountId + ":" + messenger.authToken)
        }
      });
    } else {
      alert("Sending Error");
    }
  },
  displayMessage: function (sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
