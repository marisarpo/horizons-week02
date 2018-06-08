"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC791b8688cc044d6c790719f7d8f6e59d";
  this.authToken = "cb2bb953b984b719b0c8a4c09ad9aa7d";
  this.fromNumber = "+16465767926";

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
  clearField: function(field) {
    field.val("");
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var tStr = $.trim(phoneStr);
		var nums = '0123456789';
		for (var i = 0; i < tStr.length; i++) {
			if (nums.indexOf(tStr[i]) === -1) return false;
		}
    return (tStr.length !== 0);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function() {
          this.displayMessage(phone, message);
          this.messageInputField.val('');
        }.bind(this),
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
    } else {
      alert('Your phone number must be exactly 11 digits, and you cannot send an empty message');
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
