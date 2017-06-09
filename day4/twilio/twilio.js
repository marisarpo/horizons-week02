"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACf2eb1c1bdbca70600d612ffe687d3bb2";
  this.authToken = "1933caf56c86b43ebcf26a938f24836d";
  this.fromNumber = "+15085894033";

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
    var thisApp = this;
    thisApp.messageSendButton.on("click", function(event){
      console.log("hi");
      thisApp.handleMessageSend(event);
    });

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return $.trim(textStr).length !== 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return !!(phoneStr.length === 10 && !isNaN(parseInt(phoneStr)));
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    var thisApp = this;
    var messageInput = thisApp.messageInputField.val();
    var phoneInput = thisApp.phoneInputField.val();
    if (thisApp.validatePhoneField(phoneInput) && thisApp.validateMessageField(messageInput)) {
      this.displayMessage(phoneInput, messageInput);
      thisApp.messageInputField.val("");
    } else {
      alert("Improper input!");
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
