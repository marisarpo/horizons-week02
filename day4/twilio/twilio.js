"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC4659221125820e2b61049efd2ace4de0";
  this.authToken = "54ba6c2159f9f5956da414acd5d6c24e";
  this.fromNumber = "+16176525883";

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
    this.messageSendButton.on("click", function (e) {
      e.preventDefault();
      this.handleMessageSend();
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function (textStr) {
    // YOUR CODE HERE
    return (textStr.length !== 0 && textStr.trim(' ').length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function (phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length !== 10 || !(/^\d+$/.test(phoneStr))) {
      return false;
    }

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function (event) {
    // YOUR CODE HERE
    this.displayMessage($(event.phoneInputField).text(), 'f');

    //  this.displayMessage('9999999999', 'Testing testing!');
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
