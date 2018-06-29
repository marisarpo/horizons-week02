"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACb56916f1e92d7f70e64d7aaa20b31dd5";
  this.authToken = "c75661e9c4b4ce43b037ca49228523bd";
  this.fromNumber = "(415) 903-1639";

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
    $("button.btn.message-input-button").on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var modStr = $.trim(phoneStr);
    var whiteList = "12345567890";
    for (var i = 0; i < modStr.length; i++)
    {
      if (whitelist.indexOf(modStr[i]) === -1)
      {
        return false;
      }
    }
    return (modStr.length !== 0);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    var toPhone = this.phoneInputField();
    var thisMessage = this. messageInputField.val();
    if (this.validatePhoneField(toPhone) && this.validateMessageField(thisMessage))
    {
      this.sendMessage(toPhone, thisMessage);
      this.clearField(this.messageInputField);
    }
    else
    {
      throw "Invalid fields";
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
