"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC09e1f31d17f41579d922dbca9e690f20";
  this.authToken = "a5cb23f220f1fc35e5da9d3a4a838357";
  this.fromNumber = "+14025074908";

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
    $(this.messageSendButton).on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if(textStr.length < 1) {
        return false;
    } else {
        return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
      return phoneStr.match(/^\d+$/) !== null && phoneStr.length === 11;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
      event.preventDefault();
      var message = this.messageInputField.val();
      var phoneNumber = this.phoneInputField.val();
      var self = this;

      if(this.validateMessageField(message) && this.validatePhoneField(phoneNumber)) {
          $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
            success: function(x) {
                self.displayMessage(phoneNumber, message);
                self.messageInputField.val("");
                self.phoneInputField.val("");
            },
            error: function(err) {
                alert(err);
            },
            method: 'POST',
            data: {
              From: this.fromNumber,
              To: phoneNumber,
              Body: message
            },
            headers: {
              "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
            }
          });
      } else {
          alert("Something went wrong!");
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
