"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC109353ca47836874e74377053c601654";
  this.authToken = "8f175e4b274e4ac2578a4a443a9097b8";
  this.fromNumber = "14243733332";

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
    this.messageSendButton.on("click", function(evt) {
      this.handleMessageSend(evt);
    }.bind(this));
  },

  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.trim() !== "";
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return phoneStr.match("^\\d+$") !== null && // matches only numbers -- no spaces/letters/symbols
           phoneStr.length === 11;
  },

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var phone = this.phoneInputField.val();
    var msg = this.messageInputField.val();

    if (this.validateMessageField(msg) && this.validatePhoneField(phone)) {
      console.log("authenticated. sending message...")
      this.sendMessage(phone, msg);
    } else {
      console.log("not authenticated");
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
