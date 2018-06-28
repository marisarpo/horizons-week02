"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "Nice try";
  this.authToken = "lol no";
  this.fromNumber = "not even once";

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
      return !!this.messageInputField.val().trim();
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
      return !isNaN(phoneStr) && phoneStr.length == 11;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var phoneInput = this.phoneInputField.val();
    if (this.validateMessageField.call(this, message) && this.validatePhoneField.call(this, phoneInput)) {
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
            success: function() {
                twilio.displayMessage(phoneInput, message);
                this.messageInputField.val("");
            },
            error: function(x) {
                alert(x);
            },
            method: 'POST',
            data: {
                From: this.fromNumber,
                To: phoneInput,
                Body: message,
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
