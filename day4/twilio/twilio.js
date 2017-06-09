"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC73a6352b733379ec398e6020e0f52e38";
  this.authToken = "5024ef29914b47b3e18dceb1d62f06b6";
  this.fromNumber = "+14159430916";

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
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var converted = textStr.replace(" ", "");
    if (converted.length == 0) {
      return false;
    } else {
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var converted = phoneStr.replace(/[^0-9]/, "");
    if (converted.length === phoneStr.length && converted.length === 10) {
      return true;
    } else {
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();


    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      var twilio = this;
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          twilio.displayMessage(phone, message);
          $(".message-input-field").val("");
        },
        error: function(y) {
          alert("Error has occured");
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phone,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
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
