"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACd1448fb1345e6e2e045615bda02c80fc";
  this.authToken = "3640a9c534f896a2ce1cb953f5fa4bc1";
  this.fromNumber = "13213513661";

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
    // YOUR CODE HERE
    var thisApp = this;
    thisApp.messageSendButton.on("click", function(event) {
      thisApp.handleMessageSend(event);
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return textStr.trim().length > 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return !!(phoneStr.length == 10 && phoneStr.match(/[0-9]{10}/))
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');

    var thisApp = this;
    var messageInput = thisApp.messageInputField.val();
    var phoneInput = thisApp.phoneInputField.val();

    if (thisApp.validateMessageField(messageInput) &&
        thisApp.validatePhoneField(phoneInput)) {
      thisApp.displayMessage(phoneInput, messageInput);
      thisApp.messageInputField.val("");
    } else {
      alert("Invalid fields.");
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
