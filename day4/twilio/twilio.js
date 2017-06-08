"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC075cb7525e42e5839a90b6f9fcf713c9";
  this.authToken = "c68ab3033b34553e250d83ee28e2bac4";
  this.fromNumber = "+17028198723";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(self));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    textStr = textStr.trim();
    if (textStr === "" ) {
      console.log("fails because "+textStr);
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (parseInt(phoneStr) && phoneStr.indexOf('-') < 0 && phoneStr.length === 10) {
      return true;
    }
    console.log("fails because "+phoneStr);
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    var message = this.messageInputField.val();
    console.log("message: "+message);
    var phone = this.phoneInputField.val();
    console.log("phone: "+phone)
    if (! this.validateMessageField(message)) {
      alert("message");
    }
    if (! this.validatePhoneField(phone)) {
      alert("phone");
    }

    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      this.displayMessage(phone, message);
      this.messageInputField.val("");
    } else {
      alert("request failed");
    }

    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
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
