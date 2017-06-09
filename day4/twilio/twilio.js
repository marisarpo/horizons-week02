"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC491dd3b00259333f19b3ecdc28c560eb";
  this.authToken = "e3ebd0b3239a8fa6cf958434b2d0ad3f";
  this.fromNumber = "+19257948150";

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
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr)!==" "){
      return true;
    }
    else{
      return false;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length===11 && !isNaN(Number(phoneStr))){
      return true;
    }
    else {
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    var message = this.messageInputField.val();
    var number = this.phoneInputField.val(){
    if (this.validateMessageField(message) && this.validatePhoneField(number)){
      console.log("test");
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: number,
          Body: message,
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
  }
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
