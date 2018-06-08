"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC59dee3dbff0b45a185c0efef1f7fcd90";
  this.authToken = "d05990376d5f2652fea3dd0ab365053d";
  this.fromNumber = "+12672140832";

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
    this.messageSendButton.on('click', function(e) {
      e.preventDefault();
      self.handleMessageSend();
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.length !== 0 && textStr.trim().length !== 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (phoneStr.length !== 11) return false;
    var nbr = parseInt(phoneStr);
    return (10000000000 <= nbr) && (nbr <= 99999999999);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if (!this.validateMessageField(message)) return false;
    if (!this.validatePhoneField(phone)) return false;
    var self = this;
    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function(x) {
        self.displayMessage(phone, message);
      },
      error: function() {
        alert("Message send failure");
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
